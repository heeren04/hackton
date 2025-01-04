import React, { useState } from 'react';
import './AdminDashboard.css';

// Modal component for Add/Edit
import Modal from 'react-modal';
import Toast from './Toast'; // Toast Notification component

Modal.setAppElement('#root');

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [users, setUsers] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [toDeleteItem, setToDeleteItem] = useState(null);
  const [notification, setNotification] = useState('');
  const [notifications, setNotifications] = useState([]); // Notifications state
  const [showNotifications, setShowNotifications] = useState(false); // Show/Hide notifications modal

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
    setNotifications([...notifications, 'Product added successfully!']); // Add to notifications
    setShowProductModal(false);
  };

  const handleEditProduct = (productId, updatedProduct) => {
    setProducts(products.map(product => product.id === productId ? updatedProduct : product));
    setNotifications([...notifications, 'Product updated successfully!']);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    setNotifications([...notifications, 'Product deleted successfully!']);
    setShowConfirmDelete(false);
  };

  const handleAddSupplier = (supplier) => {
    setSuppliers([...suppliers, supplier]);
    setNotifications([...notifications, 'Supplier added successfully!']);
    setShowSupplierModal(false);
  };

  const handleEditSupplier = (supplierId, updatedSupplier) => {
    setSuppliers(suppliers.map(supplier => supplier.id === supplierId ? updatedSupplier : supplier));
    setNotifications([...notifications, 'Supplier updated successfully!']);
  };

  const handleDeleteSupplier = (supplierId) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
    setNotifications([...notifications, 'Supplier deleted successfully!']);
    setShowConfirmDelete(false);
  };

  const handleAddUser = (user) => {
    setUsers([...users, user]);
    setNotifications([...notifications, 'User added successfully!']);
    setShowUserModal(false);
  };

  const handleEditUser = (userId, updatedUser) => {
    setUsers(users.map(user => user.id === userId ? updatedUser : user));
    setNotifications([...notifications, 'User updated successfully!']);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setNotifications([...notifications, 'User deleted successfully!']);
    setShowConfirmDelete(false);
  };

  const openConfirmDelete = (item, type) => {
    setToDeleteItem({ item, type });
    setShowConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleNotificationButtonClick = () => {
    setShowNotifications(true); // Open the notifications modal
  };

  const closeNotificationsModal = () => {
    setShowNotifications(false);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><a href="#products">Manage Products</a></li>
          <li><a href="#suppliers">Manage Suppliers</a></li>
          <li><a href="#users">Manage Users</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Notification Button */}
        <button className="notification-btn" onClick={handleNotificationButtonClick}>
          Notifications ({notifications.length})
        </button>

        {/* Notifications Modal */}
        {showNotifications && (
          <Modal isOpen={showNotifications} onRequestClose={closeNotificationsModal}>
            <h2>Notifications</h2>
            <ul>
              {notifications.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
            <button onClick={closeNotificationsModal}>Close</button>
          </Modal>
        )}

        {/* Manage Products */}
        <section id="products">
          <h3>Manage Products</h3>
          <button className="add-btn" onClick={() => setShowProductModal(true)}>Add New Product</button>
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
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button onClick={() => handleEditProduct(product.id, { ...product, name: 'Updated Name' })}>Edit</button>
                      <button onClick={() => openConfirmDelete(product, 'product')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Manage Suppliers */}
        <section id="suppliers">
          <h3>Manage Suppliers</h3>
          <button className="add-btn" onClick={() => setShowSupplierModal(true)}>Add New Supplier</button>
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
                {suppliers.map((supplier, index) => (
                  <tr key={index}>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>
                    <td>{supplier.contact}</td>
                    <td>
                      <button onClick={() => handleEditSupplier(supplier.id, { ...supplier, name: 'Updated Supplier Name' })}>Edit</button>
                      <button onClick={() => openConfirmDelete(supplier, 'supplier')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Manage Users */}
        <section id="users">
          <h3>Manage Users</h3>
          <button className="add-btn" onClick={() => setShowUserModal(true)}>Add New User</button>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => handleEditUser(user.id, { ...user, name: 'Updated User Name' })}>Edit</button>
                      <button onClick={() => openConfirmDelete(user, 'user')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Modal for Add Product */}
      <Modal isOpen={showProductModal} onRequestClose={() => setShowProductModal(false)}>
        <h2>Add Product</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const newProduct = {
            id: products.length + 1,
            name: e.target.productName.value,
            category: e.target.productCategory.value,
            stock: e.target.productStock.value,
          };
          handleAddProduct(newProduct);
        }}>
          <input type="text" name="productName" placeholder="Product Name" required />
          <input type="text" name="productCategory" placeholder="Category" required />
          <input type="number" name="productStock" placeholder="Stock" required />
          <button type="submit">Add Product</button>
        </form>
      </Modal>

      {/* Modal for Add Supplier */}
      <Modal isOpen={showSupplierModal} onRequestClose={() => setShowSupplierModal(false)}>
        <h2>Add Supplier</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const newSupplier = {
            id: suppliers.length + 1,
            name: e.target.supplierName.value,
            contact: e.target.supplierContact.value,
          };
          handleAddSupplier(newSupplier);
        }}>
          <input type="text" name="supplierName" placeholder="Supplier Name" required />
          <input type="text" name="supplierContact" placeholder="Contact Info" required />
          <button type="submit">Add Supplier</button>
        </form>
      </Modal>

      {/* Modal for Add User */}
      <Modal isOpen={showUserModal} onRequestClose={() => setShowUserModal(false)}>
        <h2>Add User</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const newUser = {
            id: users.length + 1,
            name: e.target.userName.value,
            email: e.target.userEmail.value,
            role: e.target.userRole.value,
          };
          handleAddUser(newUser);
        }}>
          <input type="text" name="userName" placeholder="User Name" required />
          <input type="email" name="userEmail" placeholder="Email" required />
          <select name="userRole" required>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>
          <button type="submit">Add User</button>
        </form>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal isOpen={showConfirmDelete} onRequestClose={closeConfirmDelete}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this {toDeleteItem?.type}?</p>
        <button onClick={() => {
          if (toDeleteItem.type === 'product') {
            handleDeleteProduct(toDeleteItem.item.id);
          } else if (toDeleteItem.type === 'supplier') {
            handleDeleteSupplier(toDeleteItem.item.id);
          } else if (toDeleteItem.type === 'user') {
            handleDeleteUser(toDeleteItem.item.id);
          }
        }}>
          Yes, Delete
        </button>
        <button onClick={closeConfirmDelete}>Cancel</button>
      </Modal>

      {/* Toast Notification */}
      {notification && <Toast message={notification} />}
    </div>
  );
};

export default Admin;
