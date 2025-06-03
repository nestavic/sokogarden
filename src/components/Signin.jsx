import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('email', email);
      data.append('password', password);

      const response = await axios.post("https://neista.pythonanywhere.com/api/signin", data);

      if (response.data.user) {
        // Normalize user data from API response
        const userData = Array.isArray(response.data.user)
          ? {
              id: response.data.user[0],
              username: response.data.user[1],
              email: response.data.user[3],
              phone: response.data.user[4],
            }
          : response.data.user;

        setSuccess('Login successful! Redirecting to your dashboard...');
        setUser(userData); // Update user state via context
        
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        setTimeout(() => {
          navigate("/Getproducts");
        }, 1500);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Connection failed. Check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container" style={{
      background: 'radial-gradient(circle at center, #1a1a2e 0%, #16213e 70%, #0f3460 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      fontFamily: '"Rajdhani", "Segoe UI", sans-serif'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="game-card" style={{
              background: 'rgba(10, 14, 33, 0.85)',
              border: '1px solid rgba(90, 150, 255, 0.2)',
              borderRadius: '10px',
              boxShadow: '0 0 25px rgba(90, 150, 255, 0.15), 0 0 10px rgba(90, 150, 255, 0.1) inset',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(90, 150, 255, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none'
              }}></div>

              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2" style={{
                    color: '#5a96ff',
                    fontSize: '2rem',
                    textShadow: '0 0 10px rgba(90, 150, 255, 0.5)',
                    letterSpacing: '1px'
                  }}>
                    GAME<span style={{ color: '#fff' }}>HUB</span>
                  </h2>
                  <p className="text-muted" style={{ color: '#a0a8c0' }}>Access your gaming universe</p>
                </div>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" style={{
                    background: 'rgba(255, 60, 60, 0.15)',
                    border: '1px solid rgba(255, 60, 60, 0.3)',
                    color: '#ff9e9e'
                  }}>
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setError('')}
                      style={{ filter: 'brightness(0.8)' }}
                    ></button>
                  </div>
                )}

                {success && (
                  <div className="alert alert-success" style={{
                    background: 'rgba(60, 255, 100, 0.15)',
                    border: '1px solid rgba(60, 255, 100, 0.3)',
                    color: '#a0ffc0'
                  }}>
                    <i className="fas fa-check-circle me-2"></i>
                    {success}
                  </div>
                )}

                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ color: '#c0c8e0' }}>Email</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{
                        background: 'rgba(90, 150, 255, 0.1)',
                        border: '1px solid rgba(90, 150, 255, 0.3)',
                        borderRight: 'none',
                        color: '#5a96ff'
                      }}>
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="gamer@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          background: 'rgba(20, 25, 50, 0.5)',
                          border: '1px solid rgba(90, 150, 255, 0.3)',
                          color: '#e0e8ff',
                          borderRadius: '0 5px 5px 0'
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{ color: '#c0c8e0' }}>Password</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{
                        background: 'rgba(90, 150, 255, 0.1)',
                        border: '1px solid rgba(90, 150, 255, 0.3)',
                        borderRight: 'none',
                        color: '#5a96ff'
                      }}>
                        <i className="fas fa-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                          background: 'rgba(20, 25, 50, 0.5)',
                          border: '1px solid rgba(90, 150, 255, 0.3)',
                          color: '#e0e8ff',
                          borderRadius: '0 5px 5px 0'
                        }}
                      />
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          style={{
                            backgroundColor: 'rgba(20, 25, 50, 0.5)',
                            borderColor: '#5a96ff'
                          }}
                        />
                        <label className="form-check-label" htmlFor="rememberMe" style={{ color: '#a0a8c0' }}>
                          Remember me
                        </label>
                      </div>
                      <Link
                        to="/Forgot"
                        className="text-decoration-none small"
                        style={{ color: '#5a96ff' }}
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 py-2 mb-3 gamehub-btn"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(to right, #5a96ff, #3a4bff)',
                      color: '#fff',
                      borderRadius: '5px',
                      border: 'none',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      fontSize: '0.9rem',
                      boxShadow: '0 0 15px rgba(90, 150, 255, 0.4)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        AUTHENTICATING...
                      </>
                    ) : (
                      <>
                        <span style={{ position: 'relative', zIndex: 2 }}>SIGN IN</span>
                        <span className="btn-glow" style={{
                          position: 'absolute',
                          top: '-50%',
                          left: '-50%',
                          width: '200%',
                          height: '200%',
                          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                          opacity: '0',
                          transition: 'opacity 0.3s ease'
                        }}></span>
                      </>
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p style={{ color: '#a0a8c0' }}>
                      New to GameHub?{' '}
                      <Link
                        to="/Signup"
                        className="text-decoration-none fw-bold"
                        style={{ color: '#5a96ff' }}
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>

                  <div className="text-center mt-4">
                    <p className="small" style={{ color: '#707890' }}>Or sign in with</p>
                    <div className="d-flex justify-content-center gap-3">
                      <button type="button" className="btn btn-outline-secondary rounded-circle p-2" style={{
                        borderColor: 'rgba(90, 150, 255, 0.3)',
                        color: '#5a96ff',
                        width: '40px',
                        height: '40px'
                      }}>
                        <i className="fab fa-google"></i>
                      </button>
                      <button type="button" className="btn btn-outline-secondary rounded-circle p-2" style={{
                        borderColor: 'rgba(90, 150, 255, 0.3)',
                        color: '#5a96ff',
                        width: '40px',
                        height: '40px'
                      }}>
                        <i className="fab fa-steam"></i>
                      </button>
                      <button type="button" className="btn btn-outline-secondary rounded-circle p-2" style={{
                        borderColor: 'rgba(90, 150, 255, 0.3)',
                        color: '#5a96ff',
                        width: '40px',
                        height: '40px'
                      }}>
                        <i className="fab fa-discord"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;