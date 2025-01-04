import React, { useState } from 'react';

function Staff() {
  const [activeTab, setActiveTab] = useState('stock'); // State to track active tab

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stock':
        return <ViewProductStock />;
      case 'transactions':
        return <PerformStockTransactions />;
      default:
        return <div>Select a tab to proceed</div>;
    }
  };

  return (
    <div style={styles.container}>
      <h1>Staff Dashboard</h1>
      <div style={styles.navbar}>
        <button
          style={activeTab === 'stock' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('stock')}
        >
          View Product Stock
        </button>
        <button
          style={activeTab === 'transactions' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('transactions')}
        >
          Perform Stock Transactions
        </button>
      </div>
      <div style={styles.content}>
        {renderTabContent()}
      </div>
    </div>
  );
}

const ViewProductStock = () => (
  <div>
    <h2>View Product Stock</h2>
    <p>Product stock details will be displayed here.</p>
    {/* Add stock viewing functionality, such as a table showing product stock levels */}
  </div>
);

const PerformStockTransactions = () => (
  <div>
    <h2>Perform Stock Transactions</h2>
    <p>Record stock transactions (e.g., adding/removing stock).</p>
    {/* Add stock transaction functionality, such as a form to record transactions */}
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

export default Staff;
