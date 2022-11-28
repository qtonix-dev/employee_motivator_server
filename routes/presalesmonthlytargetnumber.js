const express = require('express');
const router = express.Router();

const PreSalesMonthlyTargetNumberController = require('../controllers/PreSalesMonthlyTargetNumberController');

router.get('/',PreSalesMonthlyTargetNumberController.index);
router.post('/',PreSalesMonthlyTargetNumberController.store);
router.put('/:id',PreSalesMonthlyTargetNumberController.update);
router.patch('/:id',PreSalesMonthlyTargetNumberController.deleteuser);
router.get('/:id',PreSalesMonthlyTargetNumberController.view);

module.exports = router;
