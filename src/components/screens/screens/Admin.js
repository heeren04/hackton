import React, { useState } from 'react';
import './Admin.css';  // Importing the CSS file

function Admin() {
  const [activeSection, setActiveSection] = useState('users');
  const [activeAction, setActiveAction] = useState('add');
  const [alerts, setAlerts] = useState([
    'Low stock for Product A',
    'Order #123 is overdue',
  ]);
  const [showAlerts, setShowAlerts] = useState(false); // Show alerts when button is clicked

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UsersManagement action={activeAction} />;
      case 'products':
        return <ProductsManagement action={activeAction} />;
      case 'suppliers':
        return <SuppliersManagement action={activeAction} />;
      case 'stock':
        return <StockManagement action={activeAction} />;
      default:
        return <div>Select a section and action to manage</div>;
    }
  };

  const handleAlertClick = () => {
    setShowAlerts(!showAlerts);
  };

  return (
    <div className="admin-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="admin-title">Admin Dashboard</h1>
        </div>
        <div className="navbar-center">
          {['users', 'products', 'suppliers', 'stock'].map((section) => (
            <div
              key={section}
              className="navbar-item"
              onMouseEnter={() => setActiveSection(section)}
            >
              <span className="navbar-item-title">
                Manage {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
            </div>
            
            
          ))}
        </div>

        <div className="navbar-right">
          <div className="notification-bell" onClick={handleAlertClick}>
            <span className="bell-icon">🔔</span>
            <span className="notification-count">{alerts.length}</span>
          </div>
          <button className="logout-button" onClick={() => alert('Logged Out')}>
            Logout
          </button>
        </div>
      </nav>

      {/* Alerts Section */}
      {showAlerts && (
        <div className="alerts-container">
          <h3>Alerts & Notifications</h3>
          {alerts.length > 0 ? (
            <ul>
              {alerts.map((alert, index) => (
                <li key={index}>{alert}</li>
              ))}
            </ul>
          ) : (
            <p>No new alerts.</p>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="content-container">{renderContent()}</div>
    </div>
  );
}

/* Management Components */
const UsersManagement = ({ action }) => {
  const [formData, setFormData] = useState({
    role: '',
    userId: '',
    mail: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${action.charAt(0).toUpperCase() + action.slice(1)} User`);
  };

  return (
    <div className="form-container">
      <h2>Manage Users</h2>
      <p>
        <strong>Action:</strong> {action.charAt(0).toUpperCase() + action.slice(1)} User
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Role*</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>User ID*</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mail*</label>
          <input
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </div>
        {/* Action buttons */}
        <div className="action-buttons">
          <button type="submit" className="submit-button">
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </button>
          <button type="button" className="submit-button">Delete</button>
        </div>
      </form>
    </div>
  );
};

const ProductsManagement = ({ action }) => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    categoryName: '',
    modelNumber: '',
    serialNumber: '',
    stockLevel: '',
    reorderPoint: '',
    supplierName: '',
    supplierMail: '',
    supplierContact: '',
    orderDate: '',
    quantity: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${action.charAt(0).toUpperCase() + action.slice(1)} Product`);
  };

  return (
    <div className="form-container">
      <h2>Manage Products</h2>
      <p>
        <strong>Action:</strong> {action.charAt(0).toUpperCase() + action.slice(1)} Product
      </p>
      <form onSubmit={handleSubmit}>
        {/* Product Fields */}
        <div className="form-group">
          <label>Product Name*</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category Name*</label>
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Model Number*</label>
          <input
            type="text"
            name="modelNumber"
            value={formData.modelNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Serial Number*</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock Level*</label>
          <input
            type="number"
            name="stockLevel"
            value={formData.stockLevel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Reorder Point*</label>
          <input
            type="number"
            name="reorderPoint"
            value={formData.reorderPoint}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Supplier Name*</label>
          <input
            type="text"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Supplier Mail*</label>
          <input
            type="email"
            name="supplierMail"
            value={formData.supplierMail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Supplier Contact*</label>
          <input
            type="tel"
            name="supplierContact"
            value={formData.supplierContact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Order Date*</label>
          <input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity*</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        {/* Action buttons */}
        <div className="action-buttons">
          <button type="submit" className="submit-button">
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </button>
          <button type="button" className="submit-button">Delete</button>
        </div>
      </form>
    </div>
  );
};

const SuppliersManagement = ({ action }) => {
  const [formData, setFormData] = useState({
    supplierName: '',
    supplierMail: '',
    supplierContact: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${action.charAt(0).toUpperCase() + action.slice(1)} Supplier`);
  };

  return (
    <div className="form-container">
      <h2>Manage Suppliers</h2>
      <p>
        <strong>Action:</strong> {action.charAt(0).toUpperCase() + action.slice(1)} Supplier
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Supplier Name*</label>
          <input
            type="text"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Supplier Mail*</label>
          <input
            type="email"
            name="supplierMail"
            value={formData.supplierMail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Supplier Contact*</label>
          <input
            type="tel"
            name="supplierContact"
            value={formData.supplierContact}
            onChange={handleChange}
            required
          />
        </div>
        {/* Action buttons */}
        <div className="action-buttons">
          <button type="submit" className="submit-button">
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </button>
          <button type="button" className="submit-button">Delete</button>
        </div>
      </form>
    </div>
  );
};

const StockManagement = ({ action }) => {
  return (
    <div className="form-container">
      <h2>Manage Stock</h2>
      <p>
        <strong>Action:</strong> {action.charAt(0).toUpperCase() + action.slice(1)} Stock
      </p>
      <div className="action-buttons">
        <button className="submit-button">Add</button>
        <button className="submit-button">Edit</button>
        <button className="submit-button">Update</button>
        <button className="submit-button">Delete</button>
      </div>
    </div>
  );
};

export default Admin;
