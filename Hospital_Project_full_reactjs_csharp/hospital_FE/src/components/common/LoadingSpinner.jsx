import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle inner"></div>
        <div className="spinner-circle outer"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 