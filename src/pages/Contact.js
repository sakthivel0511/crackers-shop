import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Thank you for your feedback!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact-page">
      <div className="contact-card">
        <h2>📞 Contact Us</h2>
        <p><strong>Email:</strong> info@srivicrackers.com</p>
        <p><strong>Phone:</strong> +91 9876543210</p>
      </div>

      <div className="feedback-card">
        <h3>💬 We'd Love Your Feedback</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">🚀 Send Feedback</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
