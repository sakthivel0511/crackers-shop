require('dotenv').config();
const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// Replace these with your real Twilio credentials

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Shop owner's WhatsApp number (in Twilio sandbox format)
const shopOwnerNumber = 'whatsapp:+919566428247';

router.post('/send-order', async (req, res) => {
  const { name, phone, address, items, total } = req.body;

  const itemList = items.map(item =>
    `- ${item.name} x${item.quantity} @ ₹${item.discountPrice} = ₹${item.quantity * item.discountPrice}`
  ).join('\n');

  const message = `📦 New Order Received\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📬 Address: ${address}\n\n🧾 Items:\n${itemList}\n\n💰 Total: ₹${total}\n\n✅ Please confirm with the customer.`;

  try {
    await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // Twilio sandbox number
      to: shopOwnerNumber
    });

    res.json({ success: true, message: 'WhatsApp message sent to owner' });
  } catch (error) {
    console.error('WhatsApp send error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
