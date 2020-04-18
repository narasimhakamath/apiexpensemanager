
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

const checkAuthentication = require("../Middlewares/checkAuthentication");
const UsersController = require("./../Controllers/users");


// POST API to create a new user.
router.post("/createUser", UsersController.createUser);

// GET API to get the details of a user by ID.
router.get("/getDetails/:userID", checkAuthentication, UsersController.getDetails);

// POST API to login a user and get the JSON Web Token.
router.post("/loginUser", UsersController.loginUser);


module.exports = router;