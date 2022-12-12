const express = require('express');
const router = express.Router();

const CompanyController = require('../controllers/CompanyController');

router.get('/',CompanyController.index);
router.post('/',CompanyController.store);
router.put('/:id',CompanyController.update);
router.patch('/:id',CompanyController.deleteuser);
router.get('/:id',CompanyController.view);

module.exports = router;
