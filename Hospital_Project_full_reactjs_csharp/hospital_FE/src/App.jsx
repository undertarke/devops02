import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initTokenExpirationCheck } from './utils/auth';
import Layout from './components/layout/Layout';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DepartmentsPage from './pages/DepartmentsPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import ReviewPage from './pages/ReviewPage';
import PricingPage from './pages/PricingPage';
import GalleryPage from './pages/GalleryPage';
import AppointmentsPage from './pages/AppointmentsPage';
import InvoicePatientPage from './pages/InvoicePatientPage';
import UserInfoPage from './pages/UserInfoPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagementPage from './pages/admin/UserManagementPage';
import AppointmentManagementPage from './pages/admin/AppointmentManagementPage';
import MedicineManagementPage from './pages/admin/MedicineManagementPage';
import DoctorManagementPage from './pages/admin/DoctorManagementPage';
import DoctorScheduleManagementPage from './pages/admin/DoctorScheduleManagementPage';
import PatientManagementPage from './pages/admin/PatientManagementPage';
import MedicalRecordManagementPage from './pages/admin/MedicalRecordManagementPage';
import WaitingListManagementPage from './pages/admin/WaitingListManagementPage';
import MedicalServiceManagementPage from './pages/admin/MedicalServiceManagementPage';
import LabTestManagementPage from './pages/admin/LabTestManagementPage';
import TestRequestManagementPage from './pages/admin/TestRequestManagementPage';
import TestResultManagementPage from './pages/admin/TestResultManagementPage';
import PrescriptionPaymentPage from './pages/admin/PrescriptionPaymentPage';
import LabTestPaymentPage from './pages/admin/LabTestPaymentPage';
import ServicePaymentManagementPage from './pages/admin/ServicePaymentManagementPage';
import BlogManagementPage from './pages/admin/BlogManagementPage';
import PrescriptionManagementPage from './pages/admin/PrescriptionManagementPage';
import SupplierManagementPage from './pages/admin/SupplierManagementPage';
import { AppProvider } from './contexts/AppContext';
import AdminRoute from './components/auth/AdminRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  useEffect(() => {
    // Khởi tạo kiểm tra token expiration định kỳ
    const interval = initTokenExpirationCheck();
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <AppProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="doctors" element={<TeamPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="invoices" element={<InvoicePatientPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="user-info" element={<UserInfoPage />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="appointments" element={<AppointmentManagementPage />} />
          <Route path="medicines" element={<MedicineManagementPage />} />
          <Route path="doctors" element={<DoctorManagementPage />} />
          <Route path="doctor-schedules" element={<DoctorScheduleManagementPage />} />
          <Route path="patients" element={<PatientManagementPage />} />
          <Route path="medical-records" element={<MedicalRecordManagementPage />} />
          <Route path="waiting-list" element={<WaitingListManagementPage />} />
          <Route path="medical-services" element={<MedicalServiceManagementPage />} />
          <Route path="lab-tests" element={<LabTestManagementPage />} />
          <Route path="test-requests" element={<TestRequestManagementPage />} />
          <Route path="test-results" element={<TestResultManagementPage />} />
          <Route path="prescriptions" element={<PrescriptionManagementPage />} />
          <Route path="suppliers" element={<SupplierManagementPage />} />
          <Route path="prescription-payments" element={<PrescriptionPaymentPage />} />
          <Route path="lab-test-payments" element={<LabTestPaymentPage />} />
          <Route path="service-payments" element={<ServicePaymentManagementPage />} />
          <Route path="blogs" element={<BlogManagementPage />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppProvider>
  );
}

export default App; 