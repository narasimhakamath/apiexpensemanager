
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

const CategoriesController = require("./../Controllers/categories");

// GET API to get all the categories.
router.get("/getAllCategories", CategoriesController.getAllCategories);

// POST API to create a new category.
router.post("/createCategory", CategoriesController.createCategory);


module.exports = router;