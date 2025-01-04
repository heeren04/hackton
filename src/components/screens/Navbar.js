import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");

    // Handle the search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle filter change
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        onSearch(searchQuery, e.target.value); // Trigger search with updated filter
    };

    // Handle search form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery, filter); // Trigger search with query and filter
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link
                        className="navbar-brand"
                        to="/"
                        style={{ fontSize: "26px", fontWeight: "700", letterSpacing: "2px" }}
                    >
                        Telecom Services
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0"></ul>

                        {/* Search Bar */}
                        <form
                            className="d-flex"
                            onSubmit={handleSearchSubmit}
                            style={{ maxWidth: "600px", width: "100%", display: "flex", gap: "10px" }}
                        >
                            <div style={{ position: "relative", width: "100%" }}>
                                {/* Search Input */}
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Search by name, category, or stock"
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    style={{
                                        borderRadius: "50px",
                                        padding: "10px 50px 10px 20px",
                                        fontSize: "14px",
                                        border: "1px solid #ccc",
                                        backgroundColor: "#fff",
                                        color: "#333",
                                    }}
                                />
                                {/* Search Button */}
                                <button
                                    type="submit"
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        backgroundColor: "#333",
                                        border: "none",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        color: "#fff",
                                        fontSize: "18px",
                                        width: "36px",
                                        height: "36px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>

                            {/* Filter Dropdown */}
                            <select
                                className="form-select"
                                value={filter}
                                onChange={handleFilterChange}
                                style={{
                                    borderRadius: "50px",
                                    padding: "10px",
                                    fontSize: "14px",
                                    border: "1px solid #ccc",
                                    backgroundColor: "#fff",
                                    color: "#333",
                                    width: "30%",
                                }}
                            >
                                <option value="all">All</option>
                                <option value="low-stock">Low Stock</option>
                                <option value="out-of-stock">Out of Stock</option>
                            </select>
                        </form>

                        {/* Login/Sign-Up Button */}
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item" style={{ marginLeft: "20px" }}>
                                <Link
                                    className="nav-link"
                                    to="/login"
                                    style={{
                                        display: "inline-block",
                                        padding: "10px 25px",
                                        borderRadius: "25px",
                                        backgroundColor: "#ff5c5c",
                                        color: "#fff",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        textDecoration: "none",
                                        transition: "background-color 0.3s ease, transform 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "#e60000";
                                        e.target.style.transform = "scale(1.05)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "#ff5c5c";
                                        e.target.style.transform = "scale(1)";
                                    }}
                                >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
