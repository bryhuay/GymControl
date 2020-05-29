const mongoose = require('mongoose');


const recordSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	description: {type: String, required: true},
	price: {type: Number, required: true},
	date: {type:Date, default: Date.now}
});
module.exports = mongoose.model('Record', recordSchema,'records');