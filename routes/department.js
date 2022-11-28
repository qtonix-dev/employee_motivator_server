const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/DepartmentController');

router.get('/',DepartmentController.index);
router.post('/',DepartmentController.store);
router.put('/:id',DepartmentController.update);
router.patch('/:id',DepartmentController.deleteuser);
router.get('/:id',DepartmentController.view);

module.exports = router;
