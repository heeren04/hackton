import React, { useState } from 'react';
import './onboarding.css';

function Onboarding() {
  // State to store user input
  const [service, setService] = useState('');
  const [recommendation, setRecommendation] = useState('');

  // Handle the user input and show recommendation based on selection
  const handleServiceSelection = (e) => {
    const selectedService = e.target.value;
    setService(selectedService);

    // Generate a tailored recommendation based on the selected service
    if (selectedService === 'Router') {
      setRecommendation('We recommend our high-performance routers with advanced security features.');
    } else if (selectedService === 'Switch') {
      setRecommendation('Check out our managed and unmanaged switches to improve network efficiency.');
    } else if (selectedService === 'Modem') {
      setRecommendation('Explore our latest modems for faster internet speeds and reliable connections.');
    } else if (selectedService === 'Cable') {
      setRecommendation('Our premium cable packages offer high-quality connectivity for both home and business.');
    } else {
      setRecommendation('');
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <h2>Welcome to Our Services</h2>
        <p>Please select the service you're interested in:</p>
        
        {/* Dropdown to select service */}
        <select
          className="service-dropdown"
          value={service}
          onChange={handleServiceSelection}
        >
          <option value="">Select a service</option>
          <option value="Router">Router</option>
          <option value="Switch">Switch</option>
          <option value="Modem">Modem</option>
          <option value="Cable">Cable</option>
        </select>

        {/* Display personalized recommendation based on user choice */}
        {recommendation && (
          <div className="recommendation">
            <h3>Recommendation:</h3>
            <p>{recommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Onboarding;
