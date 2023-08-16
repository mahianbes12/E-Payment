
const express = require('express');
const paymentRoute = express.Router();
const paymentController = require('../controller/PaymentController');

// Define routes for payment resource
paymentRoute.post('/', paymentController.create);
paymentRoute.get('/', paymentController.findAll);
paymentRoute.get('/:id', paymentController.findOne);
paymentRoute.put('/:id', paymentController.update);
paymentRoute.delete('/:id', paymentController.delete);

module.exports = paymentRoute;