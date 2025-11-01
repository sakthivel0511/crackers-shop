// src/pages/Products.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  const handleQuantityChange = (id, quantity) => {
    setCart((prev) => ({ ...prev, [id]: Number(quantity) }));
  };

  const calculateTotal = (price, quantity) => price * quantity;

  const netTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find((p) => p._id === id);
    return sum + (product ? product.discountPrice * qty : 0);
  }, 0);

  const actualTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find((p) => p._id === id);
    return sum + (product ? product.actualPrice * qty : 0);
  }, 0);

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const selectedItems = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const product = products.find((p) => p._id === id);
      return { ...product, quantity: qty };
    });

  const handleFinalConfirm = () => {
    sessionStorage.setItem('orderSummary', JSON.stringify({
      items: selectedItems,
      netTotal,
      actualTotal
    }));
    navigate('/order-form');
  };

  return (
    <div className="product-page">
      <div className="header">
        <h1>Crackers Products</h1>
        <div className="totals">
          <span>Net Total: ₹{netTotal}</span>
          <span>You Save: ₹{actualTotal - netTotal}</span>
          <span>Overall Total: ₹{actualTotal}</span>
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Content</th>
            <th>Actual Price</th>
            <th>Discount Price</th>
            <th>Fill Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedProducts).map(([category, items]) => (
            <React.Fragment key={category}>
              <tr className="category-header">
                <td colSpan="7">{category}</td>
              </tr>
              {items.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-img"
                      onClick={() => setSelectedProduct(product)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.content}</td>
                  <td><s>₹{product.actualPrice}</s></td>
                  <td>₹{product.discountPrice}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      placeholder="Qty"
                      onChange={(e) =>
                        handleQuantityChange(product._id, e.target.value)
                      }
                    />
                  </td>
                  <td>₹{calculateTotal(product.discountPrice, cart[product._id] || 0)}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button className="confirm-order-btn" onClick={() => setShowOrderSummary(true)}>
          Confirm Order
        </button>
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setSelectedProduct(null)}>&times;</span>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-large-img" />
            <div className="modal-details">
              <h2>{selectedProduct.name}</h2>
              <p><strong>Price:</strong> ₹{selectedProduct.discountPrice}</p>
            </div>
          </div>
        </div>
      )}

      {showOrderSummary && (
        <div className="modal-overlay" onClick={() => setShowOrderSummary(false)}>
          <div className="modal-box order-summary" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setShowOrderSummary(false)}>&times;</span>
            <h2>Order Summary</h2>
            <table className="product-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map(item => (
                  <tr key={item._id}>
                    <td><img src={item.image} alt={item.name} className="product-img" /></td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.discountPrice}</td>
                    <td>₹{item.quantity * item.discountPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="totals" style={{ marginTop: '20px' }}>
              <span>Net Total: ₹{netTotal}</span>
              <span>You Save: ₹{actualTotal - netTotal}</span>
              <span>Overall Total: ₹{actualTotal}</span>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button className="confirm-order-btn" onClick={handleFinalConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
