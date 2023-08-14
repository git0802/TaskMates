var express = require('express');
var router = express.Router();
const db = require("../model/helper");


const getAllTasks = async (req, res) => {
  try {
    const results = await db(`SELECT tasks.*, users.name FROM tasks LEFT JOIN users ON tasks.id_user = users.id;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};

router.get('/', async function(req, res, next) {
  getAllTasks(req, res);
});

router.get('/:id_user', async (req, res, next) => {
  const { id_user } = req.params;
  try {
    const results = await db(`SELECT * FROM tasks WHERE id_user = ${id_user};`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({message: `User not found`});
  }
});

router.post("/", async function (req, res, next) {
  //The router handles the POST request at the root path
  //'/' by extracting 'description', 'category' and 'id_user'
  //from the request body.
  const {description, category, id_user} = req.body;
  console.log(req.body);
  try {
    await db(`INSERT INTO tasks (description, isDone, category, id_user) 
    VALUES ('${description}', 0, '${category}', '${id_user}');`)
    getAllTasks(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/", async function (req, res, next) {
  const {id} = req.params;
  try {
    await db(`UPDATE tasks SET isDone = !isDone WHERE id=${id};`);
    getAllTasks(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
  getAllTasks(req, res);
  });

router.delete("/:id", async function (req, res, next) {
  const {id} = req.params;
  try {
    await db(`DELETE FROM tasks WHERE id=${id};`);
    getAllTasks(req, res);
  } catch (err) {
    res.status(500).send(err);
  };
});


module.exports = router;
