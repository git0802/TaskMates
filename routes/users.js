const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../model/helper");
require("dotenv").config();
const bcrypt = require("bcrypt");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const saltRounds = 10;
//it can be any number, but it has to be always the same
const supersecret = process.env.SUPER_SECRET;

router.get("/", function (req, res, next) {
  db("SELECT * FROM users;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params; //const id = req.params.id (?)
  try {
    const results = await db(`SELECT * FROM users where id = ${id};`);
    if (!results.data.length) {
      res.status(404).send({ msg: "User not found" });
    }
    res.send(results.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async function (req, res, next) {
  const { name, lastname, adress, description, email, password } = req.body;
  try {
    await db(
      `INSERT INTO users (name, lastname, adress, description, email, password) VALUES ('${name}', '${lastname}', '${adress}', '${description}', '${email}', '${password}');`
    );
    const results = await db(`SELECT * FROM users;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const user = await db(`SELECT * FROM users WHERE id = ${id};`);
    if (!user.data.length) {
      res.send({ msg: "User not found" });
    } else {
      await db(`DELETE FROM users WHERE id = ${id};`);
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// AUTHENTICATION ROUTES

//REGISTER

router.post("/register", async (req, res) => {
  const { name, lastname, adress, description, email, password } = req.body;

  try {
    function isValidEmail(email) {
      // Use a regular expression to validate the email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    const hash = await bcrypt.hash(password, saltRounds);
    //this operation takes some time, so we need to await

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    await db(
      `INSERT INTO users (name, lastname, adress, description, email, password) VALUES ('${name}', '${lastname}', '${adress}', '${description}', '${email}', '${hash}');`
    );

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
    console.log("error:", err.message);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await db(`SELECT * FROM users WHERE email = "${email}"`);
    const user = results.data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      const token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/profile", userShouldBeLoggedIn, async function (req, res, next) {
  res.send({
    message: "Here is the PROTECTED data for user " + req.user_id,
  });
});

module.exports = router;
