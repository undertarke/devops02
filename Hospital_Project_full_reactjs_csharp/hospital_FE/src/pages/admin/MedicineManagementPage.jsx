
import React, { useState, useEffect } from 'react';
import {
  Table, Button, Modal, Form, Container, Card, Row, Col, Pagination
} from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaPills } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const API_URL = `${API_BASE_URL}/Medicines`;
const SUPPLIER_API = `${API_BASE_URL}/MedicineSupplier`;

const MedicineManagementPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: '',
    expiryDate: '',
    supplierId: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [medicinesRes, suppliersRes] = await Promise.all([
        axios.get(API_URL),
        axios.get(SUPPLIER_API)
      ]);
      setMedicines(medicinesRes.data);
      setSuppliers(suppliersRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        code: item.code,
        name: item.name,
        type: item.type,
        expiryDate: item.expiryDate?.substring(0, 10) || '',
        supplierId: item.supplierId || ''
      });
    } else {
      setEditingId(null);
      setFormData({ code: '', name: '', type: '', expiryDate: '', supplierId: '' });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    const method = editingId ? 'put' : 'post';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    axios[method](url, formData).then(() => {
      setShowModal(false);
      fetchData();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      axios.delete(`${API_URL}/${id}`).then(fetchData);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = medicines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(medicines.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="admin-page-title">
            <FaPills className="me-2" /> Quản Lý Thuốc
          </h2>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => openModal()}>
            <FaPlus className="me-2" /> Thêm Thuốc
          </Button>
        </Col>
      </Row>

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Danh Sách Thuốc</h5>
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
                    <th>Mã thuốc</th>
                    <th>Tên thuốc</th>
                    <th>Loại</th>
                    <th>Nhà cung cấp</th>
                    <th>Còn hạn?</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((m, i) => (
                    <tr key={i}>
                      <td>{indexOfFirstItem + i + 1}</td>
                      <td>{m.code}</td>
                      <td>{m.name}</td>
                      <td>{m.type}</td>
                      <td>{m.supplierName}</td>
                      <td>
                        <span className={`badge ${m.isExpired ? 'bg-danger' : 'bg-success'}`}>
                          {m.isExpired ? 'Hết hạn' : 'Còn hạn'}
                        </span>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openModal(m)}>
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(m.id)}>
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Cập nhật thuốc' : 'Thêm thuốc mới'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Mã thuốc</Form.Label>
              <Form.Control value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên thuốc</Form.Label>
              <Form.Control value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại</Form.Label>
              <Form.Control value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ngày hết hạn</Form.Label>
              <Form.Control type="date" value={formData.expiryDate} onChange={e => setFormData({ ...formData, expiryDate: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nhà cung cấp</Form.Label>
              <Form.Select value={formData.supplierId} onChange={e => setFormData({ ...formData, supplierId: parseInt(e.target.value) })}>
                <option value="">-- Chọn nhà cung cấp --</option>
                {suppliers.map(s => (
                  <option key={s.supplierId} value={s.supplierId}>{s.supplierName}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
          <Button variant={editingId ? 'warning' : 'primary'} onClick={handleSave}>
            {editingId ? 'Cập nhật' : 'Lưu'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MedicineManagementPage;
