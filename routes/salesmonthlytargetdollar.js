const express = require('express');
const router = express.Router();

const SalesMonthlyTargetDollarController = require('../controllers/SalesMonthlyTargetDollarController');

router.get('/',SalesMonthlyTargetDollarController.index);
router.post('/',SalesMonthlyTargetDollarController.store);
router.put('/:id',SalesMonthlyTargetDollarController.update);
router.patch('/:id',SalesMonthlyTargetDollarController.deleteuser);
router.get('/:id',SalesMonthlyTargetDollarController.view);

module.exports = router;
