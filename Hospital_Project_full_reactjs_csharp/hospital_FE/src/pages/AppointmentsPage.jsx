import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Row, Col, Card, Button, Modal, Pagination, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './AppointmentsPage.css';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';
import axios from 'axios';


const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);


useEffect(() => {
  const fetchPatientAndAppointments = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const userId = authData?.userId;

      if (!userId) return;

      const patientRes = await axios.get(`${API_BASE_URL}/Patient/user/${userId}`);
      const patientId = patientRes.data.id;

      const appointmentsRes = await axios.get(`${API_BASE_URL}/Appointment/by-patient/${patientId}`);
      setAppointments(appointmentsRes.data);
    } catch (error) {
      console.error("Error fetching patient or appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  fetchPatientAndAppointments();
}, []);





  const handleCancelAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      setLoading(true);
    const cancelUrl = `${API_BASE_URL}/Appointment/cancel/${selectedAppointment.id}`;
    await axios.put(cancelUrl); // gọi API để hủy

    const updatedAppointments = appointments.map(appointment =>
      appointment.id === selectedAppointment.id
        ? { ...appointment, status: 'Cancelled' }
        : appointment
    );

    setAppointments(updatedAppointments);
    toast.success('Appointment cancelled successfully');
    setShowCancelModal(false);
    setSelectedAppointment(null);

    } catch (error) {
      toast.error('Failed to cancel appointment. Please try again.');
      console.error('Cancel appointment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const openCancelModal = (appointment) => {
    if (appointment.status === 'Cancelled') {

      toast.warning('This appointment is already cancelled');
      return;
    }
    if (appointment.status === 'completed') {
      toast.warning('Cannot cancel a completed appointment');
      return;
    }
  


    const appointmentDate = new Date(`${appointment.date} ${appointment.time}`);
    if (appointmentDate < new Date()) {
      toast.warning('Cannot cancel past appointments');
      return;
    }

    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = (
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'primary';
      case 'completed':
        return 'success';
      case 'Cancelled':
        return 'danger';
      

      default:
        return 'secondary';
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* Page Header */}
      <section id="intro" style={{ backgroundColor: '#E8F0F1' }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Appointments</h1>
            <span className="item"><Link to="/" className="">Home</Link></span> &nbsp; <span className="">/</span> &nbsp; <span
              className="item">Appointments</span>
          </div>
        </div>
      </section>

      <section className="appointments-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">
                  <FaCalendarAlt className="me-2 text-primary" />
                  My Appointments
                </h2>
                <div className="appointment-stats d-flex gap-3">
                  <Badge bg="primary" className="stats-badge">
                    Scheduled: {appointments.filter(a => a.status === 'Scheduled').length}
                  </Badge>
                  <Badge bg="success" className="stats-badge">
                    Completed: {appointments.filter(a => a.status === 'completed').length}
                  </Badge>
                  <Badge bg="danger" className="stats-badge">
                    Cancelled: {appointments.filter(a => a.status === 'Cancelled').length}
                  </Badge>
                 
                </div>
              </div>
              
              <Row className="mb-4 g-3">
                <Col md={6}>
                  <div className="search-box">
                    <FaSearch className="search-icon" />
                    <Form.Control
                      type="text"
                      placeholder="Search appointments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    {searchTerm && (
                      <Button 
                        variant="link" 
                        className="clear-search" 
                        onClick={() => setSearchTerm('')}
                      >
                        <FaTimes />
                      </Button>
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="filter-box">
                    <FaFilter className="filter-icon" />
                    <Form.Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">All Status</option>
                      <option value="Scheduled">Scheduled</option>

                      <option value="completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>

                    </Form.Select>
                  </div>
                </Col>
              </Row>

              <div className="table-responsive appointment-table">
                <Table hover className="align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Patient Name</th>
                      <th>Doctor</th>

                      <th>Specialization</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.doctorName}</td>

                        <td>{appointment.specialization}</td>
                        <td>
                          {(() => {
                            const date = new Date(appointment.appointmentDate);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const year = date.getFullYear();
                            return `${day}/${month}/${year}`;
                          })()}
                        </td>
                        <td>{appointment.startTime?.substring(0, 5)} - {appointment.endTime?.substring(0, 5)}</td>
                        <td>{appointment.note}</td>

                        <td>
                          <Badge 
                            bg={getStatusBadgeVariant(appointment.status)}
                            className="status-badge"
                          >
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </Badge>
                        </td>
                        <td>

                          {appointment.status === 'Scheduled' && (

                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="cancel-btn"
                              onClick={() => openCancelModal(appointment)}
                            >
                              Cancel
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {filteredAppointments.length === 0 ? (
                <div className="text-center py-5">
                  <FaCalendarAlt className="text-muted mb-3" size={40} />
                  <p className="text-muted mb-0">No appointments found matching your criteria.</p>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <p className="text-muted mb-0">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAppointments.length)} of {filteredAppointments.length} appointments
                  </p>
                  <Pagination className="mb-0">
                    <Pagination.First 
                      onClick={() => paginate(1)} 
                      disabled={currentPage === 1}
                    />
                    <Pagination.Prev 
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next 
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last 
                      onClick={() => paginate(totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </section>

      <Modal 
        show={showCancelModal} 
        onHide={() => setShowCancelModal(false)} 
        centered
        className="cancel-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <div className="appointment-details">
              <div className="detail-item">
                <span className="label">Doctor:</span>
                <span className="value">{selectedAppointment.doctorName}</span>
              </div>
              <div className="detail-item">
                <span className="label">Date:</span>
                <span className="value">{new Date(selectedAppointment.appointmentDate).toLocaleDateString('en-GB')}</span>
              </div>
              <div className="detail-item">
                <span className="label">Time:</span>
                <span className="value">{selectedAppointment.startTime?.substring(0, 5)} - {selectedAppointment.endTime?.substring(0, 5)}</span>
              </div>
              <div className="detail-item">
                <span className="label">Department:</span>
                <span className="value">{selectedAppointment.specialization}</span>

              </div>
              <div className="mt-3">
                <p className="text-danger mb-0">
                  <FaTimes className="me-2" />
                  This action cannot be undone.
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Keep Appointment
          </Button>
          <Button variant="danger" onClick={handleCancelAppointment}>
            Cancel Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppointmentsPage; 