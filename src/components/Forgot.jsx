// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FiMail, FiArrowRight, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
// import './Forgot.css';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess(false);

//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post('https://neista.pythonanywhere.com/Signup', { email });
      
//       if (response.data.success) {
//         setSuccess(true);
//       } else {
//         setError(response.data.message || 'Failed to send reset link. Please try again.');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div 
//       className="forgot-password-container"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="forgot-password-card">
//         <div className="forgot-password-header">
//           <div className="logo">YourLogo</div>
//           <h2>Forgot Password?</h2>
//           <p className="subtitle">Enter your email to receive a password reset link</p>
//         </div>

//         <div className="form-container">
//           {error && (
//             <motion.div
//               className="error-message"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//             >
//               <FiAlertCircle />
//               <span>{error}</span>
//             </motion.div>
//           )}

//           {success ? (
//             <motion.div
//               className="success-message"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//             >
//               <FiCheckCircle />
//               <div>
//                 <h4>Check your email!</h4>
//                 <p>We've sent a password reset link to {email}</p>
//               </div>
//             </motion.div>
//           ) : (
//             <form onSubmit={handleSubmit} className="forgot-password-form">
//               <div className="input-group">
//                 <label className="input-label">Email Address</label>
//                 <div className="input-wrapper">
//                   <FiMail />
//                   <input
//                     type="email"
//                     className="form-input"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="your@email.com"
//                     required
//                   />
//                 </div>
//               </div>

//               <motion.button
//                 type="submit"
//                 className="submit-button"
//                 disabled={loading}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 {loading ? (
//                   <div className="loading-spinner"></div>
//                 ) : (
//                   <>
//                     Send Reset Link <FiArrowRight />
//                   </>
//                 )}
//               </motion.button>
//             </form>
//           )}
//         </div>

//         <div className="footer">
//           Remember your password? <a href="/Signin" className="footer-link">Sign in</a>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ForgotPassword;