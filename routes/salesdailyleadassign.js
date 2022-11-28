const express = require('express');
const router = express.Router();

const SalesDailyLeadAssignController = require('../controllers/SalesDailyLeadAssignController');

router.get('/',SalesDailyLeadAssignController.index);
router.post('/',SalesDailyLeadAssignController.store);
router.put('/:id',SalesDailyLeadAssignController.update);
router.patch('/:id',SalesDailyLeadAssignController.deleteuser);
router.get('/:id',SalesDailyLeadAssignController.view);

module.exports = router;
