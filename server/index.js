const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/edumate')
    .then(() => console.log('DB Connection Successfull!'))
    .catch((err) => {
        console.log(err);
    });

// Routes
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
