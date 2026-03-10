import React, { useState, useEffect } from 'react';
import {
  Table, Button, Modal, Form, Container, Card, Row, Col, Pagination, Badge
} from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaFileMedical, FaUserInjured, FaUserMd, FaCalendarAlt, FaNotesMedical } from 'react-icons/fa';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const MedicalRecordManagementPage = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    diagnosis: '',
    treatment: '',
    prescription: '',
    notes: '',
    recordDate: format(new Date(), 'yyyy-MM-dd'),
    status: 'Active'
  });

  useEffect(() => {
    fetchMedicalRecords();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/MedicalRecords');
      setMedicalRecords(response.data);
    } catch (error) {
      console.error('Failed to fetch medical records:', error);
      toast.error('Không thể tải danh sách hồ sơ bệnh án');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get('/Patient');
      setPatients(response.data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      toast.error('Không thể tải danh sách bệnh nhân');
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await api.get('/Doctor');
      setDoctors(response.data);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
      toast.error('Không thể tải danh sách bác sĩ');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openModal = (record = null) => {
    if (record) {
      setEditingId(record.id);
      setFormData({
        patientId: record.patientId,
        doctorId: record.doctorId,
        diagnosis: record.diagnosis,
        treatment: record.treatment,
        prescription: record.prescription,
        notes: record.notes,
        recordDate: format(new Date(record.recordDate), 'yyyy-MM-dd'),
        status: record.status
      });
    } else {
      setEditingId(null);
      setFormData({
        patientId: '',
        doctorId: '',
        diagnosis: '',
        treatment: '',
        prescription: '',
        notes: '',
        recordDate: format(new Date(), 'yyyy-MM-dd'),
        status: 'Active'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/MedicalRecords/${editingId}`, formData);
        toast.success('Cập nhật hồ sơ bệnh án thành công');
      } else {
        await api.post('/MedicalRecords', formData);
        toast.success('Thêm hồ sơ bệnh án thành công');
      }
      setShowModal(false);
      fetchMedicalRecords();
    } catch (error) {
      console.error('Error saving medical record:', error);
      toast.error('Không thể lưu thông tin hồ sơ bệnh án');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa hồ sơ bệnh án này?')) {
      try {
        await api.delete(`/MedicalRecords/${id}`);
        toast.success('Xóa hồ sơ bệnh án thành công');
        fetchMedicalRecords();
      } catch (error) {
        console.error('Error deleting medical record:', error);
        toast.error('Không thể xóa hồ sơ bệnh án');
      }
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Active': 'success',
      'Completed': 'primary',
      'Cancelled': 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = medicalRecords.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(medicalRecords.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title">
            <FaFileMedical className="me-2" /> Quản lý hồ sơ bệnh án
          </h2>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => openModal()}>
            <FaPlus className="me-2" /> Thêm hồ sơ bệnh án
          </Button>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Danh sách hồ sơ bệnh án</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Bệnh nhân</th>
                <th>Bác sĩ</th>
                <th>Ngày khám</th>
                <th>Chẩn đoán</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center p-3">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">Không có hồ sơ bệnh án nào</td>
                </tr>
              ) : (
                currentItems.map((record, index) => (
                  <tr key={record.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>
                      <FaUserInjured className="me-1" />
                      {patients.find(p => p.id === record.patientId)?.fullName || 'N/A'}
                    </td>
                    <td>
                      <FaUserMd className="me-1" />
                      {doctors.find(d => d.id === record.doctorId)?.fullName || 'N/A'}
                    </td>
                    <td>
                      <FaCalendarAlt className="me-1" />
                      {format(new Date(record.recordDate), 'dd/MM/yyyy')}
                    </td>
                    <td>{record.diagnosis}</td>
                    <td>{getStatusBadge(record.status)}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => openModal(record)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(record.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          {!isLoading && medicalRecords.length > 0 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaNotesMedical className="me-2" />
            {editingId ? 'Cập nhật hồ sơ bệnh án' : 'Thêm hồ sơ bệnh án mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Bệnh nhân</Form.Label>
                  <Form.Select
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn bệnh nhân</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.fullName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Bác sĩ</Form.Label>
                  <Form.Select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn bác sĩ</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.fullName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ngày khám</Form.Label>
                  <Form.Control
                    type="date"
                    name="recordDate"
                    value={formData.recordDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Trạng thái</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Active">Đang điều trị</option>
                    <option value="Completed">Hoàn thành</option>
                    <option value="Cancelled">Đã hủy</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Chẩn đoán</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phương pháp điều trị</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="treatment"
                value={formData.treatment}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Đơn thuốc</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="prescription"
                value={formData.prescription}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button variant="primary" type="submit">
                {editingId ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MedicalRecordManagementPage;