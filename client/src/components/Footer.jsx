import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h2 className="footer-logo">EDUMATE</h2>
                    <p className="footer-full-name">Education Material & Assessment Technology Environment</p>
                    <p className="footer-desc">Major Project – Final Year</p>
                    <p className="footer-institute">Watumull College of Engineering and Technology</p>
                    <p className="footer-copyright">&copy; 2025 EDUMATE. All rights reserved.</p>
                </div>

                <div className="footer-right">
                    <h3 className="dev-title">Meet the Developers</h3>
                    <div className="dev-links">
                        <a href="https://example.com/yash" target="_blank" rel="noopener noreferrer">Yash Diwate ↗</a>
                        <a href="https://example.com/anush" target="_blank" rel="noopener noreferrer">Anush Gajbiye ↗</a>
                        <a href="https://example.com/mrityunjay" target="_blank" rel="noopener noreferrer">Mrityunjay Dwivedi ↗</a>
                        <a href="https://example.com/sneha" target="_blank" rel="noopener noreferrer">Sneha Shinde ↗</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
