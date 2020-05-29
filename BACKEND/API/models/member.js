const mongoose = require('mongoose');
var states = 'ACTIVO VENCIDO'.split(' ');


const memberSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, required: true},
	last_name: {type: String, required: true},
	start: {type:Date, required: true},
	end: {type:Date, required: true},
	state: {type: String, enum: states, required: true}

});

module.exports = mongoose.model('Member', memberSchema,'members');

