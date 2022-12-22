const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/EmployeeController');


router.get('/birthdaydetails',EmployeeController.birthdaydetails);


router.get('/',EmployeeController.index);
router.post('/',EmployeeController.store);
router.put('/:id',EmployeeController.update);
router.patch('/:id',EmployeeController.deleteuser);
router.get('/:id',EmployeeController.view);


router.get('/employee_name_search/:name',EmployeeController.employeenamesearch);


router.post('/upload_profile_image',EmployeeController.upload_profile_image);






module.exports = router;
