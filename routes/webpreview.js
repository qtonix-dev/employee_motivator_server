const express = require('express');
const router = express.Router();

const WebPreviewController = require('../controllers/WebPreviewController');

router.get('/',WebPreviewController.index);

router.post('/update_sorting',WebPreviewController.update_sorting);
router.post('/chnage_status',WebPreviewController.chnage_status);




module.exports = router;
