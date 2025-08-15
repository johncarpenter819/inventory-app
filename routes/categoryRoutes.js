const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.index);
router.get('/new', categoryController.createForm);
router.post('/', categoryController.create);
router.get('/:id', categoryController.show);
router.get('/:id/edit', categoryController.editForm);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router;