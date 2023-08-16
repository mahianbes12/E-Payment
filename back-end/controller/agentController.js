const asyncHandler = require('express-async-handler');
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer')
const path = require ('path')

const Agents = db.Agents;

// Create and save a new agent
exports.create = asyncHandler(async (req, res) => {
  // Validate request
  if (
    !req.body.agentBIN ||
    !req.body.agentName ||
    !req.body.agentEmail ||
    !req.body.agentPassword ||
    !req.body.servicesOffered ||
    !req.body.phoneNumber ||
    !req.file.path
  ) {
    res.status(400).send({
      message: 'Fields cannot be empty',
    });
    return;
  }

  // Check if agent already exists
  const existingAgent = await Agents.findOne({
    where: {
      agentEmail: req.body.agentEmail,
    },
  });

  if (existingAgent) {
    res.status(409).send({
      message: 'Agent already exists',
    });
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(req.body.agentPassword, 10);

  // Create an agent object
  const agent = {
    agentBIN: req.body.agentBIN,
    agentName: req.body.agentName,
    agentEmail: req.body.agentEmail,
    agentPassword: hashedPassword,
    servicesOffered: req.body.servicesOffered,
    phoneNumber: req.body.phoneNumber,
    agentAuthorizationLetter: req.file.path,
  };

  // Save agent in the database
  const data = await Agents.create(agent);
  res.send(data);
});

// Retrieve all agents from the database
exports.findAll = asyncHandler(async (req, res) => {
  const data = await Agents.findAll();
  res.send(data);
});

// Find a single agent by id
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Agents.findByPk(id);
  if (!data) {
    res.status(404).send({
      message: `Agent with id=${id} not found`,
    });
  } else {
    res.send(data);
  }
});

// Update an agent by id
exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const [num] = await Agents.update(req.body, {
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'Agent was updated successfully.',
    });
  } else {
    res.send({
      message: `Cannot update agent with id=${id}. Agent not found or req.body is empty!`,
    });
  }
});

// Delete an agent by id
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const num = await Agents.destroy({
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'Agent was deleted successfully!',
    });
  } else {
    res.send({
      message: `Cannot delete agent with id=${id}. Agent not found!`,
    });
  }
});

// Agent login auth
exports.login = asyncHandler(async (req, res) => {
  try {
    const { agentEmail, agentPassword } = req.body;
    const agent = await Agents.findOne({
      where: { agentEmail },
    });

    if (!agent) {
      res.status(404).json({ error: 'Agent not found' });
    } else {
      const passwordMatch = await bcrypt.compare(agentPassword, agent.agentPassword);

      if (!passwordMatch) {
        res.status(401).json({ error: 'Incorrect password' });
      } else {
        const token = jwt.sign({ agentId: agent.id }, process.env.TOKEN_SECRET, {
          expiresIn: '1h',
        });
        res.status(200).json({ message: 'Login successful', token });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login agent', message: error.message });
  }
});


// upload image
const storage =multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'Images')
  }, 
  filename :(req, file, cb)=>{
     cb(null, Date.now()+path.extname(file.originalname))
      
  }
})
exports.upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('provide the proper format');
  }
}).single('agentAuthorizationLetter');