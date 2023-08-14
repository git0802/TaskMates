var express = require('express');
var router = express.Router();
const db = require("../model/helper");


router.get('/', function(req, res, next) {
  db("SELECT * FROM users;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err)); 
});

router.get('/:id', async function (req, res, next) {
  const {id} = req.params //const id = req.params.id (?)
  try {
    const results = await db(`SELECT * FROM users where id = ${id};`);
    if (!results.data.length) {
      res.status(404).send({ msg: "User not found" });
    } 
    res.send(results.data[0])
  } catch (err) {
    res.status(500).send(err);
  }
});

router. post('/', async function (req, res, next) {
  const {name, lastname} = req.body;
  try {
    await db (
      `INSERT INTO users (name, lastname) VALUES ('${name}', '${lastname}');`
    );
    const results = await db(`SELECT * FROM users;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  const {id} = req.params;
  try {
    const user = await db(`SELECT * FROM users WHERE id = ${id};`);
    if(!user.data.length) {
      res.send({msg: "User not found"});
    } else {
      await db(`DELETE FROM users WHERE id = ${id};`);
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;
