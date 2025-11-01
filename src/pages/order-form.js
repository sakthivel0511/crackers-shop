// src/pages/OrderForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderForm.css';

const OrderForm = () => {
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    const data = sessionStorage.getItem('orderSummary');
    if (data) {
      setOrderSummary(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, address, phone } = userData;

    if (!name || !address || !phone) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/send-order', {
        name,
        address,
        phone,
        items: orderSummary.items,
        total: orderSummary.netTotal,
      });

      if (response.data.success) {
        alert('✅ Order submitted successfully via WhatsApp');
        window.open(`https://wa.me/91${phone}?text=${encodeURIComponent('Thank you for your order, ' + name + '! Your order has been confirmed.')}`, '_blank');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to send order. Check console for more details.');
    }
  };

  if (!orderSummary) return null;

  return (
    <div className="order-form-page">
      <h2>📝 Fill Your Details</h2>
      <form className="order-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Address:
          <textarea
            name="address"
            value={userData.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Submit Order</button>
      </form>

      <div className="owner-contact">
        <h3>Need Help?</h3>
        <p>📞 Contact Owner: <strong>+91 9566428247</strong></p>
      </div>
    </div>
  );
};

export default OrderForm;
