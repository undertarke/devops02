import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Alert, Tabs, Tab } from 'react-bootstrap';
import { FaListOl, FaUserSlash, FaUserMd, FaDoorOpen, FaBell, FaCheckCircle } from 'react-icons/fa';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../services/api';
import { toast } from 'react-toastify';

const WaitingListManagementPage = () => {
    const [waitingList, setWaitingList] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [waitingResponse, roomsResponse] = await Promise.all([
                api.get('/WaitingList'),
                api.get('/Room')
            ]);
            setWaitingList(waitingResponse.data);
            setRooms(roomsResponse.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Không thể tải dữ liệu');
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const patient = waitingList.find(p => p.id === id);
            if (!patient) return;

            const updatedPatient = { ...patient, status: newStatus };
            await api.put(`/WaitingList/${id}`, updatedPatient);
            toast.success('Cập nhật trạng thái thành công');
            fetchData();
            setShowModal(false);
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Không thể cập nhật trạng thái');
        }
    };

    const handleCallNext = async (doctorId, roomId) => {
        const waitingPatients = waitingList.filter(p => 
            p.doctorId === doctorId && 
            p.roomId === roomId && 
            p.status.toLowerCase() === 'waiting'
        );
        if (waitingPatients.length > 0) {
            const nextPatient = waitingPatients[0];
            await handleStatusUpdate(nextPatient.id, 'in_progress');
            // Hiển thị thông báo gọi bệnh nhân
            playCallingSound();
            toast.info(`Mời bệnh nhân số ${nextPatient.queueNumber} vào phòng khám`, {
                autoClose: false,
                position: "top-center"
            });
        }
    };

    const handleCompleteExamination = async (patientId) => {
        await handleStatusUpdate(patientId, 'completed');
        toast.success('Đã hoàn thành khám bệnh');
    };

    const handleRemove = async (id) => {
        try {
            await handleStatusUpdate(id, 'cancelled');
            toast.success('Đã hủy lịch khám');
        } catch (error) {
            console.error('Error removing patient:', error);
            toast.error('Không thể hủy lịch khám');
        }
    };

    const playCallingSound = () => {
        // Thêm âm thanh gọi số nếu cần
        const audio = new Audio('/notification-sound.mp3');
        audio.play();
    };

    const getStatusBadge = (status) => {
        if (!status) return 'secondary';
        switch (status.toLowerCase()) {
            case 'waiting':
                return <Badge bg="warning">Đang chờ</Badge>;
            case 'in_progress':
                return <Badge bg="primary">Đang khám</Badge>;
            case 'completed':
                return <Badge bg="success">Đã khám xong</Badge>;
            case 'cancelled':
                return <Badge bg="danger">Đã hủy</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    // Group patients by room and doctor
    const groupedByRoom = waitingList.reduce((acc, patient) => {
        const roomId = patient.roomId;
        const room = rooms.find(r => r.id === roomId) || { id: roomId, name: 'Chưa phân phòng' };
        
        if (!acc[roomId]) {
            acc[roomId] = {
                roomInfo: room,
                doctors: {}
            };
        }
        
        const doctorId = patient.doctorId;
        if (!acc[roomId].doctors[doctorId]) {
            acc[roomId].doctors[doctorId] = {
                doctorInfo: {
                    id: doctorId,
                    name: patient.doctorName || 'Chưa phân công'
                },
                patients: []
            };
        }
        
        acc[roomId].doctors[doctorId].patients.push(patient);
        return acc;
    }, {});

    if (loading) {
        return (
            <Container fluid className="p-4">
                <div className="text-center">
                    <LoadingSpinner />
                </div>
            </Container>
        );
    }

    return (
        <Container fluid className="p-4">
            <Row className="mb-4">
                <Col>
                    <h2 className="admin-page-title">
                        <FaListOl className="me-2" /> Quản lý danh sách chờ
                    </h2>
                </Col>
            </Row>

            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-4"
            >
                <Tab eventKey="all" title="Tất cả phòng">
                    {Object.keys(groupedByRoom).length === 0 ? (
                        <Alert variant="info">Danh sách chờ hiện đang trống.</Alert>
                    ) : (
                        Object.entries(groupedByRoom).map(([roomId, roomData]) => (
                            <div key={roomId} className="mb-4">
                                <h3 className="mb-3">
                                    <FaDoorOpen className="me-2" />
                                    {roomData.roomInfo.name}
                                </h3>
                                <Row>
                                    {Object.entries(roomData.doctors).map(([doctorId, doctorData]) => (
                                        <Col md={6} lg={4} key={doctorId} className="mb-4">
                                            <Card className="admin-card h-100 shadow-sm">
                                                <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                                                    <span className="fw-bold">
                                                        <FaUserMd className="me-2" />
                                                        {doctorData.doctorInfo.name}
                                                    </span>
                                                    <div>
                                                        <Button 
                                                            variant="primary" 
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => handleCallNext(doctorId, roomId)}
                                                            disabled={!doctorData.patients.some(p => p.status.toLowerCase() === 'waiting')}
                                                        >
                                                            <FaBell className="me-1" />
                                                            Gọi tiếp theo
                                                        </Button>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body className="p-0">
                                                    <Table hover responsive className="mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th className="ps-3">STT</th>
                                                                <th>Số thứ tự</th>
                                                                <th>Trạng thái</th>
                                                                <th className="text-center">Hành động</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {doctorData.patients.map((patient, index) => (
                                                                <tr 
                                                                    key={patient.id}
                                                                    className={patient.status.toLowerCase() === 'in_progress' ? 'table-primary' : ''}
                                                                >
                                                                    <td className="ps-3">{index + 1}</td>
                                                                    <td>{patient.queueNumber}</td>
                                                                    <td>{getStatusBadge(patient.status)}</td>
                                                                    <td className="text-center">
                                                                        {patient.status.toLowerCase() === 'waiting' && (
                                                                            <Button 
                                                                                variant="outline-danger" 
                                                                                size="sm"
                                                                                onClick={() => handleRemove(patient.id)}
                                                                                title="Hủy lịch khám"
                                                                            >
                                                                                <FaUserSlash />
                                                                            </Button>
                                                                        )}
                                                                        {patient.status.toLowerCase() === 'in_progress' && (
                                                                            <Button
                                                                                variant="outline-success"
                                                                                size="sm"
                                                                                onClick={() => handleCompleteExamination(patient.id)}
                                                                                title="Hoàn thành khám"
                                                                            >
                                                                                <FaCheckCircle className="me-1" />
                                                                                Hoàn thành
                                                                            </Button>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                                <Card.Footer className="bg-light">
                                                    <small className="text-muted">
                                                        Đang chờ: {doctorData.patients.filter(p => p.status.toLowerCase() === 'waiting').length} |
                                                        Đang khám: {doctorData.patients.filter(p => p.status.toLowerCase() === 'in_progress').length} |
                                                        Hoàn thành: {doctorData.patients.filter(p => p.status.toLowerCase() === 'completed').length}
                                                    </small>
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))
                    )}
                </Tab>
                {rooms.map(room => (
                    <Tab key={room.id} eventKey={`room-${room.id}`} title={room.name}>
                        {/* Hiển thị chi tiết cho từng phòng */}
                        {groupedByRoom[room.id] ? (
                            <Row>
                                {Object.entries(groupedByRoom[room.id].doctors).map(([doctorId, doctorData]) => (
                                    <Col md={6} lg={4} key={doctorId} className="mb-4">
                                        {/* Card giống như ở trên */}
                                        <Card className="admin-card h-100 shadow-sm">
                                            {/* ... Card content giống như ở trên ... */}
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Alert variant="info">Không có bệnh nhân trong phòng này.</Alert>
                        )}
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
};

export default WaitingListManagementPage;