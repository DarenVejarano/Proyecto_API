const express = require('express');
const router = express.Router();
const bonsaiController = require('../controllers/bonsai-controller');

router.get('/', bonsaiController.getAllBonsais);
router.get('/search/price', bonsaiController.filterByPrice);
router.post('/calculate', bonsaiController.calculateHealth);
router.get('/:id', bonsaiController.getBonsaiById);

module.exports = router;