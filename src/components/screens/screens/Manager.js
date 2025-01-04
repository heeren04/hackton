import React, { useState } from 'react';

function Manager() {
  const [activeTab, setActiveTab] = useState('products'); // State to track active tab

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsManagement />;
      case 'suppliers':
        return <SuppliersManagement />;
      case 'transactions':
        return <StockTransactions />;
      default:
        return <div>Select a tab to manage</div>;
    }
  };

  return (
    <div style={styles.container}>
      <h1>Manager Dashboard</h1>
      <div style={styles.navbar}>
        <button
          style={activeTab === 'products' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('products')}
        >
          View/Edit Products
        </button>
        <button
          style={activeTab === 'suppliers' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('suppliers')}
        >
          View/Edit Suppliers
        </button>
        <button
          style={activeTab === 'transactions' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('transactions')}
        >
          Manage Stock Transactions
        </button>
      </div>
      <div style={styles.content}>
        {renderTabContent()}
      </div>
    </div>
  );
}

const ProductsManagement = () => (
  <div>
    <h2>View/Edit Products</h2>
    <p>List of products will be displayed here.</p>
    <p>You can add, update, or delete products.</p>
    {/* Add product-related functionalities (CRUD) here */}
  </div>
);

const SuppliersManagement = () => (
  <div>
    <h2>View/Edit Suppliers</h2>
    <p>List of suppliers will be displayed here.</p>
    <p>You can update supplier details.</p>
    {/* Add supplier-related functionalities (CRUD) here */}
  </div>
);

const StockTransactions = () => (
  <div>
    <h2>Manage Stock Transactions</h2>
    <p>Stock transactions will be displayed here.</p>
    <p>You can add incoming/outgoing stock records.</p>
    {/* Add stock transaction-related functionalities here */}
  </div>
);

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  activeTab: {
    padding: '10px 20px',
    border: '1px solid #007BFF',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  content: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
};

export default Manager;
