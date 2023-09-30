// import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const PaymentForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Send the form data to the backend
      await axios.post('http://localhost:3001/paymentForm', values);
      console.log('Form submitted successfully!');
      console.log('Form values:', values);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Payment ID" name="paymentID" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Payment Date" name="paymentDate" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Payer ID" name="payerID" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Payee ID" name="payeeID" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Payment Description" name="paymentDescription" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Receipt Number" name="receiptNumber" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;