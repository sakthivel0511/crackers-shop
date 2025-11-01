// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const sendOrderRoute = require('./routes/sendmsg');

const dotenv = require("dotenv");
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected to crackers database'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api', sendOrderRoute);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


