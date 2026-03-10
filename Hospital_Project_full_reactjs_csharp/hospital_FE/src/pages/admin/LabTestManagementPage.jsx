
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Pagination } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaFlask } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const API_URL = `${API_BASE_URL}/LabTest`;

function LabTestManagementPage() {
  const [labTests, setLabTests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    fetchLabTests();
  }, []);

  const fetchLabTests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      setLabTests(response.data);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu xét nghiệm. Vui lòng thử lại sau.');
      console.error('Error fetching lab tests:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTest(null);
    setIsEditing(false);
  };

  const handleShowModal = (test = null) => {
    if (test) {
      setCurrentTest({
        labTestId: test.labTestId,
        labTestName: test.labTestName,
        labTestDescription: test.labTestDescription,
        labTestPrice: test.labTestPrice
      });
      setIsEditing(true);
    } else {
      setCurrentTest({
        labTestName: '',
        labTestDescription: '',
        labTestPrice: 0
      });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = labTests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(labTests.length / itemsPerPage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${currentTest.labTestId}`, currentTest);
      } else {
        await axios.post(API_URL, currentTest);
      }
      fetchLabTests();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving lab test:', error);
      alert('Có lỗi xảy ra khi lưu thông tin xét nghiệm');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa xét nghiệm này?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchLabTests();
      } catch (error) {
        console.error('Error deleting lab test:', error);
        alert('Có lỗi xảy ra khi xóa xét nghiệm');
      }
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Quản lý xét nghiệm</h4>
              <Button variant="primary" onClick={() => handleShowModal()}>
                <FaPlus className="me-2" /> Thêm xét nghiệm mới
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên xét nghiệm</th>
                    <th>Mô tả</th>
                    <th>Giá (VNĐ)</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        <LoadingSpinner />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="5" className="text-center text-danger py-4">
                        {error}
                        <br />
                        <Button variant="primary" size="sm" className="mt-2" onClick={fetchLabTests}>
                          Thử lại
                        </Button>
                      </td>
                    </tr>
                  ) : currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">Không tìm thấy dữ liệu xét nghiệm.</td>
                    </tr>
                  ) : (
                    currentItems.map((test) => (
                      <tr key={test.labTestId}>
                        <td>{test.labTestId}</td>
                        <td>{test.labTestName}</td>
                        <td>{test.labTestDescription}</td>
                        <td>{test.labTestPrice.toLocaleString('vi-VN')}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => handleShowModal(test)}
                          >
                            <FaEdit /> Sửa
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(test.labTestId)}
                          >
                            <FaTrash /> Xóa
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
              {!isLoading && !error && labTests.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Cập nhật xét nghiệm' : 'Thêm xét nghiệm mới'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tên xét nghiệm</Form.Label>
              <Form.Control
                type="text"
                value={currentTest?.labTestName || ''}
                onChange={(e) => setCurrentTest({ ...currentTest, labTestName: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentTest?.labTestDescription || ''}
                onChange={(e) => setCurrentTest({ ...currentTest, labTestDescription: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giá (VNĐ)</Form.Label>
              <Form.Control
                type="number"
                value={currentTest?.labTestPrice || 0}
                onChange={(e) => setCurrentTest({ ...currentTest, labTestPrice: Number(e.target.value) })}
                required
                min="0"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default LabTestManagementPage;
