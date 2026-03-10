import React, { createContext, useState, useContext } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ ...notification, show: false });
  };

  return (
    <AppContext.Provider value={{ loading, setLoading, showNotification }}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={notification.show} 
          onClose={hideNotification}
          delay={3000} 
          autohide
          bg={notification.type}
        >
          <Toast.Header>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className={notification.type === 'success' ? 'text-white' : ''}>
            {notification.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}; 