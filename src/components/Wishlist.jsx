import React from 'react';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';

const WishlistSidebar = ({ isOpen, onClose, wishlist, toggleWishlist, toggleCart, setShowCartSidebar }) => {
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
        <h5 className="offcanvas-title">Wishlist</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {wishlist.length === 0 ? (
          <p className="text-center text-muted">Your wishlist is empty.</p>
        ) : (
          wishlist.map((item) => (
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
                </div>
                <div className="d-flex flex-column align-items-center">
                  <button
                    className="btn btn-sm mb-2"
                    onClick={() => toggleWishlist(item)}
                  >
                    {wishlist.some(w => w.id === item.id) ? (
                      <FaHeart className="text-danger" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      toggleCart(item);
                      setShowCartSidebar(true);
                    }}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistSidebar;