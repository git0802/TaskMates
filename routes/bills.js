const express = require('express');
const router = express.Router();
const db = require("../model/helper");

//helper functions

//returns all the Bills in ascending order based on due_date
const getAllBills = (req, res, key) => {
	db(`SELECT * FROM bills ORDER BY ${key} ASC;`)
		.then(results => {
		res.send(results.data);
	})
	.catch(err => res.status(500).send(err));
};

//returns a bills based on the key you are serching for, eg /bills/category , /bills/status
const selectBillByKey = (req, res, key, value) => {
	db(`SELECT * FROM bills WHERE ${key} = "${value}";`)
		.then(results => {
		res.send(results.data);
	})
	.catch(err => res.status(500).send(err));
 }

//SELECT bills.* , users.name , users.lastname FROM bills LEFT JOIN users ON bills.id_user = users.id;


//CREATE

router.post("/", async function(req, res, next) {
	const {due_date, paid_date, category, provider, notes, amount, status = 0} = req.body;
	console.log(req.body);
	try {
		await db(`INSERT INTO bills (due_date, paid_date, category, provider, notes, amount, status) 
		VALUES ('${due_date}', ${paid_date ? `"${paid_date}"` : null}, '${category}', '${provider}', '${notes}', '${amount}', '${status}');`);
		getAllBills(req, res, "id");
	} catch (error) {
	  res.status(500).send({ error: error.message });
	}
 });

//READ

router.get('/', function(req, res) {
	getAllBills(req, res, "id");
});

/* GET bill by id */

router.get('/:id', (req, res) => {
	const key = "id";
	const value = req.params.id;
	selectBillByKey(req, res, key, value);
 });

/* GET bills by category */

router.get('/category/:value', (req, res) => {
	const key = "category";
	const value = req.params.value;
	selectBillByKey(req, res, key, value);
 });

/* GET all Paid OR Unpaid bills (UNPAID status = 0) */

router.get('/status/:value', (req, res) => {
	const key = "status";
	const value = req.params.value;
	selectBillByKey(req, res, key, value);
 });

/* GET */
router.get('/')

//UPDATE

/* PUT - Update paid_date OR amount OR status*/
// router.put('/:id', async function(req, res) {
// 	const id = req.params.id;
// 	const {due_date, paid_date, category, provider, notes, amount, status} = req.body;
// 	try {
// 		await db(`UPDATE bills SET
// 			due_date = "${due_date}",
// 			paid_date = "${paid_date}",
// 			category = "${category}",
// 			provider = "${provider}",
// 			notes = "${notes}",
// 			amount = ${amount},
// 			status = ${status}
// 			WHERE id = ${id};`
// 		);
// 		const result = await db(`SELECT * FROM bills WHERE id = ${id};`);
// 		res.send(result.data);
// 	} catch (error) {
// 	res.status(500).send({error: error.message});
// 	}
// });

//Set status to 1 (paid) for the bill
//change this to a PATCH
router.patch("/:id", async (req, res) => {
	const id = req.params.id;
	try {
	  await db(`UPDATE bills SET status = 1 WHERE id=${id};`);
	  selectBillByKey(req, res, "id", id);
	} catch (err) {
	  res.status(500).send(err);
	}
});

//Assignign a user to a bill  - SQL : UPDATE bills SET id_user = 2 WHERE id = 2;
router.patch("/assign/:id", async (req, res) => {
	const id = req.params.id;
	const { id_user } = req.body;
	try {
		await db(`UPDATE bills SET id_user = ${id_user} WHERE id = ${id};`);
		selectBillByKey(req, res, "id", id);
	} catch (err) {
		res.status(500).send(err);
	}
});

//DETELE
router.delete('/:id', async function(req, res) {
	const value = req.params.id;
	try {
		await db(`DELETE FROM bills WHERE id=${value};`);
		getAllBills(req, res, "id")
	} catch (error) {
		res.status(500).send({ err: err.message });
	}
});

module.exports = router;

//Questions, 
//Why have we decided on using TINYINT for Status and not Boolean?
//Could Status be replaced by Paid? 
