const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Importing routes.
const userRoutes = require("./Routes/users");
const categoryRoutes = require("./Routes/categories");
const modeRoutes = require("./Routes/modes");
const mappingRoutes = require("./Routes/mappings");

// Database Connection.
mongoose.connect('mongodb://localhost:27017/expensemanager', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if(request.method === "OPTIONS") {
		response.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
		return response.status(200).json({});
	}
	next();
});


// Using routes here.
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/modes", modeRoutes);
app.use("/api/mappings", mappingRoutes);


app.use((request, response, next) => {
	const error = new Error("Request to this API endpoint does not exist.");
	error.status = 404;
	next(error);
});

app.use((error, request, response, next) => {
	const responseData = {statusCode: error.status || 500, success: "", error: error.message};
	response.status(responseData.statusCode).json(responseData);
});

module.exports = app;