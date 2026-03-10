import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars } from 'react-icons/fa';
import './AdminStyles.css';

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 992);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="admin-layout">
            <Sidebar isOpen={isSidebarOpen} />
            <button 
                className={`admin-sidebar-toggle-btn ${isSidebarOpen ? 'open' : ''}`}
                onClick={toggleSidebar}
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
                <FaBars />
            </button>
            <main className={`admin-main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="admin-content-wrapper">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout; 