import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Pagination, Badge, Row, Col } from 'react-bootstrap';
import Avatar from '../../components/common/Avatar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FaUserMd, FaUserInjured, FaCalendarAlt, FaClock, FaStethoscope, FaInfoCircle, FaBirthdayCake, FaPhone, FaEnvelope } from 'react-icons/fa';
import { getAllAppointments } from '../../services/api';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AppointmentManagementPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const appointmentsPerPage = 5;

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await getAllAppointments();
            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error('Không thể tải danh sách lịch hẹn');
            setLoading(false);
        }
    };

    const handleShowModal = (appointment) => {
        setSelectedAppointment(appointment);
        setShowModal(true);
    };
    
    const handleCloseModal = () => setShowModal(false);

    const handleConfirmAppointment = async (id) => {
        try {
            await api.put(`/appointment/${id}/confirm`);
            toast.success('Xác nhận lịch hẹn thành công');
            fetchAppointments(); // Refresh the list
            handleCloseModal();
        } catch (error) {
            console.error('Error confirming appointment:', error);
            toast.error('Không thể xác nhận lịch hẹn');
        }
    };

    const handleCancelAppointment = async (id) => {
        try {
            await api.put(`/appointment/cancel/${id}`);
            toast.success('Hủy lịch hẹn thành công');
            fetchAppointments(); // Refresh the list
            handleCloseModal();
        } catch (error) {
            console.error('Error canceling appointment:', error);
            toast.error('Không thể hủy lịch hẹn');
        }
    };

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'primary';
            case 'completed': return 'success';
            case 'cancelled': return 'danger';
            case 'pending': return 'warning';
            default: return 'secondary';
        }
    };

    const getStatusText = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'Đã xác nhận';
            case 'completed': return 'Hoàn thành';
            case 'cancelled': return 'Đã hủy';
            case 'pending': return 'Chờ xác nhận';
            default: return status;
        }
    };

    const formatTime = (time) => {
        if (!time) return '';
        return time.substring(0, 5); // Format "HH:mm" from "HH:mm:ss"
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('vi-VN');
    };

    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
    const totalPages = Math.ceil(appointments.length / appointmentsPerPage);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="admin-header"><h1>Quản lý Lịch hẹn</h1></div>
            <div className="admin-card">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Mã lịch hẹn</th>
                            <th>Bệnh nhân</th>
                            <th>Bác sĩ</th>
                            <th>Ngày</th>
                            <th>Giờ</th>
                            <th className="text-center">Trạng thái</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="8" className="text-center p-3">
                                    <LoadingSpinner />
                                </td>
                            </tr>
                        ) : currentAppointments.map(apt => (
                            <tr key={apt.id}>
                                <td style={{ verticalAlign: 'middle' }}>{apt.id}</td>
                                <td style={{ verticalAlign: 'middle' }}>{apt.appointmentNo}</td>
                                <td style={{ verticalAlign: 'middle' }}>{apt.patientName}</td>
                                <td style={{ verticalAlign: 'middle' }}>{apt.doctorName}</td>
                                <td style={{ verticalAlign: 'middle' }}>{formatDate(apt.appointmentDate)}</td>
                                <td style={{ verticalAlign: 'middle' }}>
                                    {formatTime(apt.startTime)} - {formatTime(apt.endTime)}
                                </td>
                                <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                    <Badge bg={getStatusBadge(apt.status)}>{getStatusText(apt.status)}</Badge>
                                </td>
                                <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                    <Button variant="outline-info" size="sm" onClick={() => handleShowModal(apt)}>
                                        Xem chi tiết
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {totalPages > 1 && (
                    <Pagination className="justify-content-center">
                        {[...Array(totalPages).keys()].map(number => (
                            <Pagination.Item 
                                key={number + 1} 
                                active={number + 1 === currentPage} 
                                onClick={() => paginate(number + 1)}
                            >
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                )}
            </div>

            <AppointmentDetailModal 
                show={showModal} 
                onHide={handleCloseModal} 
                appointment={selectedAppointment}
                getStatusBadge={getStatusBadge}
                getStatusText={getStatusText}
                onConfirm={handleConfirmAppointment}
                onCancel={handleCancelAppointment}
                formatTime={formatTime}
                formatDate={formatDate}
            />
        </div>
    );
};

const AppointmentDetailModal = ({ 
    show, 
    onHide, 
    appointment, 
    getStatusBadge, 
    getStatusText,
    onConfirm,
    onCancel,
    formatTime,
    formatDate
}) => {
    if (!appointment) return null;

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết Lịch hẹn #{appointment.appointmentNo}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="appointment-modal-body">
                <Row className="g-4">
                    <Col xs={6} className="d-flex">
                        <div className="info-block h-100 w-100">
                            <div className="name">{appointment.patientName}</div>
                            <div className="specialty text-muted">
                                <FaUserInjured className="me-2" /> Bệnh nhân
                            </div>
                            <div className="info-block-detail">
                                <FaPhone /> ID: {appointment.patientId}
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} className="d-flex">
                        <div className="info-block h-100 w-100">
                            <div className="name">{appointment.doctorName}</div>
                            <div className="specialty text-muted">
                                <FaUserMd className="me-2" /> {appointment.specialization || 'Bác sĩ'}
                            </div>
                            <div className="info-block-detail">
                                <FaStethoscope /> ID: {appointment.doctorId}
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className="details-block mt-4">
                    <div className="detail-item">
                        <div className="detail-item-icon"><FaCalendarAlt /></div>
                        <div><strong>Ngày:</strong> {formatDate(appointment.appointmentDate)}</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-item-icon"><FaClock /></div>
                        <div>
                            <strong>Giờ:</strong> {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                        </div>
                    </div>
                    {appointment.note && (
                        <div className="detail-item">
                            <div className="detail-item-icon"><FaStethoscope /></div>
                            <div><strong>Ghi chú:</strong> {appointment.note}</div>
                        </div>
                    )}
                    <div className="detail-item">
                        <div className="detail-item-icon"><FaInfoCircle /></div>
                        <div>
                            <strong>Trạng thái:</strong>{' '}
                            <Badge bg={getStatusBadge(appointment.status)}>
                                {getStatusText(appointment.status)}
                            </Badge>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Đóng</Button>
                {appointment.status.toLowerCase() === 'pending' && (
                    <>
                        <Button variant="success" onClick={() => onConfirm(appointment.id)}>
                            Xác nhận
                        </Button>
                        <Button variant="danger" onClick={() => onCancel(appointment.id)}>
                            Hủy lịch
                        </Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default AppointmentManagementPage;