const express = require('express');
const router = express.Router();

const EmployeeofMonthController = require('../controllers/EmployeeofMonthController');


const multer  = require('multer')
const upload = multer({});

router.get('/',EmployeeofMonthController.index);
router.post('/update_employee_of_month',EmployeeofMonthController.update_employee_of_month);
router.post('/store_employee_of_month',EmployeeofMonthController.store_employee_of_month);
router.post('/delete_employee_of_month',EmployeeofMonthController.delete_employee_of_month);


router.get('/images',EmployeeofMonthController.images);
router.patch('/images/:id',EmployeeofMonthController.deleteimage);
router.post('/uploadimage',upload.single('image'),EmployeeofMonthController.uploadimage);
router.post('/images/update_status',EmployeeofMonthController.update_status);

router.post('/image/update_image_info',EmployeeofMonthController.update_image_info);





module.exports = router;
