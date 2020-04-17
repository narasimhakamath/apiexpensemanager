
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const checkAuthentication = require("../Middlewares/checkAuthentication");

const router = express.Router();

const CategoriesController = require("./../Controllers/categories");

// GET API to get all the categories.
router.get("/getAllCategories", checkAuthentication, CategoriesController.getAllCategories);

// POST API to create a new category.
router.post("/createCategory", checkAuthentication, CategoriesController.createCategory);


module.exports = router;