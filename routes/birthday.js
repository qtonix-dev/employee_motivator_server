const express = require('express');
const router = express.Router();

const BirthdayController = require('../controllers/BirthdayController');


const multer  = require('multer')
const upload = multer({});

router.get('/',BirthdayController.index);

router.get('/web_birthday',BirthdayController.web_birthday);



router.post('/uploadimage',upload.single('image'),BirthdayController.uploadimage);
router.get('/images',BirthdayController.images);

router.patch('/images/:id',BirthdayController.deleteimage);


router.post('/images/update_status',BirthdayController.update_status);



router.post('/uploadimagesub',upload.single('image'),BirthdayController.uploadimagesub);


router.get('/today_birthday_list',BirthdayController.today_birthday_list);


module.exports = router;
