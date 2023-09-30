import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";
import "./payment.css";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [bankAccount, setBankAccount] = useState({
    bankAccountNumber: "",
    account_holder_name: "",
    account_holder_type: "individual",
  });
  // const [paymentMethodId, setPaymentMethodId] = useState("");
  const [showBankAccountForm, setShowBankAccountForm] = useState(false);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/bill");
      setPayments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBanks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/agent");
      setBanks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = (billNumber, serviceProviderBIN) => {
    setShowBankAccountForm(true);
  };

  const handleBankAccountSubmit = async () => {
    try {
      // Create and verify the PaymentMethod
      const paymentMethodResponse = await axios.post(
        "http://localhost:3001/create-payment-method",
        {
          bankAccountNumber: bankAccount.bankAccountNumber,
          bankAccountName: bankAccount.account_holder_name,
        }
      );

      const paymentMethodId = paymentMethodResponse.data.paymentMethodId;

      // Find the selected bill from the payments array
    const selectedBill = payments.find((bill) => bill.selected);

    if (selectedBill) {
      const response = await axios.post('http://localhost:3001/payment', {
        billNumber: selectedBill.billNumber,
        serviceProviderBIN: selectedBill.serviceProviderBIN,
        amount: selectedBill.totalAmount,
        currency: 'ETB', // Replace with the actual currency
        bankAccount,
        paymentMethodId,
      });
    

      if (response.data.status === "succeeded") {
        // Payment succeeded
        console.log("Paid");
      } else {
        // Payment failed
        console.log("Payment failed");
      }
    }
    } catch (error) {
      console.error(error);
    }
  
  };

  const handleChange = (e) => {
    setBankAccount({
      ...bankAccount,
      [e.target.name]: e.target.value,
    });
  };
  const handleBankSelection = (e) => {
    setSelectedBank(e.target.value);
  };

  return (
    <div className="container">
      <h1>Bill Detail</h1>
      {payments.map((bill) => (
        <div key={bill.billNumber} className="bill-container">
          <div className="bill-header">
            <h2>Bill Number: {bill.billNumber}</h2>
            <h3>Date Issued: {bill.dateIssued}</h3>
          </div>
          <div className="bill-details">
            <div className="bill-section">
              <h4>Customer Information</h4>
              <p>Customer Name: {bill.customerName}</p>
            </div>
            <div className="bill-section">
              <h4>Service Details</h4>
              <p>Description: {bill.serviceDescription}</p>
              <p>Period: {bill.servicePeriod}</p>
              <p>Charges: {bill.serviceCharges}</p>
              <p>Additional Charges: {bill.additionalCharges}</p>
            </div>
            <div className="bill-section">
              <h4>Payment Details</h4>
              <p>Amount Due: {bill.amountDue}</p>
              <p>Due Date: {bill.dueDate}</p>
              <p>Bill Status: {bill.billStatus}</p>
              <p>Total Amount: {bill.totalAmount}</p>
            </div>
          </div>
          <Button
            className="pay-btn"
            onClick={() =>
              handlePayment(bill.billNumber, bill.serviceProviderBIN)
            }
          >
            Pay Now
          </Button>
        </div>
      ))}
      {showBankAccountForm && (
        <div className="input-container">
          <h2>Bank Account Details</h2>
          {/* Bank selection dropdown */}
          <select name="bank" onChange={handleBankSelection} className="custom-select">
            <option value="">Select Bank</option>
            {banks.map((agent) => (
              <option key={agent.agentBIN} value={agent.agentBIN}>
                {agent.agentName}
              </option>
            ))}
          </select>
          <Input
            className="shorter-input"
            name="bankAccountNumber"
            value={bankAccount.bankAccountNumber}
            onChange={handleChange}
            placeholder="Bank Account Number"
          />
          <Input
            className="shorter-input"
            name="account_holder_name"
            value={bankAccount.account_holder_name}
            onChange={handleChange}
            placeholder="Account Holder Name"
          />
          <br />
          <Button className="pay" onClick={handleBankAccountSubmit}>Pay</Button>
        </div>
      )}
    </div>
  );
};

export default Payment;