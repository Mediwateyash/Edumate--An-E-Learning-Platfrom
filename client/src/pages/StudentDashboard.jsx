import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user || user.role !== 'student') {
            navigate('/login');
        }
    }, [navigate, user]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Student Dashboard</h1>
            <h2>Welcome, {user?.name}!</h2>
            <p>You have successfully logged in as a Student.</p>
        </div>
    );
};

export default StudentDashboard;
