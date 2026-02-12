const express = require('express');
const router = express.Router();
const bonsaiController = require('../controllers/bonsai-controller');

router.get('/', bonsaiController.getAllBonsais);
router.get('/search/price', bonsaiController.filterByPrice);
router.get('/:id', bonsaiController.getBonsaiById);
router.post('/calculate', bonsaiController.calculateHealth);

module.exports = router;