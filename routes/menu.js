const express = require('express');
const router = express.Router();

const MenuController = require('../controllers/MenuController');

router.get('/clearcache',MenuController.clearcache);
router.get('/menuinfo',MenuController.menuinfo);

router.get('/',MenuController.index);
router.get('/:id',MenuController.view);

router.get('/web/:id',MenuController.viewweb);





router.post('/',MenuController.store);
router.put('/:id',MenuController.update);



module.exports = router;
