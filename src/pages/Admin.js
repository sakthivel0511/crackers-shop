import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const AdminProductManager = () => {
  const [product, setProduct] = useState({
    name: '',
    content: '',
    actualPrice: '',
    discountPrice: '',
    category: '',
    imageUrl: '',
  });
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, product);
        alert('✅ Product updated successfully!');
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/products', product);
        alert('✅ Product added successfully!');
      }
      setProduct({ name: '', content: '', actualPrice: '', discountPrice: '', category: '', imageUrl: '' });
      fetchProducts();
    } catch (err) {
      console.error('❌ Error saving product:', err);
    }
  };

  const handleEdit = (product) => {
    setProduct(product);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert('🗑️ Product deleted');
      fetchProducts();
    } catch (err) {
      console.error('❌ Error deleting product:', err);
    }
  };

  return (
    <div className="admin-container">
      <h2> Admin: Manage Products</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
        <input type="text" name="content" placeholder="Product Description" value={product.content} onChange={handleChange} required />
        <input type="number" name="actualPrice" placeholder="Actual Price" value={product.actualPrice} onChange={handleChange} required />
        <input type="number" name="discountPrice" placeholder="Discount Price" value={product.discountPrice} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} required />
        <input type="text" name="imageUrl" placeholder="Image URL" value={product.imageUrl} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h3> Existing Products</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Content</th>
            <th>Actual</th>
            <th>Discount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td><img src={p.imageUrl} alt={p.name} width="60" onError={(e) => e.target.style.display = 'none'} />
</td>
              <td>{p.name}</td>
              <td>{p.content}</td>
              <td>₹{p.actualPrice}</td>
              <td>₹{p.discountPrice}</td>
              <td>{p.category}</td>
              <td>
                <button onClick={() => handleEdit(p)}> <span role="img" aria-label="clipboard">✏️</span>Edit</button>
                <button onClick={() => handleDelete(p._id)}> <span role="img" aria-label="clipboard">🗑️</span> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductManager;
