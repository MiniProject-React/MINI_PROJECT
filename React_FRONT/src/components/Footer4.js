// Footer.js
import React from 'react';
import '../css/Footer4.css';
import logo from '../images/C_logo_black4.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo & Company Info */}
                <div className="footer-company">
                    <div className="footer-logo-container">
                        <img src={logo} alt="Logo" className="logo" />
                        <h2 className="footer-logo">COMNAWA</h2>
                    </div>
                    <p>ONLINE SHOPPING</p>
                    <p><strong>Address:</strong> 서울특별시 강남구 테헤란로46</p>
                    <p><strong>E-mail:</strong> Comnawa@gmail.com</p>
                    <p><strong>Phone:</strong> 02-1234-5678</p>
                </div>

                {/* Shopping and Categories */}
                <div className="footer-section shopping-categories">
                    <h3>Shopping and Categories</h3>
                    <br />
                    <ul className="category-list">
                        <li><Link to="/product/완성형 조립식 컴퓨터">Gaming PC</Link></li>
                        <li><Link to="/product/CPU Models">CPU</Link></li>
                        <li><Link to="/product/Board Models">Board</Link></li>
                        <li><Link to="/product/RAM Models">RAM</Link></li>
                        <li><Link to="/product/GPU Models">GPU</Link></li>
                        <li><Link to="/product/SSD Models">SSD</Link></li>
                        <li><Link to="/product/HDD Models">HDD</Link></li>
                    </ul>
                </div>

                {/* Useful Links */}
                <div className="footer-section">
                    <h3>Useful Links</h3>
                    <br/>
                    <ul>
                        <li><Link to="/Homepage">Homepage</Link></li>
                        <li><Link to="/Cart">Cart</Link></li>
                        <li><Link to="/TrackingId">Tracking Id</Link></li>
                    </ul>
                </div>

                {/* Help & Information */}
                <div className="footer-section">
                    <h3>Help & Information</h3>
                    <br />
                    <ul>
                        <li><Link to="/FAQs">FAQs</Link></li>
                        <li><Link to="/AboutUs">About Us</Link></li>
                        <li><Link to="/ContactUs">Contact Us</Link></li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-copyright">
                <p>Copyright &copy; 2024 Comnawa. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
