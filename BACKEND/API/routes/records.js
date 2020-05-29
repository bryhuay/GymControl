const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');
const accessRules = require('../middlewares/access-rules');
const Record = require('../controllers/recordController');

router.get('/find',checkAuth, Record.find);
router.post('/update',checkAuth, Record.update);
router.post('/delete',checkAuth, Record.delete);
router.get('/',checkAuth,  Record.show);
router.post('/',checkAuth,  Record.create);


router.post('/recordsByDay',checkAuth,  Record.recordsByDay);
router.get('/recordById',checkAuth,  Record.recordsByDay);



module.exports = router;