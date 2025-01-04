import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.toast')?.remove();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="toast">
      {message}
    </div>
  );
};

export default Toast;
