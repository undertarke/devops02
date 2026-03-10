import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getAllMedicalRecords, createMedicalRecord, updateMedicalRecord } from '../../services/api';
import { toast } from 'react-toastify';

const MedicalRecordPage = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [formData, setFormData] = useState({
        appointmentID: '',
        diagnosis: '',
        conclusion: '',
        createdAt: new Date().toISOString()
    });

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await getAllMedicalRecords();
            setRecords(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching medical records:', error);
            toast.error('Không thể tải danh sách hồ sơ bệnh án');
            setLoading(false);
        }
    };

    const handleShowModal = (record = null) => {
        if (record) {
            setSelectedRecord(record);
            setFormData({
                appointmentID: record.appointmentID,
                diagnosis: record.diagnosis,
                conclusion: record.conclusion,
                createdAt: record.createdAt
            });
        } else {
            setSelectedRecord(null);
            setFormData({
                appointmentID: '',
                diagnosis: '',
                conclusion: '',
                createdAt: new Date().toISOString()
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRecord(null);
        setFormData({
            appointmentID: '',
            diagnosis: '',
            conclusion: '',
            createdAt: new Date().toISOString()
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedRecord) {
                await updateMedicalRecord(selectedRecord.id, formData);
                toast.success('Cập nhật hồ sơ bệnh án thành công');
            } else {
                await createMedicalRecord(formData);
                toast.success('Tạo hồ sơ bệnh án thành công');
            }
            fetchRecords();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving medical record:', error);
            toast.error('Không thể lưu hồ sơ bệnh án');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            <div className="admin-header">
                <h1>Quản lý Hồ sơ bệnh án</h1>
                <Button variant="primary" onClick={() => handleShowModal()}>
                    Tạo hồ sơ mới
                </Button>
            </div>
            <div className="admin-card">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Mã lịch hẹn</th>
                            <th>Chẩn đoán</th>
                            <th>Kết luận</th>
                            <th>Ngày tạo</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center p-3">
                                    <LoadingSpinner />
                                </td>
                            </tr>
                        ) : records.map(record => (
                            <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.appointmentID}</td>
                                <td>{record.diagnosis}</td>
                                <td>{record.conclusion}</td>
                                <td>{formatDate(record.createdAt)}</td>
                                <td className="text-center">
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm" 
                                        className="me-2"
                                        onClick={() => handleShowModal(record)}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                    <Button 
                                        variant="outline-success" 
                                        size="sm"
                                        onClick={() => {/* Navigate to create prescription */}}
                                    >
                                        Tạo đơn thuốc
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedRecord ? 'Chỉnh sửa hồ sơ bệnh án' : 'Tạo hồ sơ bệnh án mới'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mã lịch hẹn</Form.Label>
                            <Form.Control
                                type="number"
                                name="appointmentID"
                                value={formData.appointmentID}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

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
                            <Form.Label>Kết luận</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="conclusion"
                                value={formData.conclusion}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Hủy
                            </Button>
                            <Button variant="primary" type="submit">
                                {selectedRecord ? 'Cập nhật' : 'Tạo mới'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default MedicalRecordPage;
