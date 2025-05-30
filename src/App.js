import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Getproducts from './components/Getproducts';
import Uploadproducts from './components/Uploadproducts';
import Makepayment from './components/Makepayment';
import HomePage from './components/Home';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Aboutus from "./components/Aboutus"
import Chatbot from './components/Chatbot';
import Singleproduct from './components/Singleproduct' 
import ForgotPassword from './components/Forgot';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="App">
            {/* Gaming-Themed Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark gaming-navbar">
              <div className="container-fluid">
                {/* Gaming Logo + Brand Name */}
                <Link to="/" className="navbar-brand d-flex align-items-center">
                  <div className="gaming-logo me-2">
                    <span className="logo-icon">🎮</span>
                  </div>
                  <span className="brand-name">Game Chronicles</span>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link to="/" className="nav-link gaming-link">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Uploadproducts" className="nav-link gaming-link">Upload</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Signin" className="nav-link gaming-link">Sign In</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Signup" className="nav-link gaming-link">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/aboutus" className="nav-link"><img src="images/681494.png" alt="" height= "20px"/>About us</Link>
                  
                    </li>
                  
                    
                  </ul>
                </div>
              </div>
            </nav>
            

            <Routes>
              <Route path='/Signin' Component={Signin}></Route>
              <Route path='/Signup' Component={Signup}></Route>
              <Route path='/Uploadproducts' Component={Uploadproducts}></Route>
              <Route path='/Getproducts' Component={Getproducts}></Route>
              <Route path='/payment' Component={Makepayment}></Route>
              <Route path='/' Component={HomePage}></Route>
              <Route path='/Footer' Component={Footer}></Route>
              <Route path='/Carousel' Component={Carousel}></Route>
              <Route path='/Aboutus' Component={Aboutus}></Route>
              <Route path='/Chatbot' Component={Chatbot}></Route>
              <Route path='/products' Component={Singleproduct}></Route>
              <Route path='/Forgot' Component={ForgotPassword}></Route>
              
            </Routes>
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;