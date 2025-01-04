import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./HassleFree.css";

const plans = [
  {
    id: 1,
    name: "Basic Plan",
    price: 799, // Price in INR
    features: ["Unlimited Calling", "100 SMS/day", "2GB Data/day"],
  },
  {
    id: 2,
    name: "Pro Plan",
    price: 1299, // Price in INR
    features: [
      "Unlimited Calling",
      "200 SMS/day",
      "5GB Data/day",
      "Free Caller Tune",
      "Access to Basic OTT Platforms",
    ],
  },
  {
    id: 3,
    name: "Enterprise Plan",
    price: 2499, // Price in INR
    features: [
      "Unlimited Calling",
      "500 SMS/day",
      "10GB Data/day",
      "Free Caller Tune",
      "Access to Premium OTT Platforms",
      "Priority Customer Support",
      "International Roaming",
    ],
  },
];

const HassleFree = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [months, setMonths] = useState(1);
  const [showBilling, setShowBilling] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setMonths(1); // Reset months when selecting a new plan
    setShowBilling(true); // Open billing modal
  };

  const handleCloseBilling = () => {
    setShowBilling(false); // Close billing modal
  };

  const increaseMonths = () => setMonths((prev) => prev + 1);
  const decreaseMonths = () => setMonths((prev) => (prev > 1 ? prev - 1 : 1));

  const handleProceedToPay = () => {
    // Navigate to the billing page and pass selected plan and months as state
    navigate("/billing", { state: { selectedPlan, months } });
  };

  return (
    <div className="hassle-free">
      <h1>Hassle-Free Management of Telecom Services</h1>
      <div className="plan-selector">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="plan-card"
            onClick={() => handleSelectPlan(plan)}
          >
            <h2>{plan.name}</h2>
            <p>Price: ₹{plan.price}/month</p>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {showBilling && selectedPlan && (
        <div className="billing-modal">
          <div className="billing-content">
            <button className="close-button" onClick={handleCloseBilling}>
              ✖
            </button>
            <h2>Billing & Transparency</h2>
            <p>Selected Plan: {selectedPlan.name}</p>
            <p>Price per Month: ₹{selectedPlan.price}</p>
            <div className="month-selector">
              <button onClick={decreaseMonths} className="adjust-button">-</button>
              <span>{months}</span>
              <button onClick={increaseMonths} className="adjust-button">+</button>
            </div>
            <h3>Total Price: ₹{selectedPlan.price * months}</h3>
            <button onClick={handleProceedToPay} className="proceed-button">
              Proceed to Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HassleFree;
