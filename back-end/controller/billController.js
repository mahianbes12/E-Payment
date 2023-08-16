const asyncHandler = require('express-async-handler');
const db = require('../models');

const Bill = db.Bill;

// Create and save a new bill
exports.create = asyncHandler(async (req, res) => {
  // Validate request
  if (!req.body.billNumber ||
    !req.body.dateIssued ||
    !req.body.dueDate ||
    !req.body.amountDue ||
    !req.body.customerName ||
    !req.body.serviceDescription ||
    !req.body.serviceCharges ||
    !req.body.billStatus ) {
      
      res.status(400).send({
      message: 'cannot be empty',
    });
    return;
  }


  // Calculate the total amount by adding service charges, amount due, and any additional charges
  const serviceCharges = parseFloat(req.body.serviceCharges);
  const amountDue = parseFloat(req.body.amountDue);
  const additionalCharges = parseFloat(req.body.additionalCharges || 0); // additionalCharges is optional
  const totalAmount = serviceCharges + amountDue + additionalCharges;


  // Create a bill object
  const bill = {
    billNumber: req.body.billNumber,
    dateIssued: req.body.dateIssued,
    dueDate: req.body.dueDate,
    amountDue: amountDue,
    customerName: req.body.customerName,
    serviceDescription: req.body.serviceDescription,
    serviceCharges: serviceCharges,
    billStatus: req.body.billStatus,
    additionalCharges: additionalCharges,
    servicePeriod: req.body.servicePeriod,
    totalAmount: totalAmount
  };

  // Save bill in the database
  const data = await Bill.create(bill);
  res.send(data);
});

// Retrieve all bills from the database
exports.findAll = asyncHandler(async (req, res) => {
  const data = await Bill.findAll();
  res.send(data);
});

// Find a single bill by id
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await Bill.findByPk(id);
  if (!data) {
    res.status(404).send({
      message:
        (`Bill with id=${id} not found`),
    });
  } else {
    res.send(data);
  }
});


// Update a bill by id
exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Retrieve the existing bill
  const existingBill = await Bill.findByPk(id);

  if (!existingBill) {
    res.status(404).send({
      message: `Bill with id=${id} not found`,
    });
    return;
  }

  // Update the bill object with the new values
  existingBill.billNumber = req.body.billNumber || existingBill.billNumber;
  existingBill.dateIssued = req.body.dateIssued || existingBill.dateIssued;
  existingBill.dueDate = req.body.dueDate || existingBill.dueDate;
  existingBill.amountDue = req.body.amountDue || existingBill.amountDue;
  existingBill.customerName = req.body.customerName || existingBill.customerName;
  existingBill.serviceDescription = req.body.serviceDescription || existingBill.serviceDescription;
  existingBill.serviceCharges = req.body.serviceCharges || existingBill.serviceCharges;
  existingBill.billStatus = req.body.billStatus || existingBill.billStatus;
  existingBill.additionalCharges = req.body.additionalCharges || existingBill.additionalCharges || 0; // Assign default value of 0 if not provided
  existingBill.servicePeriod = req.body.servicePeriod || existingBill.servicePeriod;

  // Calculate the new totalAmount
  const serviceCharges = parseFloat(existingBill.serviceCharges);
  const amountDue = parseFloat(existingBill.amountDue);
  const additionalCharges = parseFloat(existingBill.additionalCharges || 0); // additionalCharges is optional
  existingBill.totalAmount = serviceCharges + amountDue + additionalCharges;

  // Save the updated bill in the database
  await existingBill.save();

  res.send({
    message: 'Bill was updated successfully.',
  });
});

// Delete a bill by id
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const num = await Bill.destroy({
    where: { id: id },
  });

  if (num === 1) {
    res.send({
      message: 'Bill was deleted successfully!',
    });
  } else {
    res.send({
      message: (`Cannot delete bill with id=${id}. Bill not found!`),
    });
  }
});