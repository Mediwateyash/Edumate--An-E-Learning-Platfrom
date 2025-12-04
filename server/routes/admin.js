const router = require('express').Router();
const User = require('../models/User');

// Get pending teachers
router.get('/pending-teachers', async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher', status: 'pending' });
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Approve teacher
router.put('/approve-teacher/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Reject teacher
router.put('/reject-teacher/:id', async (req, res) => {
    try {
        // Option 1: Delete the user
        // await User.findByIdAndDelete(req.params.id);
        // res.status(200).json({ message: 'Teacher request rejected and removed.' });

        // Option 2: Mark as rejected (better for records)
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
