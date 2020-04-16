
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

const StoresController = require("./../Controllers/stores");

// POST API to create a new user.
router.post("/createUser", StoresController.createUser);





module.exports = router;