const express = require('express');
const router = express.Router();

const SalesDailyRecordController = require('../controllers/SalesDailyRecordController');

router.get('/',SalesDailyRecordController.index);
router.post('/',SalesDailyRecordController.store);
router.put('/:id',SalesDailyRecordController.update);
router.patch('/:id',SalesDailyRecordController.deleteuser);
router.get('/:id',SalesDailyRecordController.view);

module.exports = router;
