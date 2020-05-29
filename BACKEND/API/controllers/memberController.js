const mongoose = require('mongoose');
const Member = require('../models/member');



module.exports = {
	show: (req,res,next)=>{
		Member.find()
			.select('_id name last_name start end state')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					members: docs.map(doc => {
						return {
							_id: doc._id,
							name: doc.name,
							last_name: doc.last_name,
							start: doc.start,
							end: doc.end,
							state: doc.state
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
		
		const member = new Member({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			last_name: req.body.last_name,
			start: req.body.start,
			end: req.body.end,
			state: req.body.state

			
	
		});
		member
			.save()
			.then(result=>{
				res.status(200).json({
					message: 'Created succesfully',
					createdMember: {
						_id: result._id,
						name: result.name,
						last_name: result.last_name,
						start: result.start,
						end: result.end,
						state: result.state
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
		const id = req.query.memberId;
		Member.findById(id)
			.select('_id name last_name start end state')
			.exec()
			.then(doc=> {
				if (doc) {
					res.status(200).json({
						member: doc
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
		const id = req.body.memberId;
		const updateOps = req.body;
		delete updateOps._id
		Member.update({_id:id},{$set: updateOps})
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
		const id = req.body.memberId;
		Member.remove({_id: id})
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
	
		Member.find({last_name: { $regex: string , $options:'i'}  } )
			.select('_id name last_name start end state')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					members: docs.map(doc => {
						return {
							_id: doc._id,
							name: doc.name,
							last_name: doc.last_name,
							start: doc.start,
							end: doc.end,
							state: doc.state
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
	membersOff: (req, res, next)=>{
		Member.find({state:'VENCIDO'})
			.select('_id name last_name start end state')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					members: docs.map(doc => {
						return {
							_id: doc._id,
							name: doc.name,
							last_name: doc.last_name,							
							start: doc.start,
							end: doc.end,
							state: doc.state
							
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