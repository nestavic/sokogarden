import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaYoutube, FaHeadset, FaShieldAlt, FaShippingFast, FaCreditCard } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5">
      {/* Main Footer Content */}
      <div className="container">
        <div className="row g-4">
          {/* Quick Links */}
          <div className="col-md-3 col-6">
            <h5 className="text-uppercase fw-bold mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none hover-primary">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-white text-decoration-none hover-primary">Shop</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white text-decoration-none hover-primary">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-white text-decoration-none hover-primary">Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white text-decoration-none hover-primary">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-md-3 col-6">
            <h5 className="text-uppercase fw-bold mb-4">Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/products/games" className="text-white text-decoration-none hover-primary">Games</Link>
              </li>
              <li className="mb-2">
                <Link to="/products/consoles" className="text-white text-decoration-none hover-primary">Consoles</Link>
              </li>
              <li className="mb-2">
                <Link to="/products/accessories" className="text-white text-decoration-none hover-primary">Accessories</Link>
              </li>
              <li className="mb-2">
                <Link to="/products/merchandise" className="text-white text-decoration-none hover-primary">Merchandise</Link>
              </li>
              <li className="mb-2">
                <Link to="/products/vr" className="text-white text-decoration-none hover-primary">VR Gear</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-3 col-6">
            <h5 className="text-uppercase fw-bold mb-4">Customer Service</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/faq" className="text-white text-decoration-none hover-primary">FAQ</Link>
              </li>
              <li className="mb-2">
                <Link to="/shipping" className="text-white text-decoration-none hover-primary">Shipping Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/returns" className="text-white text-decoration-none hover-primary">Return Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-white text-decoration-none hover-primary">Privacy Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-white text-decoration-none hover-primary">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-md-3 col-6">
            <h5 className="text-uppercase fw-bold mb-4">Connect With Us</h5>
            <div className="mb-4">
              <p className="mb-1">
                <i className="bi bi-geo-alt-fill me-2"></i> 123 Gaming St, Digital City
              </p>
              <p className="mb-1">
                <i className="bi bi-telephone-fill me-2"></i> +1 234 567 890
              </p>
              <p className="mb-1">
                <i className="bi bi-envelope-fill me-2"></i> support@gamestore.com
              </p>
            </div>
            <div className="social-icons">
            <div className="social-icons">
  <Link to="https://facebook.com/yourpage" className="text-white me-3 hover-primary">
    <FaFacebook size={20} />
  </Link>
  <Link to="https://twitter.com/yourpage" className="text-white me-3 hover-primary">
    <FaTwitter size={20} />
  </Link>
  <Link to="https://instagram.com/yourpage" className="text-white me-3 hover-primary">
    <FaInstagram size={20} />
  </Link>
  <Link to="https://discord.gg/yourserver" className="text-white me-3 hover-primary">
    <FaDiscord size={20} />
  </Link>
  <Link to="https://youtube.com/yourchannel" className="text-white hover-primary">
    <FaYoutube size={20} />
  </Link>
</div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="row mt-5 pt-3 border-top border-secondary">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-center gap-4">
              <div className="d-flex align-items-center">
                <FaHeadset className="text-primary me-2" size={24} />
                <span>24/7 Support</span>
              </div>
              <div className="d-flex align-items-center">
                <FaShieldAlt className="text-primary me-2" size={24} />
                <span>Secure Payments</span>
              </div>
              <div className="d-flex align-items-center">
                <FaShippingFast className="text-primary me-2" size={24} />
                <span>Fast Delivery</span>
              </div>
              <div className="d-flex align-items-center">
                <FaCreditCard className="text-primary me-2" size={24} />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black py-3 mt-4">
        <div className="container text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} GameZone. All rights reserved. | 
            Designed with <span className="text-danger">♥</span> for gamers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;