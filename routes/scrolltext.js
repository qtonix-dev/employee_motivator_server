const express = require('express');
const router = express.Router();

const ScrollTextController = require('../controllers/ScrollTextController');

router.get('/',ScrollTextController.index);
router.post('/',ScrollTextController.store);
router.put('/:id',ScrollTextController.editdata);
router.patch('/:id',ScrollTextController.deletedata);


router.get('/get_text_speed',ScrollTextController.get_text_speed);
router.post('/update_text_speed',ScrollTextController.update_text_speed);


router.post('/update_sorting',ScrollTextController.update_sorting);






router.post('/chnage_status',ScrollTextController.chnage_status);



module.exports = router;
