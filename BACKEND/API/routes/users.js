const express = require('express');
const router = express.Router();
const User = require('../controllers/userController');
const checkAuth = require('../middlewares/check-auth');
const accessRules = require('../middlewares/access-rules');


router.post('/login',User.login);
router.get('/find',checkAuth,  User.find);
router.post('/search',checkAuth,  User.search);
router.get('/headers',checkAuth,  User.headers);
router.post('/edit',checkAuth,  User.edit);
router.get('/getUserById', checkAuth,  User.getUserById);
router.post('/update',checkAuth,  User.update);
router.get('/delete',checkAuth,  User.delete);
router.post('/',checkAuth,  User.create);
router.get('/',checkAuth,  User.show);


module.exports = router;