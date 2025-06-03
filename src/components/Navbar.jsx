import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { 
  FaHome, 
  FaUpload, 
  FaShoppingCart, 
  FaSignInAlt, 
  FaUserPlus,
  FaSignOutAlt,
  FaInfoCircle,
  FaGamepad
} from 'react-icons/fa';
import logo from '../assets/images/logo.jpeg'; // Replace with your actual logo path

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const getInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark gaming-navbar" style={{ backgroundColor: '#1a1a2e' }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <div className="gaming-logo me-2">
              {/* Using both image logo and icon as fallback */}
              <img 
                src={logo} 
                alt="Game Chronicles Logo" 
                style={{ height: '40px', width: 'auto' }}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.style.display = 'none';
                  document.getElementById('logo-fallback').style.display = 'block';
                }}
              />
              <span id="logo-fallback" className="logo-icon" style={{ display: 'none' }}>
                <FaGamepad size={24} />
              </span>
            </div>
            <span className="brand-name fw-bold" style={{ color: '#e94560' }}>Game Chronicles</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-1">
                <Link to="/" className="nav-link gaming-link d-flex align-items-center">
                  <FaHome className="me-2" />
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link to="/Aboutus" className="nav-link gaming-link d-flex align-items-center">
                  <FaInfoCircle className="me-2" />
                  <span>About Us</span>
                </Link>
              </li>
              <li className="nav-item mx-1">
                <Link to="/Uploadproducts" className="nav-link gaming-link d-flex align-items-center">
                  <FaUpload className="me-2" />
                  <span>Upload</span>
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item mx-1">
                    <Link to="/Getproducts" className="nav-link gaming-link d-flex align-items-center">
                      <FaShoppingCart className="me-2" />
                      <span>Cart</span>
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link to="/profile" className="nav-link gaming-link d-flex align-items-center">
                      <span
                        className="avatar me-2 d-flex align-items-center justify-content-center"
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: '#e94560',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        {getInitial(user.username)}
                      </span>
                      <span>{user.username || 'Profile'}</span>
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <button
                      className="nav-link gaming-link btn btn-link d-flex align-items-center"
                      onClick={handleLogout}
                      style={{ color: '#fff' }}
                    >
                      <FaSignOutAlt className="me-2" />
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-1">
                    <Link to="/Signin" className="nav-link gaming-link d-flex align-items-center">
                      <FaSignInAlt className="me-2" />
                      <span>Sign In</span>
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link to="/Signup" className="nav-link gaming-link d-flex align-items-center">
                      <FaUserPlus className="me-2" />
                      <span>Sign Up</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;