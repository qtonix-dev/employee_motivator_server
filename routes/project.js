const express = require('express');
const router = express.Router();

const ProjectController = require('../controllers/ProjectController');

router.get('/',ProjectController.index);
router.post('/',ProjectController.store);
router.put('/:id',ProjectController.update);
router.patch('/:id',ProjectController.deleteuser);
router.get('/:id',ProjectController.view);

module.exports = router;
