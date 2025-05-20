import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UploadProducts.css';

const UploadProducts = () => {
  const [productData, setProductData] = useState({
    product_name: '',
    product_description: '',
    product_cost: '',
    product_photo: null,
    rating: 0,
    hoverRating: 0
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData(prev => ({
        ...prev,
        product_photo: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRating = (rating) => {
    setProductData(prev => ({
      ...prev,
      rating
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('product_name', productData.product_name);
      data.append('product_description', productData.product_description);
      data.append('product_cost', productData.product_cost);
      data.append('rating', productData.rating);
      if (productData.product_photo) {
        data.append('product_photo', productData.product_photo);
      }

      const response = await axios.post('https://neista.pythonanywhere.com/api/add_product', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess(response.data.Success || 'Product uploaded successfully!');
      
      // Reset form
      setProductData({
        product_name: '',
        product_description: '',
        product_cost: '',
        product_photo: null,
        rating: 0,
        hoverRating: 0
      });
      setPreview('');
      
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Error uploading product. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">
          <span className="upload-icon">📤</span> Upload New Product
        </h2>
        
        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">✓</span>
            {success} 
            <span className="redirect-text">Redirecting to products...</span>
          </div>
        )}
        {error && (
          <div className="alert alert-danger">
            <span className="alert-icon">⚠️</span>
            {error}
          </div>
        )}
        
        <form onSubmit={submit} className="upload-form">
          <div className="form-group">
            <label htmlFor="product_name">
              <span className="label-icon">📛</span> Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              placeholder="Enter product name"
              value={productData.product_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="product_description">
              <span className="label-icon">📝</span> Description
            </label>
            <textarea
              id="product_description"
              name="product_description"
              placeholder="Enter detailed product description"
              value={productData.product_description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="product_cost">
                <span className="label-icon">💰</span> Price ($)
              </label>
              <input
                type="number"
                id="product_cost"
                name="product_cost"
                placeholder="0.00"
                value={productData.product_cost}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group half-width">
              <label>
                <span className="label-icon">⭐</span> Rating
              </label>
              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={index <= (productData.hoverRating || productData.rating) ? "star on" : "star off"}
                      onClick={() => handleRating(index)}
                      onMouseEnter={() => setProductData(prev => ({ ...prev, hoverRating: index }))}
                      onMouseLeave={() => setProductData(prev => ({ ...prev, hoverRating: 0 }))}
                    >
                      <span className="star-icon">★</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="product_photo">
              <span className="label-icon">🖼️</span> Product Image
            </label>
            <div className="file-upload-wrapper">
              <label className="file-upload-label">
                {productData.product_photo ? (
                  <>
                    <span className="file-icon">✓</span> {productData.product_photo.name}
                  </>
                ) : (
                  <>
                    <span className="file-icon">📁</span> Choose an image...
                  </>
                )}
                <input
                  type="file"
                  id="product_photo"
                  name="product_photo"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                  className="file-upload-input"
                />
              </label>
            </div>
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" className="preview-image" />
                <button 
                  type="button" 
                  className="remove-image-btn"
                  onClick={() => {
                    setPreview('');
                    setProductData(prev => ({ ...prev, product_photo: null }));
                  }}
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Uploading...
              </>
            ) : (
              <>
                <span className="upload-icon">🚀</span> Upload Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProducts;