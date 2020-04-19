
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

const checkAuthentication = require("../Middlewares/checkAuthentication");
const ExpensesController = require("./../Controllers/expenses");

// POST API to create a new expense.
router.post("/createExpense", checkAuthentication, ExpensesController.createExpense);

// POST API to remove an expense.
router.post("/updateExpense/:expenseID", checkAuthentication, ExpensesController.updateExpense);

// GET API to get the details of an expense by ID.
router.get("/getDetails/:expenseID", checkAuthentication, ExpensesController.getDetailsByID);

// GET API to get the details of all the expenses for a user in paginated form.
router.get("/getExpenses", checkAuthentication, ExpensesController.getExpenses);

module.exports = router;