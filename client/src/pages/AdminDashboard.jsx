import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [pendingTeachers, setPendingTeachers] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
            navigate('/login');
        }
        fetchPendingTeachers();
        fetchUsers();
    }, [navigate]);

    const fetchPendingTeachers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/pending-teachers');
            setPendingTeachers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/users');
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/approve-teacher/${id}`);
            fetchPendingTeachers();
            fetchUsers();
        } catch (err) {
            alert('Error approving teacher');
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/reject-teacher/${id}`);
            fetchPendingTeachers();
            fetchUsers();
        } catch (err) {
            alert('Error rejecting teacher');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Dashboard</h1>

            <h3>Pending Teacher Requests</h3>
            {pendingTeachers.length === 0 ? (
                <p>No pending requests.</p>
            ) : (
                <table border="1" cellPadding="10" style={{ width: '100%', marginBottom: '20px' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Institute</th>
                            <th>Subject</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingTeachers.map((teacher) => (
                            <tr key={teacher._id}>
                                <td>{teacher.name}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.institute}</td>
                                <td>{teacher.subject}</td>
                                <td>
                                    <button onClick={() => handleApprove(teacher._id)} style={{ marginRight: '10px', background: 'green', color: 'white', border: 'none', padding: '5px 10px' }}>Approve</button>
                                    <button onClick={() => handleReject(teacher._id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h3>All Registered Users</h3>
            <table border="1" cellPadding="10" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
