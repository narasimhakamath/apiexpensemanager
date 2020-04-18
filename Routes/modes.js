
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

const checkAuthentication = require("../Middlewares/checkAuthentication");
const ModesController = require("./../Controllers/modes");

// GET API to get all the modes.
router.get("/getAllModes", checkAuthentication, ModesController.getAllModes);

// POST API to create a new mode.
router.post("/createMode", checkAuthentication, ModesController.createMode);

// POST API to delete a mode mapping.
router.post("/removeMode/:modeID", checkAuthentication, ModesController.removeMode);

// GET API to get all the modes mapped to the user.
router.get("/getModes", checkAuthentication, ModesController.getModesForUser);

module.exports = router;