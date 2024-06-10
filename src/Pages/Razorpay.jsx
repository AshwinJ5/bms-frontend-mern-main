import React, { useState } from 'react';
import axios from 'axios';

function Razorpay() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  const handlePayment = async () => {
    const orderUrl = 'http://localhost:5000/create-order';
    const order = await axios.post(orderUrl, {
      amount: amount * 100, // convert to smallest currency unit
      currency: 'INR',
      receipt: `receipt_${Math.random().toString(36).substring(7)}`
    });

    const options = {
      key: 'rzp_test_ETNHrYLVBSuAXf',
      amount: order.data.amount,
      currency: order.data.currency,
      name: 'Your Company Name',
      description: 'Test Transaction',
      order_id: order.data.id,
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: name,
        email: 'test@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h1>Razorpay Payment Gateway Integration</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
}

export default Razorpay;
