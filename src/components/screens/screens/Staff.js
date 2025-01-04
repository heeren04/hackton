import React, { useState } from "react";
import "./StaffDashboard.css";
import { FaPlus, FaMinus, FaSearch } from "react-icons/fa"; // Import icons

const Staff = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", category: "Router", stock: 5 },
    { id: 2, name: "Product B", category: "Switch", stock: 0 },
    { id: 3, name: "Product C", category: "Modem", stock: 15 },
    { id: 4, name: "Product D", category: "Multiplexer", stock: 2 },
    { id: 4, name: "Product E", category: "Splitter", stock: 7 },
    { id: 4, name: "Product F", category: "Card", stock: 19 }
  ]);

  const [transaction, setTransaction] = useState({
    productId: "",
    transactionType: "add",
    quantity: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Handle search filter
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle stock transaction
  const handleTransaction = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((product) => {
      if (product.id === transaction.productId) {
        const newStock =
          transaction.transactionType === "add"
            ? product.stock + transaction.quantity
            : product.stock - transaction.quantity;

        if (newStock < 0) {
          alert("Stock can't go below zero!");
          return product;
        }

        return { ...product, stock: newStock };
      }
      return product;
    });

    setProducts(updatedProducts);
    setTransaction({ productId: "", transactionType: "add", quantity: 0 });
    setSearchQuery(""); // Reset search query after transaction
    setFilteredProducts(updatedProducts); // Update filtered products
  };

  return (
    <div className="staff-dashboard">
      <h2>Staff Dashboard</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      {/* Product Stock View */}
      <div className="product-stock">
        <h3>Product Stock</h3>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stock Transaction Section */}
      <div className="stock-transaction">
        <h3>Stock Transactions</h3>
        <form onSubmit={handleTransaction}>
          <div className="form-group">
            <label>Product:</label>
            <select
              value={transaction.productId}
              onChange={(e) =>
                setTransaction({ ...transaction, productId: parseInt(e.target.value) })
              }
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Transaction Type:</label>
            <select
              value={transaction.transactionType}
              onChange={(e) =>
                setTransaction({ ...transaction, transactionType: e.target.value })
              }
              required
            >
              <option value="add">Add Stock</option>
              <option value="remove">Remove Stock</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              value={transaction.quantity}
              onChange={(e) =>
                setTransaction({ ...transaction, quantity: parseInt(e.target.value) })
              }
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {transaction.transactionType === "add" ? <FaPlus /> : <FaMinus />} Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Staff;
