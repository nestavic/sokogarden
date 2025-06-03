import React, { useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar, FaFire, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Assuming an AuthContext is used for authentication
import { AuthContext } from "../context/AuthContext"; // Adjust path to your AuthContext

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });
  const [searchFocused, setSearchFocused] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isAuthenticated = !!user; 
  const IMG_URL = "https://neista.pythonanywhere.com/static/images/";

  // Countdown timer for deals
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1;
        const newMinutes = newSeconds < 0 ? prev.minutes - 1 : prev.minutes;
        const newHours = newMinutes < 0 ? prev.hours - 1 : prev.hours;

        return {
          hours: newHours < 0 ? 23 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://neista.pythonanywhere.com/api/get_products");
      const enhanced = response.data.map((p) => ({
        ...p,
        rating: p.rating || Math.floor(Math.random() * 3) + 3,
        discount: Math.abs(p.discount || (Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 10 : 0)),
        isNew: Math.random() > 0.8,
        isHot: Math.random() > 0.85,
      }));
      setProducts(enhanced);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (searchTerm) {
      list = list.filter((p) =>
        p.product_name && p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return list;
  }, [products, searchTerm]);

  const renderStars = (rating) => {
    return (
      <div className="mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < rating ? "text-warning" : "text-muted"} />
        ))}
      </div>
    );
  };

  const handleBuyNow = (product) => {
    if (!isAuthenticated) {
      // Show notification and redirect to signup for non-authenticated users
      toast.error("Please sign up or log in to purchase games!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/signup");
      }, 1000); // Delay redirect to allow notification to be seen
    } else {
      // Allow authenticated users to proceed to product page
      navigate("/products", { state: { product } });
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return (price * (100 - discount) / 100).toFixed(2);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const searchBarVariants = {
    collapsed: { width: "300px" },
    expanded: { width: "500px" },
  };

  return (
    <div className="container-fluid py-4 px-4" style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' }}>
      <ToastContainer />
      <div className="container">
        <motion.h2
          className="mb-4 text-center fw-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎮 <span style={{ color: '#00fffc' }}>GAME</span> <span style={{ color: '#fc00ff' }}>STORE</span>
        </motion.h2>

        {/* Flash Sale Banner */}
        <motion.div
          className="alert alert-danger mb-4 d-flex align-items-center justify-content-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="d-flex align-items-center">
            <FaFire className="me-2" size={24} />
            <strong>FLASH SALE!</strong> <span className="ms-2">Ends in: </span>
          </div>
          <div className="d-flex align-items-center">
            <span className="badge bg-dark me-2">
              {timeLeft.hours.toString().padStart(2, '0')}h
            </span>
            <span className="badge bg-dark me-2">
              {timeLeft.minutes.toString().padStart(2, '0')}m
            </span>
            <span className="badge bg-dark">
              {timeLeft.seconds.toString().padStart(2, '0')}s
            </span>
          </div>
        </motion.div>

        {/* Impressive Search Bar */}
        <motion.div
          className="mb-4 d-flex justify-content-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="search-container"
            initial={false}
            animate={searchFocused ? "expanded" : "collapsed"}
            variants={searchBarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="input-group" style={{ position: 'relative' }}>
              <motion.span
                className="input-group-text bg-dark border-dark text-white"
                animate={{
                  backgroundColor: searchFocused ? '#1a1a2e' : '#0f0c29',
                  borderColor: searchFocused ? '#00fffc' : '#302b63',
                }}
                transition={{ duration: 0.3 }}
              >
                <FaSearch />
              </motion.span>
              <input
                type="text"
                className="form-control bg-dark text-white border-dark"
                placeholder={searchFocused ? "Search for games, categories, etc..." : "Search games..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                style={{
                  color: 'white',
                  borderLeft: 'none',
                  boxShadow: searchFocused ? '0 0 0 2px rgba(0, 255, 252, 0.2)' : 'none',
                }}
              />
              <AnimatePresence>
                {searchTerm && (
                  <motion.button
                    className="btn btn-sm position-absolute end-0 top-50 translate-middle-y me-2"
                    onClick={() => setSearchTerm('')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: 'transparent',
                      color: '#fc00ff',
                      border: 'none',
                    }}
                  >
                    ×
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-white">Loading games...</p>
          </div>
        ) : (
          <div className="row justify-content-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div
                  className="col-lg-3 col-md-4 col-sm-6 mb-4"
                  key={product.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div
                    className="card h-100 shadow-lg border-0"
                    style={{
                      background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s',
                      cursor: 'pointer',
                    }}
                  >
                    <div className="position-relative">
                      <img
                        src={IMG_URL + product.product_photo}
                        alt={product.product_name}
                        className="card-img-top"
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          width: '100%',
                        }}
                      />
                      {product.discount > 0 && (
                        <div className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded-pill">
                          -{product.discount}%
                        </div>
                      )}
                      {product.isNew && (
                        <div className="position-absolute top-0 end-0 bg-primary text-white px-2 py-1 m-2 rounded-pill">
                          NEW
                        </div>
                      )}
                      {product.isHot && (
                        <div className="position-absolute top-0 end-0 bg-warning text-dark px-2 py-1 m-2 rounded-pill">
                          <FaFire className="me-1" /> HOT
                        </div>
                      )}
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-white">{product.product_name}</h5>
                      {renderStars(product.rating)}
                      <p className="card-text text-white mb-3" style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                        {product.product_description.slice(0, 100)}...
                      </p>
                      <div className="mt-auto">
                        {product.discount > 0 ? (
                          <div className="mb-2">
                            <span className="text-decoration-line-through text-muted me-2">
                              KES {product.product_cost}
                            </span>
                            <span className="fw-bold text-success fs-5">
                              KES {calculateDiscountedPrice(product.product_cost, product.discount)}
                            </span>
                          </div>
                        ) : (
                          <span className="fw-bold text-success fs-5">KES {product.product_cost}</span>
                        )}
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex gap-2">
                            {product.isNew && (
                              <span className="badge bg-primary">New Release</span>
                            )}
                            {product.isHot && (
                              <span className="badge bg-warning text-dark">Trending</span>
                            )}
                          </div>
                        </div>
                        <button
                          className="btn btn-primary w-100 rounded-pill"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyNow(product); 
                          }}
                          style={{
                            background: 'linear-gradient(45deg, #00fffc, #fc00ff)',
                            border: 'none',
                            fontWeight: '600',
                          }}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-12 text-center mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-white fs-4">No games found</div>
                <p className="text-muted-light">Try a different search term</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetProducts;