const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, required: true, unique: true}
});


categorySchema.statics.findAll = async function() {
	categoryData = await this.find({}).exec();
	return categoryData;
}




module.exports = mongoose.model("Category", categorySchema);