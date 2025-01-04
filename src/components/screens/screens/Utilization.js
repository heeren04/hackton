import React, { useState } from "react";

// Sample data for devices
const devices = [
  { id: 1, name: "Router A", location: "New York", status: "Active" },
  { id: 2, name: "Modem B", location: "Los Angeles", status: "Under Maintenance" },
  { id: 3, name: "Cable C", location: "Chicago", status: "Decommissioned" },
  { id: 4, name: "Switch D", location: "Houston", status: "Active" },
];

export default function DeviceManagement() {
  const [deviceList, setDeviceList] = useState(devices);
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredDevices = selectedStatus
    ? deviceList.filter((device) => device.status === selectedStatus)
    : deviceList;

  const updateStatus = (id, newStatus) => {
    setDeviceList((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id ? { ...device, status: newStatus } : device
      )
    );
  };

  const styles = {
    container: {
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      backgroundImage: "url('/dms.jpg')", // Ensure the image path is correct
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional for dark overlay
    },
    content: {
      position: "relative",
      zIndex: 2,
      textAlign: "center",
      padding: "20px",
      maxWidth: "80%",
    },
    header: {
      marginBottom: "20px",
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    label: {
      fontWeight: "bold",
    },
    list: {
      listStyleType: "none",
      padding: 0,
      textAlign: "left",
    },
    listItem: (status) => ({
      marginBottom: "15px",
      padding: "10px",
      border: "1px solid white",
      borderRadius: "5px",
      background: status === "Active"
        ? "rgba(0, 255, 0, 0.2)"
        : status === "Under Maintenance"
        ? "rgba(255, 165, 0, 0.2)"
        : "rgba(255, 0, 0, 0.2)",
      color: status === "Active" ? "green" : status === "Under Maintenance" ? "orange" : "red",
    }),
    button: {
      marginRight: "10px",
      padding: "5px 10px",
      border: "none",
      borderRadius: "3px",
      background: "rgba(255, 255, 255, 0.8)",
      color: "black",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.header}>Device Management System</h1>
        <div>
          <label style={styles.label}>Filter by Status:</label>
          <select onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Decommissioned">Decommissioned</option>
          </select>
        </div>
        <div>
          <h2>Device Inventory</h2>
          <ul style={styles.list}>
            {filteredDevices.map((device) => (
              <li key={device.id} style={styles.listItem(device.status)}>
                <strong>{device.name}</strong> - {device.location} <br />
                Status: <strong>{device.status}</strong> <br />
                <button
                  style={styles.button}
                  onClick={() => updateStatus(device.id, "Active")}
                >
                  Mark as Active
                </button>
                <button
                  style={styles.button}
                  onClick={() => updateStatus(device.id, "Under Maintenance")}
                >
                  Mark as Under Maintenance
                </button>
                <button
                  style={styles.button}
                  onClick={() => updateStatus(device.id, "Decommissioned")}
                >
                  Mark as Decommissioned
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
