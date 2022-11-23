const express = require('express');
const router = express.Router();

const ConsultingController = require('../controllers/ConsultingController');

router.get('/',ConsultingController.index);
router.post('/',ConsultingController.store);


module.exports = router;
