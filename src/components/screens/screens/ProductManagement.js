import React, { useState } from 'react';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const categories = ['Electronics', 'Groceries', 'Clothing'];

  const [searchCategory, setSearchCategory] = useState('');
  const [form, setForm] = useState({ name: '', category: '', stock: 0, reorderPoint: 0 });
  const [editingProductIndex, setEditingProductIndex] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add or update product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || form.stock < 0 || form.reorderPoint < 0) {
      alert('Please fill in all fields correctly.');
      return;
    }

    if (editingProductIndex !== null) {
      // Update existing product
      const updatedProducts = [...products];
      updatedProducts[editingProductIndex] = form;
      setProducts(updatedProducts);
    } else {
      // Add new product
      setProducts([...products, form]);
    }

    setForm({ name: '', category: '', stock: 0, reorderPoint: 0 });
    setEditingProductIndex(null);
  };

  // Edit product
  const handleEdit = (index) => {
    setForm(products[index]);
    setEditingProductIndex(index);
  };

  // Delete product
  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Record stock in/out
  const handleStockTransaction = (index, type) => {
    const amount = parseInt(prompt(`Enter amount to ${type}:`), 10);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const updatedProducts = [...products];
    if (type === 'add') {
      updatedProducts[index].stock += amount;
    } else if (type === 'remove') {
      updatedProducts[index].stock = Math.max(0, updatedProducts[index].stock - amount);
    }
    setProducts(updatedProducts);
  };

  return (
    <div style={styles.container}>
      <h1>Product Management</h1>

      {/* Form for adding/editing products */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>{editingProductIndex !== null ? 'Edit Product' : 'Add Product'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="" disabled>Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="number"
          name="stock"
          placeholder="Stock Level"
          value={form.stock}
          onChange={handleChange}
          style={styles.input}
          min="0"
          required
        />
        <input
          type="number"
          name="reorderPoint"
          placeholder="Reorder Point"
          value={form.reorderPoint}
          onChange={handleChange}
          style={styles.input}
          min="0"
          required
        />
        <button type="submit" style={styles.button}>
          {editingProductIndex !== null ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Searchable product categories */}
      <div style={styles.search}>
        <h3>Search by Category:</h3>
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          style={styles.input}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Product list */}
      <div style={styles.list}>
        <h2>Product List</h2>
        {products
          .filter(product => !searchCategory || product.category === searchCategory)
          .map((product, index) => (
            <div key={index} style={styles.product}>
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Reorder Point:</strong> {product.reorderPoint}</p>
              <div style={styles.actions}>
                <button onClick={() => handleEdit(index)} style={styles.button}>Edit</button>
                <button onClick={() => handleDelete(index)} style={styles.button}>Delete</button>
                <button onClick={() => handleStockTransaction(index, 'add')} style={styles.button}>Add Stock</button>
                <button onClick={() => handleStockTransaction(index, 'remove')} style={styles.button}>Remove Stock</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    margin: '5px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
  },
  search: {
    marginBottom: '20px',
  },
  list: {
    marginTop: '20px',
  },
  product: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
  },
};

export default ProductManagement;
