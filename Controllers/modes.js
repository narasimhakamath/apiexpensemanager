const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Mode = require("./../Models/mode");
const Mapping = require("./../Models/mapping");


exports.getAllModes = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	const modeData = await Mode.findAll();
	if(modeData)
		responseData = {statusCode: 200, success: "Data has been fetched successfully.", error: "", data: modeData};
	else
		responseData = {statusCode: 404, success: "", error: "No data found for the request."};

	response.status(responseData.statusCode).json(responseData);
}

exports.createMode = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	if(request['body']) {
		responseData = await Mode.createMode(request['body'], request['userData']['userID']);
	} else {
		responseData = {statusCode: 403, success: "", error: "The request could not be processed."};
	}

	response.status(responseData.statusCode).json(responseData);
}

exports.removeMode = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	if(request['params']['modeID']) {
		responseData = await Mode.removeMode(request['params']['modeID'], request['userData']['userID']);
	} else {
		responseData = {statusCode: 403, success: "", error: "The request could not be processed."};
	}

	response.status(responseData.statusCode).json(responseData);
}

exports.getModesForUser = async (request, response, next) => {
	let responseData = {statusCode: 500, success: "", error: "Invalid request."};

	const entityData = await Mapping.getEntitiesForUser("mode", request['userData']['userID']);
	if(entityData.length) {
		let modesData = [];
		for(let i = 0; i < entityData.length; i++) {
			const entityName = await Mode.findNameByID(entityData[i]['entityID']);
			modesData.push({_id: entityData[i]['_id'], entityID: entityData[i]['entityID'], entityName: entityName});
		}

		responseData = {statusCode: 200, success: "Data has been fetched successfully.", error: "", data: modesData};
	} else {
		responseData = {statusCode: 404, success: "", error: "No data found for this request."};
	}

	response.status(responseData.statusCode).json(responseData);
}