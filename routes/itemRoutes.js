const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.index);
router.get('/new', itemController.createForm);
router.post('/', itemController.create);
router.get('/:id', itemController.show);
router.get('/:id/edit', itemController.editForm);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.delete);

module.exports = router;