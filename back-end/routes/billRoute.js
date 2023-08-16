const express = require('express');
const billRoute = express.Router();

const billController = require('../controller/billController.js');

// Define routes for bills resource
billRoute.post('/', billController.create);
billRoute.get('/', billController.findAll);
billRoute.get('/:id', billController.findOne);
billRoute.put('/:id', billController.update);
billRoute.delete('/:id', billController.delete);

module.exports = billRoute;