const express = require('express');
const router = express.Router();

const SubscribeController = require('../controllers/SubscribeController');

router.get('/',SubscribeController.index);
router.post('/',SubscribeController.store);

module.exports = router;
