
import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Button,
  Table, Modal, Form, Pagination, Badge
} from 'react-bootstrap';
import { FaPlus, FaEdit, FaVial } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const API_URL = `${API_BASE_URL}/TestRequest`;
const LABTEST_API_URL = `${API_BASE_URL}/LabTest`;

function TestRequestManagementPage() {
  const [requests, setRequests] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load test requests & lab tests
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [requestsResponse, labTestsResponse] = await Promise.all([
          axios.get(API_URL),
          axios.get(LABTEST_API_URL)
        ]);
        setRequests(requestsResponse.data);
        setLabTests(labTestsResponse.data);
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentRequest(null);
    setIsEditing(false);
  };

  const handleShowModal = (request = null, editMode = false) => {

    if (request) {
      setCurrentRequest({ ...request });
    } else {
      setCurrentRequest({ labTestId: '', status: 'Pending' });
    }
    setIsEditing(editMode);
    setShowModal(true);
  };

  const handleSave = () => {
    if (isEditing) {
      axios.put(`${API_URL}/${currentRequest.id}`, currentRequest)
        .then(res => {
          setRequests(requests.map(r => (r.id === res.data.id ? res.data : r)));
          handleCloseModal();
        });
    } else {
      const newRequest = {
        ...currentRequest,
        requestedAt: new Date().toISOString()
      };
      axios.post(API_URL, newRequest)
        .then(res => {
          setRequests([...requests, res.data]);
          handleCloseModal();
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRequest(prev => ({ ...prev, [name]: value }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending': return <Badge bg="warning" text="dark">Pending</Badge>;
      case 'Completed': return <Badge bg="success">Completed</Badge>;
      case 'Cancelled': return <Badge bg="danger">Cancelled</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <Container className="mt-4">
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <div className="text-center text-danger">
          <h4>{error}</h4>
          <Button variant="primary" onClick={fetchData}>Thử lại</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>

          <h2 className="admin-page-title">
            <FaVial className="me-2" /> Lab Test Request Management
          </h2>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Test Requests List</span>

          <Button variant="primary" onClick={() => handleShowModal(null, false)}>
            <FaPlus className="me-2" /> New Request
          </Button>
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="admin-table">
            <thead>
              <tr>
                <th>#</th>

                <th>Lab Test</th>
                <th>Requested At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((request, index) => (
                <tr key={request.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{labTests.find(t => t.id === request.labTestId)?.name || request.labTestId}</td>
                  <td>{new Date(request.requestedAt).toLocaleString()}</td>
                  <td>{getStatusBadge(request.status)}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(request, true)}>
                      <FaEdit />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        {totalPages > 1 && (
          <Card.Footer>
            <Pagination className="justify-content-center mb-0">
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Card.Footer>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Update Test Request' : 'New Test Request'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">

              <Form.Label>Lab Test</Form.Label>
              <Form.Select
                name="labTestId"
                value={currentRequest?.labTestId || ''}
                onChange={handleChange}
                disabled={isEditing}
              >
                <option value="" disabled>Select Test</option>
                {labTests.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={currentRequest?.status || 'Pending'} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TestRequestManagementPage;
