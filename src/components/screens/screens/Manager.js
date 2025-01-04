import React, { useState } from 'react';
import './ManagerDashboard.css';

const Manager = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [editItem, setEditItem] = useState(null); // Track the item being edited

  // Example functions for managing products, suppliers, and transactions
  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleEditProduct = (editedProduct) => {
    setProducts(products.map((product) => product.id === editedProduct.id ? editedProduct : product));
    setEditItem(null); // Close the edit form
  };

  const handleAddSupplier = (supplier) => {
    setSuppliers([...suppliers, supplier]);
  };

  const handleEditSupplier = (editedSupplier) => {
    setSuppliers(suppliers.map((supplier) => supplier.id === editedSupplier.id ? editedSupplier : supplier));
    setEditItem(null); // Close the edit form
  };

  const handleTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleEditTransaction = (editedTransaction) => {
    setTransactions(transactions.map((transaction) => transaction.id === editedTransaction.id ? editedTransaction : transaction));
    setEditItem(null); // Close the edit form
  };

  return (
    <div className="manager-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Manager Dashboard</h2>
        <ul>
          <li><a href="#products">Manage Products</a></li>
          <li><a href="#suppliers">Manage Suppliers</a></li>
          <li><a href="#transactions">Stock Transactions</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <section id="products">
          <h3>Manage Products</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td><button onClick={() => setEditItem({ type: 'product', data: product })}>Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form for adding or editing a product */}
          <div className="form-container">
            <h4>{editItem?.type === 'product' ? 'Edit Product' : 'Add New Product'}</h4>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newProduct = {
                id: editItem?.data.id || Math.random().toString(36).substring(7), // Use existing ID or generate new
                name: e.target.productName.value,
                category: e.target.productCategory.value,
                stock: e.target.productStock.value,
              };
              if (editItem) {
                handleEditProduct(newProduct);
              } else {
                handleAddProduct(newProduct);
              }
            }}>
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                defaultValue={editItem?.data?.name || ''}
                required
              />
              <input
                type="text"
                name="productCategory"
                placeholder="Category"
                defaultValue={editItem?.data?.category || ''}
                required
              />
              <input
                type="number"
                name="productStock"
                placeholder="Stock"
                defaultValue={editItem?.data?.stock || ''}
                required
              />
              <button type="submit">{editItem?.type === 'product' ? 'Save Changes' : 'Add Product'}</button>
            </form>
          </div>
        </section>

        <section id="suppliers">
          <h3>Manage Suppliers</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>
                    <td>{supplier.contact}</td>
                    <td><button onClick={() => setEditItem({ type: 'supplier', data: supplier })}>Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form for adding or editing a supplier */}
          <div className="form-container">
            <h4>{editItem?.type === 'supplier' ? 'Edit Supplier' : 'Add New Supplier'}</h4>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newSupplier = {
                id: editItem?.data.id || Math.random().toString(36).substring(7),
                name: e.target.supplierName.value,
                contact: e.target.supplierContact.value,
              };
              if (editItem) {
                handleEditSupplier(newSupplier);
              } else {
                handleAddSupplier(newSupplier);
              }
            }}>
              <input
                type="text"
                name="supplierName"
                placeholder="Supplier Name"
                defaultValue={editItem?.data?.name || ''}
                required
              />
              <input
                type="text"
                name="supplierContact"
                placeholder="Contact Info"
                defaultValue={editItem?.data?.contact || ''}
                required
              />
              <button type="submit">{editItem?.type === 'supplier' ? 'Save Changes' : 'Add Supplier'}</button>
            </form>
          </div>
        </section>

        <section id="transactions">
          <h3>Manage Stock Transactions</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.product}</td>
                    <td>{transaction.quantity}</td>
                    <td><button onClick={() => setEditItem({ type: 'transaction', data: transaction })}>Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form for adding or editing a transaction */}
          <div className="form-container">
            <h4>{editItem?.type === 'transaction' ? 'Edit Transaction' : 'Add Stock Transaction'}</h4>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newTransaction = {
                id: editItem?.data.id || Math.random().toString(36).substring(7),
                product: e.target.transactionProduct.value,
                quantity: e.target.transactionQuantity.value,
              };
              if (editItem) {
                handleEditTransaction(newTransaction);
              } else {
                handleTransaction(newTransaction);
              }
            }}>
              <input
                type="text"
                name="transactionProduct"
                placeholder="Product Name"
                defaultValue={editItem?.data?.product || ''}
                required
              />
              <input
                type="number"
                name="transactionQuantity"
                placeholder="Quantity"
                defaultValue={editItem?.data?.quantity || ''}
                required
              />
              <button type="submit">{editItem?.type === 'transaction' ? 'Save Changes' : 'Add Transaction'}</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Manager;
