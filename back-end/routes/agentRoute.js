const express = require('express');
const agentRoute = express.Router();
const AgentController = require('../controller/agentController.js');


agentRoute.post('/',AgentController.upload,AgentController.create)
agentRoute.post('/:id',AgentController.login)
agentRoute.get('/', AgentController.findAll)
agentRoute.get('/:id', AgentController.findOne)
agentRoute.put('/:id', AgentController.update)
agentRoute.delete('/:id', AgentController.delete)

module.exports= agentRoute