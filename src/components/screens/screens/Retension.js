import React, { useState, useEffect } from 'react';
import './TelecomBilling.css'; // You can add CSS for styling

// Function to simulate user activity data
const simulateUserEngagement = (remainingDays) => {
  return remainingDays <= 30; // User might stop engaging if days <= 30
};

// Function to apply retention incentive (e.g., discount)
const applyRetentionIncentive = (setDiscount) => {
  setDiscount(true); // Apply discount
  alert('You are eligible for a 10% discount on your next renewal!');
};

// Retention function to check if a user should be offered an incentive
const checkRetention = (remainingDays, setShowModal, setDiscount) => {
  if (simulateUserEngagement(remainingDays)) {
    setShowModal(true); // Show modal if user is at risk of churning
    applyRetentionIncentive(setDiscount); // Apply incentive
  }
};

const TelecomBilling = () => {
  const [remainingDays, setRemainingDays] = useState(5); // Initial remaining days in subscription
  const [showModal, setShowModal] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [finalAmount, setFinalAmount] = useState(799); // Assume initial price is ₹799

  useEffect(() => {
    // Simulate timer ticking down (user's subscription countdown)
    const timer = setInterval(() => {
      setRemainingDays((prevDays) => {
        if (prevDays > 0) return prevDays - 1;
        return 0; // Prevent negative values
      });
    }, 86400000); // 86400000 ms = 1 day (24 hours)

    // Check retention every day based on remaining days
    checkRetention(remainingDays, setShowModal, setDiscountApplied);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [remainingDays]);

  const handleConfirmAndPay = () => {
    if (discountApplied) {
      // Apply a 10% discount and show final amount
      const discountedPrice = finalAmount * 0.9;
      alert(`You have received a 10% discount! Final amount to pay: ₹${discountedPrice}`);
    } else {
      alert(`Final amount to pay: ₹${finalAmount}`);
    }
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal if the user doesn't want the discount
  };

  return (
    <div className="billing-container">
      <h1>Telecom Billing</h1>
      <p>Remaining days until renewal: {remainingDays}</p>

      <div className="plan-details">
        <h2>Plan Details</h2>
        <p>Price: ₹{finalAmount}</p>
        <p>Status: {remainingDays <= 30 ? 'You are eligible for a retention offer!' : 'Stay active to keep your plan running'}</p>
      </div>

      <button className="pay-button" onClick={handleConfirmAndPay}>Confirm and Pay</button>

      {showModal && (
        <div className="incentive-modal">
          <div className="modal-content">
            <h2>We Miss You!</h2>
            <p>Your subscription is almost over. To retain you, we offer a 10% discount on your next renewal!</p>
            <div className="modal-actions">
              <button className="claim-button" onClick={handleConfirmAndPay}>Claim Discount</button>
              <button className="decline-button" onClick={handleModalClose}>No, Thanks</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelecomBilling;
