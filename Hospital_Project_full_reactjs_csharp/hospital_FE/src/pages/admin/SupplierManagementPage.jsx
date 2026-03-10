import React, { useState, useEffect } from 'react';
import {
  Table, Button, Modal, Form, Container, Card, Row, Col, Pagination
} from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaTruck, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { toast } from 'react-toastify';

const SupplierManagementPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    supplierName: '',
    address: '',
    phone: '',
    email: '',
    contactPerson: '',
    description: ''
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/MedicineSupplier');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
      toast.error('Không thể tải danh sách nhà cung cấp');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openModal = (supplier = null) => {
    if (supplier) {
      setEditingId(supplier.id);
      setFormData({
        supplierName: supplier.supplierName,
        address: supplier.address,
        phone: supplier.phone,
        email: supplier.email,
        contactPerson: supplier.contactPerson,
        description: supplier.description
      });
    } else {
      setEditingId(null);
      setFormData({
        supplierName: '',
        address: '',
        phone: '',
        email: '',
        contactPerson: '',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/MedicineSupplier/${editingId}`, formData);
        toast.success('Cập nhật nhà cung cấp thành công');
      } else {
        await api.post('/MedicineSupplier', formData);
        toast.success('Thêm nhà cung cấp thành công');
      }
      setShowModal(false);
      fetchSuppliers();
    } catch (error) {
      console.error('Error saving supplier:', error);
      toast.error('Không thể lưu thông tin nhà cung cấp');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa nhà cung cấp này?')) {
      try {
        await api.delete(`/MedicineSupplier/${id}`);
        toast.success('Xóa nhà cung cấp thành công');
        fetchSuppliers();
      } catch (error) {
        console.error('Error deleting supplier:', error);
        toast.error('Không thể xóa nhà cung cấp');
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = suppliers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(suppliers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title">
            <FaTruck className="me-2" /> Quản lý nhà cung cấp
          </h2>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => openModal()}>
            <FaPlus className="me-2" /> Thêm nhà cung cấp
          </Button>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Danh sách nhà cung cấp</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên nhà cung cấp</th>
                <th>Người liên hệ</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
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
                  <td colSpan="7" className="text-center">Không có nhà cung cấp nào</td>
                </tr>
              ) : (
                currentItems.map((supplier, index) => (
                  <tr key={supplier.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{supplier.supplierName}</td>
                    <td>{supplier.contactPerson}</td>
                    <td>
                      <FaPhone className="me-1" />
                      {supplier.phone}
                    </td>
                    <td>
                      <FaEnvelope className="me-1" />
                      {supplier.email}
                    </td>
                    <td>
                      <FaMapMarkerAlt className="me-1" />
                      {supplier.address}
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => openModal(supplier)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(supplier.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          {!isLoading && suppliers.length > 0 && (
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Cập nhật nhà cung cấp' : 'Thêm nhà cung cấp mới'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên nhà cung cấp</Form.Label>
              <Form.Control
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Người liên hệ</Form.Label>
              <Form.Control
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
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

export default SupplierManagementPage;