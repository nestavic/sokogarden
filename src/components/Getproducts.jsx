import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar, FaTimes } from "react-icons/fa";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showWishlistSidebar, setShowWishlistSidebar] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  const navigate = useNavigate();
  const IMG_URL = "https://neista.pythonanywhere.com/static/images/";

  useEffect(() => {
    fetchProducts();
    loadFromStorage();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://neista.pythonanywhere.com/api/get_products");
      const enhanced = response.data.map((p) => ({
        ...p,
        rating: p.rating || Math.floor(Math.random() * 3) + 3,
      }));
      setProducts(enhanced);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const loadFromStorage = () => {
    try {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      
      setWishlist(storedWishlist.filter(item => item && item.id));
      setCart(storedCart.filter(item => item && item.id));
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      localStorage.setItem("wishlist", JSON.stringify([]));
      localStorage.setItem("cart", JSON.stringify([]));
      setWishlist([]);
      setCart([]);
    }
  };

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    
    const isInWishlist = wishlist.some(item => item.id === product.id);
    let updatedWishlist;
    
    if (isInWishlist) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }
    
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const toggleCart = (product) => {
    if (!product || !product.id) return;
    
    const existingItem = cart.find(item => item.id === product.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.filter(item => item.id !== product.id);
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    );
    
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.product_cost) || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (searchTerm) {
      list = list.filter((p) =>
        p.product_name && p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeTab === "wishlist") {
      const wishlistIds = wishlist.map(item => item.id);
      list = list.filter((p) => wishlistIds.includes(p.id));
    } else if (activeTab === "cart") {
      const cartIds = cart.map(item => item.id);
      list = list.filter((p) => cartIds.includes(p.id));
    }

    return list;
  }, [products, searchTerm, activeTab, wishlist, cart]);

  const renderStars = (rating) => {
    return (
      <div className="mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < rating ? "text-warning" : "text-secondary"} />
        ))}
      </div>
    );
  };

  const handleCheckout = () => {
    setShowCartSidebar(false);
    navigate("/payment", {
      state: {
        cartItems: cart,
        totalAmount: cartTotal
      }
    });
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold text-light">🕹️ Game Store</h2>

      <div className="mb-4 d-flex justify-content-between align-items-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="btn-group ms-3">
          <button className={`btn btn-outline-primary ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            All
          </button>
          <button className={`btn btn-outline-danger ${activeTab === "wishlist" ? "active" : ""}`} onClick={() => setActiveTab("wishlist")}>
            Wishlist ({wishlist.length})
          </button>
          <button className={`btn btn-outline-success ${activeTab === "cart" ? "active" : ""}`} onClick={() => setActiveTab("cart")}>
            Cart ({cart.length})
          </button>
        </div>
      </div>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={IMG_URL + product.product_photo}
                  alt={product.product_name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.product_name}</h5>
                  {renderStars(product.rating)}
                  <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                    {product.product_description.slice(0, 60)}...
                  </p>
                  <p className="fw-bold text-success">${product.product_cost}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => navigate("/products", { state: { product } })}
                    >
                      Buy Now
                    </button>
                    <div>
                      <button
                        className="btn btn-sm me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                      >
                        {wishlist.some(item => item.id === product.id) ? (
                          <FaHeart className="text-danger" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCart(product);
                        }}
                      >
                        <FaShoppingCart
                          className={cart.some(item => item.id === product.id) ? "text-success" : ""}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-5">No products found.</p>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="position-fixed end-0 top-50 translate-middle-y z-3 me-3">
        <div className="d-flex flex-column gap-2">
          <motion.button 
            className="btn btn-dark rounded-circle p-3 position-relative" 
            onClick={() => {
              setShowWishlistSidebar(true);
              setShowCartSidebar(false);
            }}
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
          >
            <FaHeart className="fs-5" />
            {wishlist.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishlist.length}
              </span>
            )}
          </motion.button>

          <motion.button 
            className="btn btn-dark rounded-circle p-3 position-relative" 
            onClick={() => {
              setShowCartSidebar(true);
              setShowWishlistSidebar(false);
            }}
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
          >
            <FaShoppingCart className="fs-5" />
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Wishlist Sidebar */}
      {showWishlistSidebar && (
        <motion.div 
          className="position-fixed end-0 top-0 h-100 bg-white shadow-lg z-2" 
          style={{ width: "350px", maxWidth: "90vw" }}
          initial={{ x: "100%" }} 
          animate={{ x: 0 }} 
          exit={{ x: "100%" }} 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-3 h-100 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Your Wishlist</h4>
              <button 
                className="btn btn-sm btn-outline-danger" 
                onClick={() => setShowWishlistSidebar(false)}
              >
                <FaTimes />
              </button>
            </div>
            {wishlist.length === 0 ? (
              <div className="text-center my-auto">
                <FaRegHeart className="text-muted fs-1" />
                <p className="mt-2">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="flex-grow-1 overflow-auto">
                {wishlist.map((item) => (
                  <div key={item.id} className="card mb-2">
                    <div className="row g-0">
                      <div className="col-4">
                        <img 
                          src={IMG_URL + item.product_photo} 
                          className="img-fluid rounded-start h-100" 
                          alt={item.product_name}
                          style={{ objectFit: "cover", minHeight: "100px" }}
                        />
                      </div>
                      <div className="col-8">
                        <div className="card-body py-2">
                          <h6 className="card-title">{item.product_name}</h6>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted">${item.product_cost}</span>
                            <div className="d-flex gap-2">
                              <button 
                                className="btn btn-sm btn-outline-success" 
                                onClick={() => {
                                  toggleCart(item);
                                  setShowWishlistSidebar(false);
                                  setShowCartSidebar(true);
                                }}
                              >
                                <FaShoppingCart />
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-danger" 
                                onClick={() => toggleWishlist(item)}
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Cart Sidebar */}
      {showCartSidebar && (
        <motion.div 
          className="position-fixed end-0 top-0 h-100 bg-white shadow-lg z-2" 
          style={{ width: "350px", maxWidth: "90vw" }}
          initial={{ x: "100%" }} 
          animate={{ x: 0 }} 
          exit={{ x: "100%" }} 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-3 h-100 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Your Cart</h4>
              <button 
                className="btn btn-sm btn-outline-danger" 
                onClick={() => setShowCartSidebar(false)}
              >
                <FaTimes />
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="text-center my-auto">
                <FaShoppingCart className="text-muted fs-1" />
                <p className="mt-2">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="flex-grow-1 overflow-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="card mb-2">
                      <div className="row g-0">
                        <div className="col-4">
                          <img 
                            src={IMG_URL + item.product_photo} 
                            className="img-fluid rounded-start h-100" 
                            alt={item.product_name}
                            style={{ objectFit: "cover", minHeight: "100px" }}
                          />
                        </div>
                        <div className="col-8">
                          <div className="card-body py-2">
                            <h6 className="card-title">{item.product_name}</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="text-muted">${item.product_cost}</span>
                              <div className="d-flex align-items-center gap-2">
                                <div className="input-group input-group-sm" style={{ width: "100px" }}>
                                  <button 
                                    className="btn btn-outline-secondary" 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    -
                                  </button>
                                  <input 
                                    type="text" 
                                    className="form-control text-center" 
                                    value={item.quantity} 
                                    readOnly 
                                  />
                                  <button 
                                    className="btn btn-outline-secondary" 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                                <button 
                                  className="btn btn-sm btn-outline-danger" 
                                  onClick={() => toggleCart(item)}
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            </div>
                            <div className="text-end fw-bold">
                              ${(parseFloat(item.product_cost) || 0) * item.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                    <span>Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    className="btn btn-primary w-100"
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GetProducts;