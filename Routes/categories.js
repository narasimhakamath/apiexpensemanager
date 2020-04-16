
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

const CategoriesController = require("./../Controllers/categories");

// GET API to get all the categories.
router.get("/getAllCategories", CategoriesController.getAllCategories);




module.exports = router;