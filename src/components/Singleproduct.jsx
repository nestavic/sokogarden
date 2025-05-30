import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FaMobileAlt, 
  FaMoneyBillWave, 
  FaSpinner, 
  FaCheckCircle, 
  FaTimesCircle,
  FaLock,
  FaArrowRight
} from 'react-icons/fa';
import './Singleproduct.css';
import Footer from "./Footer";

const SingleProduct = () => {
    const { product } = useLocation().state || {};
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [errors, setErrors] = useState({});
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const img_url = "https://neista.pythonanywhere.com/static/images/";

    useEffect(() => {
        if (!product) {
            navigate('/products');
        }
    }, [product, navigate]);

    const validateForm = () => {
        const newErrors = {};
        if (!phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^254\d{9}$/.test(phone)) {
            newErrors.phone = 'Phone must start with 254 followed by 9 digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitForm = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        setPaymentStatus(null);
        setMessage('Initiating M-Pesa payment...');

        try {
            const data = new FormData();
            data.append("amount", product.product_cost);
            data.append("phone", phone);

            const response = await axios.post(
                "https://neista.pythonanywhere.com/api/mpesa_payment", 
                data
            );
            
            setMessage(response.data.message || 'Payment initiated successfully');
            setPaymentStatus('success');
            triggerConfetti();
            setShowPaymentModal(true);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Payment failed. Please try again.');
            setPaymentStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const triggerConfetti = () => {
        // Implement confetti here with canvas-confetti
        console.log("Payment successful! Confetti time!");
    };

    return (
        <div className="single-product-container">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="product-content"
            >
                <div className="product-hero">
                    <h1 className="product-title text-light">{product?.product_name}</h1>
                    <p className="product-tagline text-light">Premium Quality • Exclusive Offer</p>
                </div>

                <div className="product-grid">
                    <div className="product-image-container">
                        <motion.img 
                            src={img_url + product?.product_photo} 
                            alt={product?.product_name}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        />
                        <div className="image-overlay"></div>
                    </div>

                    <div className="product-details">
                        <div className="product-description">
                            <h3 className='text-light'>Product Details</h3>
                            <p>{product?.product_desc}</p>
                        </div>

                        <div className="payment-section">
                            <h3 className='text-light'>Complete Your Purchase</h3>
                            
                            <form onSubmit={submitForm} className="payment-form">
                                <div className="form-group">
                                    <label className="form-label d-flex align-items-center">
                                        <FaMobileAlt className="me-2  text-light" />
                                        <h5 className='text-light'>M-PESA Phone Number </h5>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="254XXXXXXXXX"
                                        className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={phone}
                                    />
                                    {errors.phone && (
                                        <div className="invalid-feedback">{errors.phone}</div>
                                    )}
                                    <small className="text-muted mt-1 d-block">
                                        <h6 className='text-light'>Enter phone number in format 254 followed by 9 digits</h6>
                                    </small>
                                </div>

                                <motion.button
                                    className={`pay-button ${loading ? "pulse" : ""}`}
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {loading ? (
                                        <>
                                            <FaSpinner className="fa-spin me-2" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Pay KES {product?.product_cost} Now <FaArrowRight className="ms-3" />
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            {message && (
                                <motion.div 
                                    className={`alert-message ${
                                        paymentStatus === 'success' ? 'success' :
                                        paymentStatus === 'error' ? 'error' :
                                        'info'
                                    }`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="d-flex align-items-center">
                                        {paymentStatus === 'success' && <FaCheckCircle className="me-2" />}
                                        {paymentStatus === 'error' && <FaTimesCircle className="me-2" />}
                                        {message}
                                    </div>
                                </motion.div>
                            )}

                            <div className="secure-payment">
                                <div className="secure-badge text-light">
                                    <FaLock className="me-2" />
                                    <span className='text-light'>100% Secure Payment</span>
                                </div>
                                <div className="payment-methods">
                                    <div className="mpesa-logo"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* M-Pesa Payment Modal */}
            {showPaymentModal && (
                <motion.div 
                    className="mpesa-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowPaymentModal(false)}
                >
                    <motion.div 
                        className="mpesa-modal-content"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mpesa-modal-header">
                            <FaMoneyBillWave className="text-success me-2" />
                            <h3>Complete Payment on Your Phone</h3>
                            <button 
                                className="mpesa-modal-close"
                                onClick={() => setShowPaymentModal(false)}
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="mpesa-modal-body">
                            <div className="mpesa-prompt-animation">
                                <div className="phone-mockup">
                                    <div className="phone-screen">
                                        <div className="mpesa-prompt">
                                            <div className="mpesa-header">
                                                <div className="mpesa-logo-small"></div>
                                                <span>M-PESA</span>
                                            </div>
                                            <div className="mpesa-content">
                                                <p>Payment Request</p>
                                                <h4>KES {product?.product_cost}</h4>
                                                <p>To: {product?.product_name}</p>
                                                <div className="mpesa-buttons">
                                                    <button className="mpesa-cancel">Cancel</button>
                                                    <button className="mpesa-pay">Pay</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mpesa-instructions">
                                <p>1. Check your phone for M-Pesa push notification</p>
                                <p>2. Enter your M-Pesa PIN when prompted</p>
                                <p>3. Wait for confirmation message</p>
                            </div>
                        </div>
                        
                        <div className="mpesa-modal-footer">
                            <button 
                                className="btn btn-success"
                                onClick={() => setShowPaymentModal(false)}
                            >
                                I've Completed Payment
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <Footer />
        </div>
    );
};

export default SingleProduct;
