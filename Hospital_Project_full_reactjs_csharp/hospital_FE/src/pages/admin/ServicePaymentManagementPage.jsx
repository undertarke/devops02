import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form } from 'react-bootstrap';
import { FaMoneyBillWave, FaSearch, FaFileInvoice } from 'react-icons/fa';
import ServicePaymentModal from '../../components/common/ServicePaymentModal';
import InvoiceModal from '../../components/common/InvoiceModal';

// Mock data for service payments
const initialPayments = [
    {
        id: 1,
        patientId: 'PT201',
        patientName: 'Peter Jones',
        phone: '0901234567',
        doctorId: 'DR101',
        doctorName: 'Dr. John Smith',
        department: 'Khoa Nội',
        servicePackage: 'Deluxe Package',
        amount: 103.40,
        date: '2024-03-15',
        status: 'Pending',
        paymentMethod: null
    },
    {
        id: 2,
        patientId: 'PT202',
        patientName: 'Mary White',
        phone: '0907654321',
        doctorId: 'DR102',
        doctorName: 'Dr. Sarah Johnson',
        department: 'Khoa Tim mạch',
        servicePackage: 'Standard Package',
        amount: 56.95,
        date: '2024-03-18',
        status: 'Paid',
        paymentMethod: 'Credit Card'
    }
];

const ServicePaymentManagementPage = () => {
    const [payments, setPayments] = useState(initialPayments);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [currentPayment, setCurrentPayment] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const handleShowPaymentModal = (payment) => {
        setCurrentPayment(payment);
        setShowPaymentModal(true);
    };

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false);
        setCurrentPayment(null);
    };

    const handleShowInvoiceModal = (payment) => {
        setCurrentPayment(payment);
        setShowInvoiceModal(true);
    };

    const handleCloseInvoiceModal = () => {
        setShowInvoiceModal(false);
        setCurrentPayment(null);
    };

    const handleProcessPayment = async (values) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setPayments(payments.map(payment => {
                if (payment.id === currentPayment.id) {
                    return {
                        ...payment,
                        status: 'Paid',
                        paymentMethod: values.paymentMethod
                    };
                }
                return payment;
            }));

            handleClosePaymentModal();
            handleShowInvoiceModal(currentPayment);
        } catch (error) {
            console.error('Payment processing error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Paid':
                return <Badge bg="success">Đã thanh toán</Badge>;
            case 'Pending':
                return <Badge bg="warning" text="dark">Chưa thanh toán</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    const filteredPayments = payments.filter(payment =>
        payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.servicePackage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container fluid className="p-4">
            <Row className="mb-4">
                <Col>
                    <h2 className="admin-page-title">
                        <FaMoneyBillWave className="me-2" /> Quản lý thanh toán dịch vụ
                    </h2>
                </Col>
            </Row>

            <Card className="admin-card">
                <Card.Header>
                    <Row className="align-items-center">
                        <Col>
                            <span>Danh sách thanh toán dịch vụ</span>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="d-flex align-items-center">
                                <FaSearch className="position-absolute ms-3" />
                                <Form.Control
                                    type="text"
                                    placeholder="Tìm kiếm theo tên bệnh nhân, bác sĩ hoặc dịch vụ..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="ps-5"
                                />
                            </div>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Table responsive hover className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mã BN</th>
                                <th>Tên bệnh nhân</th>
                                <th>Bác sĩ phụ trách</th>
                                <th>Khoa</th>
                                <th>Gói dịch vụ</th>
                                <th>Số tiền</th>
                                <th>Ngày</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map((payment, index) => (
                                <tr key={payment.id}>
                                    <td>{index + 1}</td>
                                    <td>{payment.patientId}</td>
                                    <td>{payment.patientName}</td>
                                    <td>{payment.doctorName}</td>
                                    <td>{payment.department}</td>
                                    <td>{payment.servicePackage}</td>
                                    <td>${payment.amount.toFixed(2)}</td>
                                    <td>{payment.date}</td>
                                    <td>{getStatusBadge(payment.status)}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleShowPaymentModal(payment)}
                                            disabled={payment.status === 'Paid'}
                                        >
                                            Thanh toán
                                        </Button>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => handleShowInvoiceModal(payment)}
                                        >
                                            <FaFileInvoice /> Hóa đơn
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Payment Modal */}
            <ServicePaymentModal
                visible={showPaymentModal}
                onCancel={handleClosePaymentModal}
                onOk={handleProcessPayment}
                title="Thanh toán dịch vụ"
                totalAmount={currentPayment?.amount}
                paymentData={currentPayment}
                loading={loading}
            />

            {/* Invoice Modal */}
            <InvoiceModal
                visible={showInvoiceModal}
                onCancel={handleCloseInvoiceModal}
                title="Hóa đơn dịch vụ"
                paymentData={{
                    ...currentPayment,
                    serviceInfo: {
                        name: currentPayment?.servicePackage,
                        amount: currentPayment?.amount
                    }
                }}
                simpleInvoice={true}
            />
        </Container>
    );
};

export default ServicePaymentManagementPage; 