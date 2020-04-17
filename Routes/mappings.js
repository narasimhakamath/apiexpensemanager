
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

const MappingsController = require("./../Controllers/mappings");

module.exports = router;