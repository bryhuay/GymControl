const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/* let */
const recordRoutes = require('./api/routes/records');
const userRoutes = require('./api/routes/users');
const clientRoutes = require('./api/routes/clients');
const memberRoutes = require('./api/routes/members');
/* let */

mongoose.connect('mongodb://localhost:27017/gym');
mongoose.Promise = global.Promise;


app.set('view engine','jade');

app.get('/',function(req,res){
	res.render('main');
});

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use('/react',express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers',
		'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
		);
	res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');

	console.log(req.body);

	next();
});

app.options("/*",function(req,res,next){
	res.sendStatus(200);
});

/* let */
app.use('/registros',recordRoutes);
app.use('/usuarios',userRoutes);
app.use('/clientes',clientRoutes);
app.use('/miembros',memberRoutes);

/* let */

app.use((req,res,next)=>{
	const error = new Error('Page Not found');
	error.status = 404;
	next(error);
});

app.use((error,req,res,next)=>{
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});

module.exports = app;
