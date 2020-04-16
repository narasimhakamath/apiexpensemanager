
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

const UsersController = require("./../Controllers/users");

// POST API to create a new user.
router.post("/createUser", UsersController.createUser);





module.exports = router;