const mongoose = require("mongoose");

const mappingSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	entity: {type: String, required: true},
	entityID: {type: mongoose.Schema.Types.ObjectId, required: true},
	userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
	isEnabled: {type: Boolean, default: true}
});

mappingSchema.statics.updateMapping = async function(entity, entityID, userID) {
	const mappingData = await this.findOne({entity: entity, entityID: entityID, userID: userID});

	if(mappingData) {
		if(!mappingData['isEnabled'])
			await mappingData.findByIdAndUpdate(mappingData['_id'], {isEnabled: true}).exec();
	} else {
		let iData = {_id: new mongoose.Types.ObjectId(), entity: entity, entityID: entityID, userID: userID, isEnabled: true};
		iData = new this(iData);
		console.log(iData);
		let data = await iData.save();
		console.log(data);
	}
}



module.exports = mongoose.model("Mapping", mappingSchema);
