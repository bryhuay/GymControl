const mongoose = require('mongoose');
const Record = require('../models/record');



module.exports = {
	show: (req,res,next)=>{
		Record.find()
			.select('_id description price date')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					records: docs.map(doc => {
						return {
							_id: doc._id,
							description: doc.description,
							price: doc.price,
							date: doc.date
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
		
		const record = new Record({
			_id: new mongoose.Types.ObjectId(),
			description: req.body.description,
			price: req.body.price,
			date: req.body.date
			
	
		});
		record
			.save()
			.then(result=>{
				res.status(200).json({
					message: 'Created succesfully',
					createdRecord: {
						_id: result._id,
						price: result.price,
						description: result.description,
						date: result.date
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
		const id = req.query.recordId;
		Record.findById(id)
			.select('_id description price date')
			.exec()
			.then(doc=> {
				if (doc) {
					res.status(200).json({
						record: doc
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
		const id = req.body.recordId;
		const updateOps = req.body;
		delete updateOps._id
		Record.update({_id:id},{$set: updateOps})
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
		const id = req.body.recordId;
		Record.remove({_id: id})
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
	
	recordsByDay: (req,res,next)=>{
		Record.find({date:
				{
					$gte: new Date(req.body.year,req.body.month,req.body.day)
				}
			})
			.select('_id description price date')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					records: docs.map(doc => {
						return {
							_id: doc._id,
							description: doc.description,
							price: doc.price,
							date: doc.date
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
	recordById: (req,res,next)=>{
		Record.find({_id:req.query.recordId})
			.select('_id description price date')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					records: docs.map(doc => {
						return {
							_id: doc._id,
							description: doc.description,
							price: doc.price,
							date: doc.date
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