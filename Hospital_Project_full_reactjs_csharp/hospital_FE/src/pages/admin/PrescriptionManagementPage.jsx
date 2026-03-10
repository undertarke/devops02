import React, { useState, useEffect } from 'react';
import {
  Table, Button, Modal, Form, Container, Card, Row, Col, Pagination, Badge
} from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaPrescriptionBottle, FaEye } from 'react-icons/fa';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { toast } from 'react-toastify';

const PrescriptionManagementPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/prescriptions');
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Failed to fetch prescriptions:', error);
      toast.error('Không thể tải danh sách đơn thuốc');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = prescriptions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(prescriptions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title">
            <FaPrescriptionBottle className="me-2" /> Quản lý đơn thuốc
          </h2>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Danh sách đơn thuốc</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Mã đơn thuốc</th>
                <th>Bệnh nhân</th>
                <th>Bác sĩ kê đơn</th>
                <th>Ngày kê đơn</th>
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
                  <td colSpan="7" className="text-center">Không có đơn thuốc nào</td>
                </tr>
              ) : (
                currentItems.map((prescription, index) => (
                  <tr key={prescription.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>#{prescription.id}</td>
                    <td>{prescription.patientName}</td>
                    <td>{prescription.prescribedBy}</td>
                    <td>{formatDate(prescription.createdAt)}</td>
                    <td>
                      <Badge bg={prescription.status === 'Completed' ? 'success' : 'warning'}>
                        {prescription.status === 'Completed' ? 'Đã hoàn thành' : 'Chờ xử lý'}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        variant="outline-info" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleViewDetails(prescription)}
                      >
                        <FaEye />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          {!isLoading && prescriptions.length > 0 && (
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
          <Modal.Title>Chi tiết đơn thuốc #{selectedPrescription?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPrescription && (
            <>
              <Row className="mb-4">
                <Col md={6}>
                  <h6>Thông tin bệnh nhân</h6>
                  <p>Tên: {selectedPrescription.patientName}</p>
                  <p>Mã bệnh nhân: {selectedPrescription.patientId}</p>
                </Col>
                <Col md={6}>
                  <h6>Thông tin bác sĩ</h6>
                  <p>Bác sĩ kê đơn: {selectedPrescription.prescribedBy}</p>
                  <p>Ngày kê: {formatDate(selectedPrescription.createdAt)}</p>
                </Col>
              </Row>
              <h6>Chi tiết đơn thuốc</h6>
              <Table responsive striped bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên thuốc</th>
                    <th>Liều lượng</th>
                    <th>Số lượng</th>
                    <th>Hướng dẫn</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPrescription.details?.map((detail, index) => (
                    <tr key={detail.id}>
                      <td>{index + 1}</td>
                      <td>{detail.medicineName}</td>
                      <td>{detail.dosage}</td>
                      <td>{detail.quantity}</td>
                      <td>{detail.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PrescriptionManagementPage;