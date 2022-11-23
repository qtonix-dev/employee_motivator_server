const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

const BlogSubCategoryController = require('../controllers/BlogSubCategoryController');
const { uuid } = require('uuidv4');

const storage = multer.diskStorage({
  destination:'./uploads/blogcategoryimages',
  filename:(req,file,cb)=>{
    return cb(null, `${uuid()}${path.extname(file.originalname)}`)

  }
})

const upload = multer({
  storage:storage
})

router.get('/',BlogSubCategoryController.index);
router.get('/:id',BlogSubCategoryController.view);
router.get('/view/:categoryname',BlogSubCategoryController.viewcategoryname);

router.post('/',upload.single('image'),BlogSubCategoryController.store);
router.post('/update',upload.single('image'),BlogSubCategoryController.update);
router.patch('/:id',BlogSubCategoryController.deletebc);



module.exports = router;
