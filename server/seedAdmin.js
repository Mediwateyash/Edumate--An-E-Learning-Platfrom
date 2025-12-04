const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/edumate')
    .then(async () => {
        console.log('DB Connection Successfull!');

        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            console.log('Admin already exists');
            process.exit();
        }

        const admin = new User({
            name: 'Admin User',
            phone: '0000000000',
            email: 'admin@edumate.com',
            password: 'adminpassword', // Plain text as requested
            institute: 'Edumate HQ',
            role: 'admin',
            status: 'approved'
        });

        await admin.save();
        console.log('Admin user created successfully');
        console.log('Email: admin@edumate.com');
        console.log('Password: adminpassword');
        process.exit();
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
