
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Pagination } from 'react-bootstrap';
import { FaClipboardCheck, FaEdit, FaEye, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const API_URL = `${API_BASE_URL}/TestResult`;
const REQUEST_API_URL = `${API_BASE_URL}/TestRequest`;

function TestResultManagementPage() {
  const [results, setResults] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [resultsRes, requestsRes] = await Promise.all([
        axios.get(API_URL),
        axios.get(REQUEST_API_URL)
      ]);
      setResults(resultsRes.data);
      setPendingRequests(requestsRes.data);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentResult(null);
    setIsEditing(false);
  };

  const handleShowModal = (result = null, editMode = false) => {

    if (result) {
      setCurrentResult({ ...result });
    } else {
      setCurrentResult({ testRequestID: '', result: '', resultDate: new Date().toISOString() });
    }
    setIsEditing(editMode);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (currentResult.id) {
        await axios.put(`${API_URL}/${currentResult.id}`, currentResult);
      } else {
        await axios.post(API_URL, currentResult);
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving test result:', error);
      alert('Có lỗi xảy ra khi lưu kết quả xét nghiệm');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentResult(prev => ({ ...prev, [name]: value }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);


  const getRequestInfo = (testRequestID) => {
    const req = pendingRequests.find(r => r.id === parseInt(testRequestID));
    if (!req) return { patientName: '', testName: '' };
    return {
      patientName: req.patientName || req.PatientName || '',
      testName: req.labTestName || req.LabTestName || req.testName || ''
    };
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Quản lý kết quả xét nghiệm</h4>
              <Button variant="primary" onClick={() => handleShowModal(null, true)}>
                <FaPlus className="me-2" /> Thêm kết quả mới
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Bệnh nhân</th>
                    <th>Tên xét nghiệm</th>
                    <th>Ngày có kết quả</th>
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
                        <Button variant="primary" size="sm" className="mt-2" onClick={fetchData}>
                          Thử lại
                        </Button>
                      </td>
                    </tr>
                  ) : currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">Không tìm thấy kết quả xét nghiệm nào.</td>
                    </tr>
                  ) : (
                    currentItems.map((result) => {
                      const info = getRequestInfo(result.testRequestID);
                      return (
                        <tr key={result.id}>
                          <td>{result.id}</td>
                          <td>{info.patientName}</td>
                          <td>{info.testName}</td>
                          <td>{new Date(result.resultDate).toLocaleString('vi-VN')}</td>
                          <td>
                            <Button
                              variant="info"
                              size="sm"
                              className="me-2"
                              onClick={() => handleShowModal(result, false)}
                            >
                              <FaEye /> Xem
                            </Button>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleShowModal(result, true)}
                            >
                              <FaEdit /> Sửa
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
              {!isLoading && !error && results.length > itemsPerPage && (
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>

          <Modal.Title>
            {isEditing ? (currentResult?.id ? 'Cập nhật kết quả xét nghiệm' : 'Thêm kết quả xét nghiệm mới') : 'Xem kết quả xét nghiệm'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {currentResult?.id ? (
              <>
                <Row className="mb-3">
                  <Col><p><strong>Bệnh nhân:</strong> {getRequestInfo(currentResult.testRequestID).patientName}</p></Col>
                  <Col><p><strong>Xét nghiệm:</strong> {getRequestInfo(currentResult.testRequestID).testName}</p></Col>
                </Row>
                <hr />
              </>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Yêu cầu xét nghiệm đang chờ</Form.Label>
                <Form.Select 
                  name="testRequestID" 
                  value={currentResult?.testRequestID || ''} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn yêu cầu xét nghiệm...</option>
                  {pendingRequests.map(req => (
                    <option key={req.id} value={req.id}>
                      {getRequestInfo(req.id).patientName} - {getRequestInfo(req.id).testName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Kết quả</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="result"
                value={currentResult?.result || ''}
                onChange={handleChange}
                placeholder="Nhập kết quả xét nghiệm chi tiết..."
                readOnly={!isEditing}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày có kết quả</Form.Label>
              <Form.Control
                type="datetime-local"
                name="resultDate"
                value={currentResult?.resultDate ? new Date(currentResult.resultDate).toISOString().slice(0, 16) : ''}
                onChange={handleChange}
                readOnly={!isEditing}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          {isEditing && (
            <Button variant="primary" onClick={handleSave}>
              {currentResult?.id ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}


export default TestResultManagementPage;
