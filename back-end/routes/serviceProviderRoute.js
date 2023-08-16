const express = require('express');
const serviceProvidersRouter = express.Router();
const serviceProviderController = require('../controller/serviceProviderController');

serviceProvidersRouter.post('/', serviceProviderController.upload, serviceProviderController.create);
serviceProvidersRouter.get('/', serviceProviderController.findAll);
serviceProvidersRouter.get('/:id', serviceProviderController.findOne);
serviceProvidersRouter.put('/:id', serviceProviderController.update);
serviceProvidersRouter.delete('/:id', serviceProviderController.delete);
serviceProvidersRouter.post('/:id', serviceProviderController.login);

module.exports = serviceProvidersRouter;