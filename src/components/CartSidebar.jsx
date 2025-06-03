import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';

const CartSidebar = ({ isOpen, onClose, cart, toggleCart, updateQuantity, cartTotal, handleCheckout }) => {
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
          <h4 className="mb-0">Your Cart</h4>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={onClose}
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
  );
};

export default CartSidebar;