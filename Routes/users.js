
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

const UsersController = require("./../Controllers/users");

// POST API to create a new user.
router.post("/createUser", UsersController.createUser);

// GET API to get the details of a user by ID.
router.get("/getDetails/:userID", UsersController.getDetails);




module.exports = router;