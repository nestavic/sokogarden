import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css";
import games001 from "../assets/images/spiderman2.jpeg";
import controllerImage from "../assets/images/controler 004.jpg";
import vrImage from "../assets/images/vr.webp";
import psImage from "../assets/images/ps5.webp";
import Footer from "./Footer";
import Carousel from "./Carousel";
import Chatbot from "./Chatbot";

const HomePage = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Games", image: games001, path: "/Getproducts" },
    { name: "Controllers", image: controllerImage, path: "/Getproducts" },
    { name: "VR Gear", image: vrImage, path: "/Getproducts" },
    { name: "Consoles", image: psImage, path: "/Getproducts" },
  ];

  const features = [
    { icon: "🚀", title: "Fast Delivery", description: "Get your gear in 24-48 hours" },
    { icon: "🛡️", title: "2-Year Warranty", description: "All products come with warranty" },
    { icon: "💳", title: "Flexible Payments", description: "Pay in installments with 0% APR" },
    { icon: "🔄", title: "Easy Returns", description: "30-day no-hassle return policy" },
  ];

  return (
    <div className="home-page">
      {/* Hero Section with Carousel */}
      <Carousel />
      
      {/* Modern Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">Next Level Gaming Starts Here</h1>
          <p className="hero-subtitle">Discover the hottest titles and exclusive deals</p>
          <div className="hero-buttons">
            <Link to="/getproducts" className="btn btn-primary btn-lg mx-2">
              Shop Now <i className="bi bi-arrow-right"></i>
            </Link>
            <button className="btn btn-outline-light btn-lg mx-2">
              Latest Releases <i className="bi bi-joystick"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-5">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our wide range of gaming products</p>
          </div>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div className="col-md-3" key={index}>
                <div 
                  className="category-card card h-100 border-0 shadow-sm hover-effect"
                  onClick={() => navigate("/Getproducts")}
                >
                  <div className="category-image-container">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="card-img-top category-image" 
                    />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="card-body text-center">
                    <h3 className="category-name">{category.name}</h3>
                    <button className="btn btn-sm btn-outline-primary mt-2">
                      View Products <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-dark">
        <div className="container">
          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-md-3" key={index}>
                <div className="feature-card text-center p-4 rounded-3 h-100">
                  <div className="feature-icon mb-3">{feature.icon}</div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-text">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="cta-title mb-4">Ready to Level Up Your Gaming?</h2>
          <p className="cta-text mb-4">Join thousands of satisfied gamers in our community</p>
          <div className="cta-buttons">
            <Link to="/getproducts" className="btn btn-light btn-lg mx-2">
              Shop Now <i className="bi bi-arrow-right"></i>
            </Link>
            
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default HomePage;