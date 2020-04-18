
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

const checkAuthentication = require("../Middlewares/checkAuthentication");
const ExpensesController = require("./../Controllers/expenses");

// POST API to create a new expense.
router.post("/createExpense", checkAuthentication, ExpensesController.createExpense);


module.exports = router;