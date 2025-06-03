import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartSidebar = ({ isOpen, onClose, cart, toggleCart, updateQuantity, cartTotal, handleCheckout }) => {
  return (
    <div
      className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}
      style={{
        visibility: isOpen ? 'visible' : 'hidden',
        background: 'rgba(10, 14, 33, 0.95)',
        color: '#e0e8ff',
        width: '350px',
        borderLeft: '1px solid rgba(90, 150, 255, 0.2)',
      }}
      tabIndex="-1"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Cart</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {cart.length === 0 ? (
          <p className="text-center text-muted">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="card mb-3"
                style={{
                  background: 'rgba(20, 25, 50, 0.5)',
                  border: '1px solid rgba(90, 150, 255, 0.3)',
                }}
              >
                <div className="card-body d-flex align-items-center">
                  <img
                    src={`https://neista.pythonanywhere.com/static/images/${item.product_photo}`}
                    alt={item.product_name}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '10px' }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.product_name}</h6>
                    <p className="mb-0 text-success">KES {item.product_cost}</p>
                    <div className="d-flex align-items-center mt-1">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary ms-2"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm"
                    onClick={() => toggleCart(item)}
                  >
                    <FaShoppingCart className="text-success" />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-3">
              <h6>Total: KES {cartTotal.toFixed(2)}</h6>
              <button
                className="btn btn-success w-100"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;