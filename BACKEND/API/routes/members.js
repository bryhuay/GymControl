const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');
const accessRules = require('../middlewares/access-rules');
const Member = require('../controllers/memberController');

router.get('/find',checkAuth, Member.find);
router.post('/update',checkAuth, Member.update);
router.post('/delete',checkAuth, Member.delete);
router.get('/',checkAuth,  Member.show);
router.post('/',checkAuth, Member.create);
router.post('/searchByLastName',checkAuth, Member.searchByLastName);
router.get('/membersOff',checkAuth, Member.membersOff);




module.exports = router;