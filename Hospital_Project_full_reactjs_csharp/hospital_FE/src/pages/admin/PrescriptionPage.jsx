import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../services/api';
import { toast } from 'react-toastify';

const PrescriptionPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [formData, setFormData] = useState({
        medicalRecordID: '',
        prescribedBy: '',
        createdAt: new Date().toISOString(),
        details: [{ medicineID: '', dosage: '', quantity: '', instructions: '' }]
    });

    useEffect(() => {
        fetchPrescriptions();
        fetchMedicines();
    }, []);

    const fetchPrescriptions = async () => {
        try {
            const response = await api.get('/prescriptions');
            setPrescriptions(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            toast.error('Không thể tải danh sách đơn thuốc');
            setLoading(false);
        }
    };

    const fetchMedicines = async () => {
        try {
            const response = await api.get('/medicines');
            setMedicines(response.data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
            toast.error('Không thể tải danh sách thuốc');
        }
    };

    const handleShowModal = (prescription = null) => {
        if (prescription) {
            setSelectedPrescription(prescription);
            setFormData({
                medicalRecordID: prescription.medicalRecordID,
                prescribedBy: prescription.prescribedBy,
                createdAt: prescription.createdAt,
                details: prescription.details || [{ medicineID: '', dosage: '', quantity: '', instructions: '' }]
            });
        } else {
            setSelectedPrescription(null);
            setFormData({
                medicalRecordID: '',
                prescribedBy: '',
                createdAt: new Date().toISOString(),
                details: [{ medicineID: '', dosage: '', quantity: '', instructions: '' }]
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPrescription(null);
        setFormData({
            medicalRecordID: '',
            prescribedBy: '',
            createdAt: new Date().toISOString(),
            details: [{ medicineID: '', dosage: '', quantity: '', instructions: '' }]
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDetailChange = (index, field, value) => {
        const newDetails = [...formData.details];
        newDetails[index] = {
            ...newDetails[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            details: newDetails
        }));
    };

    const addMedicineRow = () => {
        setFormData(prev => ({
            ...prev,
            details: [...prev.details, { medicineID: '', dosage: '', quantity: '', instructions: '' }]
        }));
    };

    const removeMedicineRow = (index) => {
        if (formData.details.length > 1) {
            const newDetails = formData.details.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                details: newDetails
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create prescription first
            const prescriptionResponse = await api.post('/prescriptions', {
                medicalRecordID: formData.medicalRecordID,
                prescribedBy: formData.prescribedBy,
                createdAt: formData.createdAt
            });

            // Then create prescription details
            const prescriptionId = prescriptionResponse.data.id;
            await Promise.all(formData.details.map(detail => 
                api.post('/prescriptiondetails', {
                    ...detail,
                    prescriptionID: prescriptionId
                })
            ));

            toast.success('Tạo đơn thuốc thành công');
            fetchPrescriptions();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving prescription:', error);
            toast.error('Không thể lưu đơn thuốc');
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
                <h1>Quản lý Đơn thuốc</h1>
                <Button variant="primary" onClick={() => handleShowModal()}>
                    Tạo đơn thuốc mới
                </Button>
            </div>
            <div className="admin-card">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Mã hồ sơ bệnh án</th>
                            <th>Bác sĩ kê đơn</th>
                            <th>Ngày tạo</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center p-3">
                                    <LoadingSpinner />
                                </td>
                            </tr>
                        ) : prescriptions.map(prescription => (
                            <tr key={prescription.id}>
                                <td>{prescription.id}</td>
                                <td>{prescription.medicalRecordID}</td>
                                <td>{prescription.prescribedBy}</td>
                                <td>{formatDate(prescription.createdAt)}</td>
                                <td className="text-center">
                                    <Button 
                                        variant="outline-info" 
                                        size="sm"
                                        onClick={() => handleShowModal(prescription)}
                                    >
                                        Xem chi tiết
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
                        {selectedPrescription ? 'Chi tiết đơn thuốc' : 'Tạo đơn thuốc mới'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mã hồ sơ bệnh án</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="medicalRecordID"
                                        value={formData.medicalRecordID}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Bác sĩ kê đơn</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="prescribedBy"
                                        value={formData.prescribedBy}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5>Chi tiết đơn thuốc</h5>
                                <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={addMedicineRow}
                                >
                                    Thêm thuốc
                                </Button>
                            </div>
                            
                            {formData.details.map((detail, index) => (
                                <div key={index} className="border rounded p-3 mb-3">
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Thuốc</Form.Label>
                                                <Form.Select
                                                    value={detail.medicineID}
                                                    onChange={(e) => handleDetailChange(index, 'medicineID', e.target.value)}
                                                    required
                                                >
                                                    <option value="">Chọn thuốc</option>
                                                    {medicines.map(medicine => (
                                                        <option key={medicine.id} value={medicine.id}>
                                                            {medicine.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Liều lượng</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={detail.dosage}
                                                    onChange={(e) => handleDetailChange(index, 'dosage', e.target.value)}
                                                    required
                                                    placeholder="VD: 1 viên/lần"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Số lượng</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={detail.quantity}
                                                    onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Hướng dẫn</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={detail.instructions}
                                                    onChange={(e) => handleDetailChange(index, 'instructions', e.target.value)}
                                                    required
                                                    placeholder="VD: Uống sau ăn"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {formData.details.length > 1 && (
                                        <div className="text-end">
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm"
                                                onClick={() => removeMedicineRow(index)}
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Hủy
                            </Button>
                            <Button variant="primary" type="submit">
                                {selectedPrescription ? 'Cập nhật' : 'Tạo mới'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PrescriptionPage;
