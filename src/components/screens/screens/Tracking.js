import React, { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Sample data for Device Tracking and Billing
const deviceData = {
  "Device 1": { status: "Active", location: "Bangalore", lat: 12.9716, lng: 77.5946 },
  "Device 2": { status: "Inactive", location: "Hyderabad", lat: 17.385, lng: 78.4867 },
  "Device 3": { status: "Active", location: "Chennai", lat: 13.0827, lng: 80.2707 },
};

const billingData = {
  Name: "John Doe",
  Plan: "Premium",
  Usage: "200GB",
  MonthlyCharge: "₹4000",
  DueDate: "2024-12-30",
};

const TrackingAndBilling = () => {
  const [showMap, setShowMap] = useState(false);

  const handleShowMap = () => {
    setShowMap(!showMap);

    if (!showMap) {
      setTimeout(() => {
        const map = L.map("leafletMap").setView([15.2993, 78.3964], 5); // Center map on India
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Custom Icon for Markers
        const locationIcon = new L.Icon({
          iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Location_icon_%28font_awesome%29.svg/500px-Location_icon_%28font_awesome%29.svg.png", // You can use your own image here
          iconSize: [32, 32], // Size of the icon
          iconAnchor: [16, 32], // Point of the icon which will correspond to the marker's location
          popupAnchor: [0, -32], // Popup anchor
        });

        // Adding markers for each location with custom icons
        Object.keys(deviceData).forEach((device) => {
          const { lat, lng, location } = deviceData[device];
          L.marker([lat, lng], { icon: locationIcon })
            .addTo(map)
            .bindPopup(`<b>${location}</b>`);
        });
      }, 100); // Delay to ensure map container is rendered
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundImage: "url('/tracking.jpg')", // Ensure your image is in the public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        padding: "20px",
        position: "relative",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        Device Tracking & Billing Information
      </h1>

      {/* Device Tracking Section */}
      <div
        style={{
          margin: "20px 0",
          maxWidth: "600px",
          width: "90%",
          padding: "20px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Device Tracking</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Object.keys(deviceData).map((device) => (
            <li
              key={device}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              <strong>{device}</strong>
              <br />
              Status: {deviceData[device].status}
              <br />
              Location: {deviceData[device].location}
            </li>
          ))}
        </ul>
      </div>

      {/* Billing Information Section */}
      <div
        style={{
          margin: "20px 0",
          maxWidth: "600px",
          width: "90%",
          padding: "20px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",  // Background with opacity
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          color: "#fff",  // White text color for readability
          zIndex: "2",  // Ensures the billing section is above the map
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#fff" }}>Billing Information</h2>
        <p style={{ color: "#fff" }}>
          <strong>Name:</strong> {billingData.Name}
        </p>
        <p style={{ color: "#fff" }}>
          <strong>Plan:</strong> {billingData.Plan}
        </p>
        <p style={{ color: "#fff" }}>
          <strong>Usage:</strong> {billingData.Usage}
        </p>
        <p style={{ color: "#fff" }}>
          <strong>Monthly Charge:</strong> {billingData.MonthlyCharge}
        </p>
        <p style={{ color: "#fff" }}>
          <strong>Due Date:</strong> {billingData.DueDate}
        </p>
      </div>

      {/* Single Button to Show Map */}
      <button
        onClick={handleShowMap}
        style={{
          marginTop: "20px",
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        {showMap ? "Hide Map" : "View All Locations on Map"}
      </button>

      {/* Leaflet Map Section */}
      {showMap && (
        <div
          id="leafletMap"
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "80%",
            height: "50%", // Reduced height for map to ensure billing info is visible
            zIndex: "1",  // Lower zIndex to be behind the billing section
            backgroundColor: "rgba(255, 255, 255, 0.6)", // Slight opacity for visibility
            borderRadius: "10px",
            overflow: "hidden",
          }}
        />
      )}
    </div>
  );
};

export default TrackingAndBilling;
