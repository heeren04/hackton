import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Billing.css'; // Importing the CSS for styling

const Billing = () => {
  const location = useLocation();
  const { selectedPlan, months } = location.state || {};
  const [showIncentiveModal, setShowIncentiveModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30); // Set initial time to 30 days for plan renewal
  const [totalAmount, setTotalAmount] = useState(selectedPlan ? selectedPlan.price * months : 0); // Initial total amount
  const [discountApplied, setDiscountApplied] = useState(false); // To check if discount is applied

  useEffect(() => {
    // Timer for predicting the renewal
    const renewalTimer = setInterval(() => {
      if (remainingTime <= 1) {
        // Show the renewal incentive when the remaining time is less than or equal to 1 day
        setShowIncentiveModal(true);
        clearInterval(renewalTimer); // Stop the timer once the incentive is shown
      } else {
        setRemainingTime((prevTime) => prevTime - 1); // Decrease time by 1 day every interval
      }
    }, 86400000); // 86400000 ms = 1 day

    return () => clearInterval(renewalTimer);
  }, [remainingTime]);

  const handleIncentiveAccept = () => {
    // Apply incentive (10% discount)
    const discountedAmount = selectedPlan.price * months * 0.9; // 10% discount (multiply by 0.9)
    setTotalAmount(discountedAmount); // Update the totalAmount with the discounted amount
    setDiscountApplied(true); // Mark that discount has been applied
    setShowIncentiveModal(false); // Close the incentive modal
    alert('You have received a 10% discount on your next plan renewal!');
  };

  const handleEngageAgain = () => {
    setShowIncentiveModal(false); // Hide the incentive modal when user engages again
  };

  const handleConfirmAndPay = () => {
    if (discountApplied) {
      alert(`You have been rewarded with a 10% discount. Final amount to pay: ₹${totalAmount.toFixed(2)}`);
    } else {
      alert(`Final amount to pay: ₹${totalAmount.toFixed(2)}`);
    }
    // Proceed to payment or redirection logic can be added here
  };

  if (!selectedPlan) {
    return <p>No plan selected!</p>;
  }

  return (
    <div className="billing-page">
      <div className="billing-header">
        <h1>Billing Details</h1>
        <p className="billing-subtitle">Review your plan details and proceed with the payment.</p>
      </div>

      <div className="billing-info">
        <div className="billing-card">
          <h2>{selectedPlan.name}</h2>
          <p className="price">₹{selectedPlan.price}/month</p>
          <ul className="features">
            {selectedPlan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="billing-summary">
          <p><strong>Plan Duration:</strong> {months} month(s)</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
          <div className="payment-methods">
            <button className="payment-button">Pay with Credit/Debit Card</button>
            <button className="payment-button">Pay with UPI</button>
            <button className="payment-button">Pay with Wallet</button>
          </div>
        </div>
      </div>

      <div className="billing-footer">
        <button onClick={handleConfirmAndPay} className="confirm-button">Confirm and Pay</button>
      </div>

      {/* Showing the remaining time for renewal */}
      <div className="renewal-info">
        <p>Plan will expire in {remainingTime} day(s). Don't forget to renew!</p>
      </div>

      {/* Incentive Modal */}
      {showIncentiveModal && (
        <div className="incentive-modal">
          <div className="modal-content">
            <h2>We Miss You!</h2>
            <p>As a token of appreciation, we are offering you a 10% discount on your next renewal!</p>
            <button onClick={handleIncentiveAccept} className="incentive-button">
              Claim Discount
            </button>
            <button onClick={handleEngageAgain} className="engage-button">
              Continue Engaging
            </button>
            <button onClick={() => setShowIncentiveModal(false)} className="close-button">X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
