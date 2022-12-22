const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');
const { uuid } = require('uuidv4');

const SharapImageController = require('../controllers/SharapImageController');


const storage = multer.diskStorage({
    destination: './uploads/blogimages',
    filename:(req, file, cb)=>{
      return cb(null, `${uuid()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage:storage
})


router.get('/index',SharapImageController.index);
router.post('/convertimage',upload.single('image'),SharapImageController.convertimage);


module.exports = router;
