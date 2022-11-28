const express = require('express');
const router = express.Router();

const DesignationController = require('../controllers/DesignationController');

router.get('/',DesignationController.index);
router.post('/',DesignationController.store);
router.put('/:id',DesignationController.update);
router.patch('/:id',DesignationController.deleteuser);
router.get('/:id',DesignationController.view);

module.exports = router;
