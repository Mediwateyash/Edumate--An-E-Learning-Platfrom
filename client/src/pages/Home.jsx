import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <div className="hero">
                <h1>Welcome to Edumate</h1>
                <p>An Advanced E-Learning Platform with MCQ Generator</p>
                <div className="hero-buttons">
                    <Link to="/login" className="btn-login">Login</Link>
                    <Link to="/register" className="btn-register">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
