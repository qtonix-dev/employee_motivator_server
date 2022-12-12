const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/EmployeeController');

router.get('/',EmployeeController.index);
router.post('/',EmployeeController.store);
router.put('/:id',EmployeeController.update);
router.patch('/:id',EmployeeController.deleteuser);
router.get('/:id',EmployeeController.view);


router.get('/employee_name_search/:name',EmployeeController.employeenamesearch);


module.exports = router;
