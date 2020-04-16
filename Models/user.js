const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: {type: String, required: true, unique: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: false},
	mailAddress: {type: String, required: false},
	password: {type: String, required: true}
});

module.exports = mongoose.model("Store", storeSchema);
