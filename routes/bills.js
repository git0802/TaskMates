const express = require('express');
const router = express.Router();
const db = require("../model/helper");

//helper functions

//returns all the Bills in ascending order
const getAllBills = (req, res) => {
	db("SELECT * FROM bills ORDER BY date ASC;")
		.then(results => {
		console.log(results.data);
		res.send(results.data);
	})
	.catch(err => res.status(500).send(err));
};

//CREATE


//READ

router.get('/', async (req, res) => {
	getAllBills(req, res);
});

//UPDATE

//DETELE

