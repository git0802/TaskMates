var jwt = require("jsonwebtoken");
require("dotenv").config(); //"dotenv" beacuse we are accesing the SUPERSECRET
const supersecret = process.env.SUPER_SECRET;

//check if the user is logged in
function userShouldBeLoggedIn(req, res, next) {
  //check if there is a token
  const token = req.headers["authorization"].replace(/^Bearer\s/, "");

  //If there is not a token, send an error
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    //check if the token is valid
    jwt.verify(token, supersecret, function (err, decoded) {
      //if it is not valid send an error
      if (err) res.status(401).send({ message: err.message });
      else {
        //everything is awesome
        //the payload is the object that I passed in the sign method
        //creating a new property on the req object called user_id
        req.user_id = decoded.user_id;
        next(); //move on to the next step. Out of the cycle req-res
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
