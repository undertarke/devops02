import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Pagination } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaStethoscope } from 'react-icons/fa';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';

function MedicalServiceManagementPage() {

  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/MedicalService`);
        setServices(response.data);
      } catch (error) {
        console.error('Failed to fetch medical services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentService(null);
    setIsEditing(false);
  };

  const handleShowModal = (service = null) => {
    if (service) {
      setCurrentService({ ...service });
      setIsEditing(true);
    } else {
      setCurrentService({ name: '', type: '', price: 0, description: '' });
      setIsEditing(false);
    }
    setShowModal(true);
  };


  // Thêm hoặc sửa medical service qua API
  const handleSave = () => {
    if (isEditing) {
      axios.put(`${API_BASE_URL}/${currentService.id}`, currentService)
        .then(res => {
          setServices(services.map(s => (s.id === res.data.id ? res.data : s)));
          handleCloseModal();
        });
    } else {
      axios.post(API_BASE_URL, currentService)
        .then(res => {
          setServices([...services, res.data]);
          handleCloseModal();
        });
    }
  };

  // Xóa medical service qua API
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this medical service?')) {
      axios.delete(`${API_BASE_URL}/${id}`)
        .then(() => setServices(services.filter(s => s.id !== id)));
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title"><FaStethoscope className="me-2" /> Medical Service Management</h2>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">

          <h5 className="mb-0">Danh Sách Dịch Vụ Y Tế</h5>
          <Button variant="primary" onClick={() => handleShowModal()}>
            <FaPlus className="me-2" /> Thêm Dịch Vụ
          </Button>
        </Card.Header>
        <Card.Body>
          {isLoading ? (
            <div className="text-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên Dịch Vụ</th>
                    <th>Loại</th>
                    <th>Giá</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((service, index) => (
                    <tr key={service.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{service.name}</td>
                      <td>{service.type}</td>
                      <td>${service.price.toFixed(2)}</td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowModal(service)}>
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(service.id)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
            </>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Medical Service' : 'Add New Service'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Service Name</Form.Label>
              <Form.Control type="text" name="name" value={currentService?.name || ''} onChange={handleChange} placeholder="e.g., General Check-up" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Service Type</Form.Label>
              <Form.Control type="text" name="type" value={currentService?.type || ''} onChange={handleChange} placeholder="e.g., Consultation, Imaging" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control type="number" name="price" value={currentService?.price || 0} onChange={handleChange} min="0" step="0.01" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={currentService?.description || ''} onChange={handleChange} placeholder="Enter a brief description of the service" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? 'Save Changes' : 'Add Service'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}


export default MedicalServiceManagementPage;
