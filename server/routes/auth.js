const router = require('express').Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, phone, email, password, institute, subject, role } = req.body;

        // Basic validation
        if (!name || !phone || !email || !password || !institute || !role) {
            return res.status(400).json({ message: 'Please fill in all required fields.' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Determine status
        let status = 'pending';
        if (role === 'student') {
            status = 'approved';
        } else if (role === 'teacher') {
            status = 'pending';
        }

        const newUser = new User({
            name,
            phone,
            email,
            password, // Storing as plain text as requested
            institute,
            subject,
            role,
            status,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Simple password check (plain text)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Check status for teachers
        if (user.role === 'teacher' && user.status !== 'approved') {
            return res.status(403).json({ message: 'Your account is not approved yet. Please wait for administrator approval.' });
        }

        // Return user info (excluding password)
        const { password: _, ...userInfo } = user._doc;
        res.status(200).json(userInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
