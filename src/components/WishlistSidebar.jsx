import React from 'react';
import { motion } from 'framer-motion';
import { FaRegHeart, FaTimes, FaShoppingCart } from 'react-icons/fa';

const WishlistSidebar = ({ isOpen, onClose, wishlist, toggleWishlist, toggleCart, setShowCartSidebar }) => {
  const IMG_URL = "https://neista.pythonanywhere.com/static/images/";

  return (
    <motion.div
      className="position-fixed end-0 top-0 h-100 bg-white shadow-lg z-2"
      style={{ width: "350px", maxWidth: "90vw" }}
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="p-3 h-100 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Your Wishlist</h4>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={onClose}
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
                              onClose();
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
  );
};

export default WishlistSidebar;