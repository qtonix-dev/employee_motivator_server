const express = require('express');
const router = express.Router();

const WorkAnniversaryController = require('../controllers/WorkAnniversaryController');


const multer  = require('multer')
const upload = multer({});


router.get('/',WorkAnniversaryController.index);
router.get('/work_anniversary_month',WorkAnniversaryController.work_anniversary_month);
router.get('/imagelist',WorkAnniversaryController.imagelist);
router.post('/uploadimage',upload.single('image'),WorkAnniversaryController.uploadimage);
router.patch('/deleteimage/:id',WorkAnniversaryController.deleteimage);

router.post('/update_workanniversary_info',WorkAnniversaryController.update_workanniversary_info);
router.post('/images/update_status',WorkAnniversaryController.update_status);


module.exports = router;
