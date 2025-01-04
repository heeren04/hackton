import React, { useState } from 'react';

function SupplierManagement() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    orderHistory: '',
    currentOrderStatus: '',
  });
  const [editingSupplierIndex, setEditingSupplierIndex] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add or update supplier
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.orderHistory || !form.currentOrderStatus) {
      alert('Please fill in all fields.');
      return;
    }

    if (editingSupplierIndex !== null) {
      // Update existing supplier
      const updatedSuppliers = [...suppliers];
      updatedSuppliers[editingSupplierIndex] = form;
      setSuppliers(updatedSuppliers);
    } else {
      // Add new supplier
      setSuppliers([...suppliers, form]);
    }

    // Clear the form and reset state
    setForm({
      name: '',
      contact: '',
      orderHistory: '',
      currentOrderStatus: '',
    });
    setEditingSupplierIndex(null);
  };

  // Edit supplier
  const handleEdit = (index) => {
    setForm(suppliers[index]);
    setEditingSupplierIndex(index);
  };

  // Delete supplier
  const handleDelete = (index) => {
    const updatedSuppliers = suppliers.filter((_, i) => i !== index);
    setSuppliers(updatedSuppliers);
  };

  return (
    <div style={styles.container}>
      <h1>Supplier Management</h1>

      {/* Form for adding/editing suppliers */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>{editingSupplierIndex !== null ? 'Edit Supplier' : 'Add Supplier'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Supplier Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Information"
          value={form.contact}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <textarea
          name="orderHistory"
          placeholder="Order History"
          value={form.orderHistory}
          onChange={handleChange}
          style={styles.textarea}
          required
        />
        <textarea
          name="currentOrderStatus"
          placeholder="Current Order Status"
          value={form.currentOrderStatus}
          onChange={handleChange}
          style={styles.textarea}
          required
        />
        <button type="submit" style={styles.button}>
          {editingSupplierIndex !== null ? 'Update Supplier' : 'Add Supplier'}
        </button>
      </form>

      {/* Supplier list */}
      <div style={styles.list}>
        <h2>Supplier List</h2>
        {suppliers.map((supplier, index) => (
          <div key={index} style={styles.supplier}>
            <p><strong>Name:</strong> {supplier.name}</p>
            <p><strong>Contact:</strong> {supplier.contact}</p>
            <p><strong>Order History:</strong> {supplier.orderHistory}</p>
            <p><strong>Current Order Status:</strong> {supplier.currentOrderStatus}</p>
            <div style={styles.actions}>
              <button onClick={() => handleEdit(index)} style={styles.button}>Edit</button>
              <button onClick={() => handleDelete(index)} style={styles.button}>Delete</button>
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
  textarea: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    height: '100px',
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
  list: {
    marginTop: '20px',
  },
  supplier: {
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

export default SupplierManagement;
