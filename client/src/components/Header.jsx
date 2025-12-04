import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="header-logo">EDUMATE</Link>
                <nav className="header-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    {!user ? (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
