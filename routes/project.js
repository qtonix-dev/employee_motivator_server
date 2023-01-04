const express = require('express');
const router = express.Router();

const ProjectController = require('../controllers/ProjectController');

router.get('/',ProjectController.index);
router.post('/',ProjectController.store);
router.put('/:id',ProjectController.update);
router.patch('/:id',ProjectController.deleteuser);
router.get('/:id',ProjectController.view);


router.post('/update_project_status',ProjectController.update_project_status);



router.post('/add_website_details',ProjectController.add_website_details);
router.post('/update_website_details',ProjectController.update_website_details);
router.get('/get_website_details/:id',ProjectController.get_website_details);
router.get('/delete_website_details/:id',ProjectController.delete_website_details);


router.post('/add_seo_keywords',ProjectController.add_seo_keywords);
router.get('/get_seo_keywords/:id',ProjectController.get_seo_keywords);
router.get('/delete_seo_keywords/:id',ProjectController.delete_seo_keywords);
router.post('/update_seo_keywords',ProjectController.update_seo_keywords);



module.exports = router;
