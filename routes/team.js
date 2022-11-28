const express = require('express');
const router = express.Router();

const TeamController = require('../controllers/TeamController');

router.get('/',TeamController.index);
router.post('/',TeamController.store);
router.put('/:id',TeamController.update);
router.patch('/:id',TeamController.deleteuser);
router.get('/:id',TeamController.view);

module.exports = router;
