const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

const UserController = require('../controllers/UserController');
const { uuid } = require('uuidv4');


const storage = multer.diskStorage({
    destination: './uploads/userimages',
    filename:(req, file, cb)=>{
        return cb(null, `${uuid()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage:storage
})


router.get('/',UserController.index);
router.post('/login',UserController.login);
router.post('/userregister',UserController.userregister);
router.put('/update/:id',UserController.update);
router.put('/updatepassword/:id',UserController.updatepassword);


router.patch('/:id',UserController.deleteuser);
router.get('/:id',UserController.view);

////////////////////////



module.exports = router;
