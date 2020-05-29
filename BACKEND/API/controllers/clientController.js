const mongoose = require('mongoose');
const Client = require('../models/client');



module.exports = {
	show: (req,res,next)=>{
		Record.find()
			.select('_id name last_name')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					clients: docs.map(doc => {
						return {
							_id: doc._id,
							name: doc.name,
							last_name: doc.last_name
						}
					})
				};
				res.status(200).json(response);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	create: (req,res,next)=>{
		
		const client = new Client({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			last_name: req.body.last_name
			
	
		});
		client
			.save()
			.then(result=>{
				res.status(200).json({
					message: 'Created succesfully',
					createdClient: {
						_id: result._id,
						name: result.name,
						last_name: result.last_name
					}
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	find: (req,res,next)=>{
		const id = req.query.clientId;
		Client.findById(id)
			.select('_id name last_name')
			.exec()
			.then(doc=> {
				if (doc) {
					res.status(200).json({
						client: doc
					});
				}else{
					res.status(404).json({message: 'No valid entry found for provided ID'});
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	update: (req,res,next)=>{
		const id = req.body.clientId;
		const updateOps = req.body;
		delete updateOps._id
		Client.update({_id:id},{$set: updateOps})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Updated'
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	delete: (req,res,next)=>{
		const id = req.body.clientId;
		Client.remove({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Deleted'
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	searchByLastName: (req, res, next)=>{
		const string = req.body.string;
	
		Client.find({last_name: { $regex: string , $options:'i'}  } )
			.select('_id name last_name')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					clients: docs.map(doc => {
						return {
							_id: doc._id,
							name: doc.name,
							last_name: doc.last_name
						}
					})
				};
				res.status(200).json(response);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}
}