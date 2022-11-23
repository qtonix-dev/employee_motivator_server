const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');
const { uuid } = require('uuidv4');

const BlogController = require('../controllers/BlogController');


const storage = multer.diskStorage({
    destination: './uploads/blogimages',
    filename:(req, file, cb)=>{
      return cb(null, `${uuid()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage:storage
})



router.get('/clearcache',BlogController.clearcache);

router.get('/',BlogController.index);
router.get('/getallblogsweb',BlogController.getallblogsweb);




router.get('/homepage',BlogController.homepage);

router.get('/latest/:no',BlogController.latestblog);

router.get('/category/:categoryname',BlogController.viewcategorylist);
router.get('/subcategory/:subcategoryname',BlogController.viewsubcategorylist);


router.get('/:id',BlogController.view);
router.get('/viewbyurl/:url',BlogController.viewbyurl);
router.get('/viewbyurlweb/:url',BlogController.viewbyurlweb);

router.get('/blogcategory-relatedarticle/:categoryname/:no',BlogController.relatedarticle);



router.post('/',upload.single('image'),BlogController.store);
router.post('/createnew',BlogController.createnew);
router.post('/updatenew',BlogController.updatenew);





router.put('/:id',upload.single('image'),BlogController.update);
router.patch('/:id',BlogController.deleteblog);


module.exports = router;
