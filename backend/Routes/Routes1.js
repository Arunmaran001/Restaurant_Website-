const {Router} = require('express');

const router = Router();

const {create,getall,remove,update,getbyid}  = require('../Controllers/controllers1');

router.post('/create',create);
router.get('/getall',getall);
router.post('/delete/:id',remove);
router.post('/update/:id',update);
router.get('/getbyid/:id',getbyid);


module.exports = router;