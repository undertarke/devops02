import axios from 'axios';

// Xử lý API URL
// export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5247/api';
export const API_BASE_URL = 'https://dotnet.sangdev.xyz/api';

// Xử lý Media URL - loại bỏ /api ở cuối
export const MEDIA_BASE_URL = API_BASE_URL.endsWith('/api')
  ? API_BASE_URL.slice(0, -4) // Cắt bỏ /api ở cuối
  : API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const forgotPassword = (data) => api.post('/auth/forgot-password', data);
export const resetPassword = (data) => api.post('/auth/reset-password', data);
export const changePassword = (data) => api.post('/auth/change-password', data);

// User APIs
export const getAllUsers = () => api.get('/user');
export const getUserById = (id) => api.get(`/user/${id}`);
export const createUser = (data) => api.post('/user', data);
export const updateUser = (id, data) => api.put(`/user/${id}`, data);
export const deleteUser = (id) => api.delete(`/user/${id}`);

// Role APIs
export const getAllRoles = () => api.get('/roles');
export const getRoleById = (id) => api.get(`/roles/${id}`);
export const createRole = (data) => api.post('/roles', data);
export const updateRole = (id, data) => api.put(`/roles/${id}`, data);
export const deleteRole = (id) => api.delete(`/roles/${id}`);

// Permission APIs
export const getAllPermissions = () => api.get('/permission');
export const getPermissionById = (id) => api.get(`/permission/${id}`);
export const createPermission = (data) => api.post('/permission', data);
export const updatePermission = (id, data) => api.put(`/permission/${id}`, data);
export const deletePermission = (id) => api.delete(`/permission/${id}`);

// Doctor APIs
export const getAllDoctors = () => api.get('/doctor');
export const getDoctorById = (id) => api.get(`/doctor/${id}`);
export const createDoctor = (data) => api.post('/doctor', data);
export const updateDoctor = (id, data) => api.put(`/doctor/${id}`, data);
export const deleteDoctor = (id) => api.delete(`/doctor/${id}`);

// Patient APIs
export const getAllPatients = () => api.get('/patient');
export const getPatientById = (id) => api.get(`/patient/${id}`);
export const createPatient = (data) => api.post('/patient', data);
export const updatePatient = (id, data) => api.put(`/patient/${id}`, data);
export const deletePatient = (id) => api.delete(`/patient/${id}`);

// Appointment APIs
export const getAllAppointments = () => api.get('/appointment');
export const getAppointmentById = (id) => api.get(`/appointment/${id}`);
export const getAppointmentsByPatientId = (patientId) => api.get(`/appointment/by-patient/${patientId}`);
export const createAppointment = (data) => api.post('/appointment', data);
export const updateAppointment = (id, data) => api.put(`/appointment/${id}`, data);
export const deleteAppointment = (id) => api.delete(`/appointment/${id}`);

// Medical Record APIs
export const getAllMedicalRecords = () => api.get('/medicalrecords');
export const getMedicalRecordById = (id) => api.get(`/medicalrecords/${id}`);
export const createMedicalRecord = (data) => api.post('/medicalrecords', data);
export const updateMedicalRecord = (id, data) => api.put(`/medicalrecords/${id}`, data);
export const deleteMedicalRecord = (id) => api.delete(`/medicalrecords/${id}`);

// Invoice
export const createInvoiced = (data) => api.post('/Invoices/createddetails', data);
export const getInvoicesByPatientId = (patientId) => api.get(`/Invoices/by-patient/${patientId}`);

// Blog APIs
export const getAllBlogs = async () => {
  const response = await api.get('/blog');  // This endpoint now returns only published blogs
  return response.data;
};

export const getAllBlogsAdmin = async () => {
  const response = await api.get('/blog/admin');  // New admin endpoint that returns all blogs
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await api.get(`/blog/${id}`);
  return response.data;
};

export const createBlog = async (formData) => {
  console.log('Creating blog with data:', formData);
  const response = await api.post('/blog', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateBlog = async (id, formData) => {
  console.log('Updating blog with data:', formData);
  const response = await api.put(`/blog/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/blog/${id}`);
  return response.data;
};

// Waiting List APIs
export const getAllWaitingList = () => api.get('/WaitingList');
export const getWaitingListById = (id) => api.get(`/WaitingList/${id}`);
export const createWaitingList = (data) => api.post('/WaitingList', data);
export const updateWaitingList = (id, data) => api.put(`/WaitingList/${id}`, data);
export const deleteWaitingList = (id) => api.delete(`/WaitingList/${id}`);

// Prescriptions APIs
export const getAllPrescriptions = () => api.get('/prescriptions');
export const getPrescriptionById = (id) => api.get(`/prescriptions/${id}`);
export const createPrescription = (data) => api.post('/prescriptions', data);
export const updatePrescription = (id, data) => api.put(`/prescriptions/${id}`, data);
export const deletePrescription = (id) => api.delete(`/prescriptions/${id}`);

// Prescription Details APIs
export const getAllPrescriptionDetails = () => api.get('/prescriptiondetails');
export const getPrescriptionDetailById = (id) => api.get(`/prescriptiondetails/${id}`);
export const createPrescriptionDetail = (data) => api.post('/prescriptiondetails', data);
export const updatePrescriptionDetail = (id, data) => api.put(`/prescriptiondetails/${id}`, data);
export const deletePrescriptionDetail = (id) => api.delete(`/prescriptiondetails/${id}`);

export default api; 