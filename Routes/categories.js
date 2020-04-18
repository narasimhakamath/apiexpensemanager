
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

const checkAuthentication = require("../Middlewares/checkAuthentication");
const CategoriesController = require("./../Controllers/categories");

// GET API to get all the categories.
router.get("/getAllCategories", checkAuthentication, CategoriesController.getAllCategories);

// POST API to create a new category.
router.post("/createCategory", checkAuthentication, CategoriesController.createCategory);

// POST API to delete a category mapping.
router.post("/removeCategory/:categoryID", checkAuthentication, CategoriesController.removeCategory);

router.get("/getCategories", checkAuthentication, CategoriesController.getCategoriesForUser);

module.exports = router;