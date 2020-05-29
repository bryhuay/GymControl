const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');
const accessRules = require('../middlewares/access-rules');
const Client = require('../controllers/clientController');

router.get('/find',checkAuth, Client.find);
router.post('/update',checkAuth, Client.update);
router.post('/delete',checkAuth, Client.delete);
router.get('/',checkAuth,  Client.show);
router.post('/',checkAuth,  Client.create);
router.post('/searchByLastName',checkAuth, Client.searchByLastName);




module.exports = router;