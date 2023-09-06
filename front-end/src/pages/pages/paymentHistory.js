import React, { useEffect, useState } from "react";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    // Fetch payment history from local storage
    const storedPaymentHistory = JSON.parse(localStorage.getItem("paymentHistorys")) || [];
    setPaymentHistory(storedPaymentHistory);
  }, []);

  return (
    <div>
      <h1>Payment History</h1>
      {paymentHistory.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Transaction No</th>
              <th>Payment Method</th>
              <th>Description</th>
              <th>Reference Number</th>
              <th>Total Amount</th>
              <th>Payment Date</th>
              <th>Payer</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, index) => (
              <tr key={index}>
                <td>{payment.TransactionNo}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.paymentDescription}</td>
                <td>{payment.ReferenceNo}</td>
                <td>{payment.amount}</td>
                <td>{payment.paymentDate}</td>
                <td>{payment.payerId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payment history available.</p>
      )}
    </div>
  );
};

export default PaymentHistory;