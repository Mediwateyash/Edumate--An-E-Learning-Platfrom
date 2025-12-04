import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        institute: '',
        subject: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...formData, role };
            await axios.post('http://localhost:5000/api/auth/register', data);

            if (role === 'student') {
                alert('Registration successful! You can now login.');
                navigate('/login');
            } else {
                setMessage('Hello Teacher, your registration request has been sent to the administrator. Please wait for approval. Once approved, you will be able to log in.');
                setFormData({ name: '', phone: '', email: '', password: '', institute: '', subject: '' });
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container">
            <div className="auth-card">
                <h2>Register as {role === 'student' ? 'Student' : 'Teacher'}</h2>

                <div className="role-selector">
                    <button
                        onClick={() => setRole('student')}
                        className={`role-btn ${role === 'student' ? 'active' : ''}`}
                    >
                        Student
                    </button>
                    <button
                        onClick={() => setRole('teacher')}
                        className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
                    >
                        Teacher
                    </button>
                </div>

                {message ? (
                    <div style={{ color: 'green', marginBottom: '20px' }}>{message}</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Educational Institute</label>
                            <input type="text" name="institute" value={formData.institute} onChange={handleChange} required />
                        </div>

                        {role === 'teacher' && (
                            <div className="form-group">
                                <label>Subject (Optional)</label>
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
                            </div>
                        )}

                        <button type="submit" className="btn btn-success">Register</button>
                    </form>
                )}
                <div className="link-text">
                    Already have an account? <Link to="/login">Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
