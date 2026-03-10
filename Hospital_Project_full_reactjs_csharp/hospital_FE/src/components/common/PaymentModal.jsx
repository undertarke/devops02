import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Row, Col, Typography, Table, Radio, Card, Divider, QRCode } from 'antd';
import { DollarOutlined, UserOutlined, FileTextOutlined, BankOutlined, QrcodeOutlined, CreditCardOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const PaymentModal = ({ 
    visible, 
    onCancel, 
    onOk, 
    title, 
    totalAmount, 
    paymentData,
    loading 
}) => {
    const [form] = Form.useForm();
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [qrValue, setQrValue] = useState('');

    useEffect(() => {
        if (visible) {
            const randomQR = generateRandomQRData();
            setQrValue(randomQR);
        }
    }, [visible]);

    const generateRandomQRData = () => {
        const bankInfo = {
            bankName: "BIDV",
            accountNumber: "31410001234567",
            accountName: "BENH VIEN DA KHOA",
            amount: totalAmount,
            content: `PAY-${paymentData?.patientId}-${Date.now()}`
        };
        return JSON.stringify(bankInfo);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onOk({ ...values, totalAmount, paymentMethod });
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const renderPaymentMethodContent = () => {
        switch (paymentMethod) {
            case 'cash':
                return (
                    <Form.Item
                        name="receivedAmount"
                        label={<Text strong>Số tiền nhận từ bệnh nhân</Text>}
                        rules={[{ required: true, message: 'Vui lòng nhập số tiền nhận từ bệnh nhân' }]}
                    >
                        <Input 
                            prefix="₫"
                            size="large"
                            type="number"
                            placeholder="Nhập số tiền nhận từ bệnh nhân"
                            style={{ fontSize: '16px' }}
                        />
                    </Form.Item>
                );
            case 'card':
                return (
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="cardNumber"
                                label={<Text strong>4 số cuối thẻ</Text>}
                                rules={[{ required: true, message: 'Vui lòng nhập 4 số cuối thẻ' }]}
                            >
                                <Input 
                                    prefix={<CreditCardOutlined />}
                                    size="large"
                                    maxLength={4}
                                    placeholder="XXXX"
                                    style={{ fontSize: '16px' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="posId"
                                label={<Text strong>Mã máy POS</Text>}
                                rules={[{ required: true, message: 'Vui lòng nhập mã máy POS' }]}
                            >
                                <Input 
                                    prefix={<BankOutlined />}
                                    size="large"
                                    placeholder="Nhập mã máy POS"
                                    style={{ fontSize: '16px' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                );
            case 'transfer':
                return (
                    <Row justify="space-around" align="middle" style={{ marginTop: '20px' }}>
                        <Col span={10} style={{ textAlign: 'center' }}>
                            <QRCode
                                value={qrValue}
                                size={200}
                                style={{ margin: '20px 0' }}
                            />
                        </Col>
                        <Col span={14}>
                            <div style={{ 
                                background: '#f5f5f5', 
                                padding: '24px', 
                                borderRadius: '8px',
                                height: '240px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Text strong style={{ fontSize: '18px', display: 'block', marginBottom: '20px', color: '#1890ff' }}>
                                    Thông tin chuyển khoản
                                </Text>
                                <Row style={{ marginBottom: '12px' }}>
                                    <Col span={8}>
                                        <Text style={{ fontSize: '15px' }}>Ngân hàng:</Text>
                                    </Col>
                                    <Col span={16}>
                                        <Text strong style={{ fontSize: '15px' }}>BIDV</Text>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '12px' }}>
                                    <Col span={8}>
                                        <Text style={{ fontSize: '15px' }}>Số tài khoản:</Text>
                                    </Col>
                                    <Col span={16}>
                                        <Text strong copyable style={{ fontSize: '15px' }}>31410001234567</Text>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '12px' }}>
                                    <Col span={8}>
                                        <Text style={{ fontSize: '15px' }}>Tên tài khoản:</Text>
                                    </Col>
                                    <Col span={16}>
                                        <Text strong style={{ fontSize: '15px' }}>BENH VIEN DA KHOA</Text>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '12px' }}>
                                    <Col span={8}>
                                        <Text style={{ fontSize: '15px' }}>Số tiền:</Text>
                                    </Col>
                                    <Col span={16}>
                                        <Text strong type="danger" style={{ fontSize: '15px' }}>
                                            {totalAmount?.toLocaleString('vi-VN')} VNĐ
                                        </Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Text style={{ fontSize: '15px' }}>Nội dung CK:</Text>
                                    </Col>
                                    <Col span={16}>
                                        <Text strong copyable style={{ fontSize: '15px' }}>
                                            PAY-{paymentData?.patientId}
                                        </Text>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                );
            default:
                return null;
        }
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            width: 60,
            render: (_, __, index) => index + 1
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            width: 150,
            render: (price) => `${price?.toLocaleString('vi-VN')} VNĐ`
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            key: 'total',
            width: 150,
            render: (_, record) => `${(record.quantity * record.unitPrice)?.toLocaleString('vi-VN')} VNĐ`
        }
    ];

    return (
        <Modal
            title={<Title level={4} style={{ margin: 0, fontSize: '20px' }}>{title}</Title>}
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel} size="large">
                    Hủy
                </Button>,
                <Button 
                    key="submit" 
                    type="primary" 
                    icon={<DollarOutlined />}
                    loading={loading}
                    onClick={handleSubmit}
                    size="large"
                >
                    Xác nhận thanh toán
                </Button>
            ]}
            width={900}
        >
            <div style={{ padding: '20px' }}>
                <Row gutter={[24, 24]}>
                    {/* Thông tin bệnh nhân */}
                    <Col span={12}>
                        <Card 
                            title={
                                <Text strong style={{ fontSize: '16px' }}>
                                    <UserOutlined /> Thông tin bệnh nhân
                                </Text>
                            } 
                            bordered={false}
                        >
                            <Form.Item label={<Text strong>Mã bệnh nhân</Text>}>
                                <Input value={paymentData?.patientId} disabled size="large" />
                            </Form.Item>
                            <Form.Item label={<Text strong>Tên bệnh nhân</Text>}>
                                <Input value={paymentData?.patientName} disabled size="large" />
                            </Form.Item>
                            <Form.Item label={<Text strong>Số điện thoại</Text>}>
                                <Input value={paymentData?.phone || '0123456789'} disabled size="large" />
                            </Form.Item>
                        </Card>
                    </Col>

                    {/* Thông tin bác sĩ */}
                    <Col span={12}>
                        <Card 
                            title={
                                <Text strong style={{ fontSize: '16px' }}>
                                    <UserOutlined /> Thông tin bác sĩ
                                </Text>
                            } 
                            bordered={false}
                        >
                            <Form.Item label={<Text strong>Bác sĩ phụ trách</Text>}>
                                <Input value={paymentData?.doctorName} disabled size="large" />
                            </Form.Item>
                            <Form.Item label={<Text strong>Khoa</Text>}>
                                <Input value={paymentData?.department} disabled size="large" />
                            </Form.Item>
                            <Form.Item label={<Text strong>Ngày khám</Text>}>
                                <Input value={paymentData?.date} disabled size="large" />
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>

                <Divider />

                {/* Chi tiết thanh toán */}
                <Card 
                    title={
                        <Text strong style={{ fontSize: '16px' }}>
                            <FileTextOutlined /> Chi tiết thanh toán
                        </Text>
                    } 
                    bordered={false}
                >
                    <Table 
                        columns={columns} 
                        dataSource={paymentData?.items} 
                        pagination={false}
                        bordered
                        summary={(pageData) => {
                            const total = pageData?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) || 0;
                            return (
                                <>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={4} align="right">
                                            <Text strong style={{ fontSize: '15px' }}>Tổng cộng:</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1}>
                                            <Text strong type="danger" style={{ fontSize: '15px' }}>
                                                {total.toLocaleString('vi-VN')} VNĐ
                                            </Text>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </>
                            );
                        }}
                    />
                </Card>

                <Divider />

                {/* Phương thức thanh toán */}
                <Card 
                    title={
                        <Text strong style={{ fontSize: '16px' }}>
                            <DollarOutlined /> Phương thức thanh toán
                        </Text>
                    } 
                    bordered={false}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="paymentMethod"
                            rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
                        >
                            <Radio.Group 
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                value={paymentMethod}
                                style={{ width: '100%', marginBottom: '20px' }}
                            >
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Radio.Button 
                                            value="cash" 
                                            style={{ 
                                                width: '100%', 
                                                height: '45px', 
                                                textAlign: 'center', 
                                                lineHeight: '45px',
                                                fontSize: '15px'
                                            }}
                                        >
                                            <DollarOutlined /> Tiền mặt
                                        </Radio.Button>
                                    </Col>
                                    <Col span={8}>
                                        <Radio.Button 
                                            value="card" 
                                            style={{ 
                                                width: '100%', 
                                                height: '45px', 
                                                textAlign: 'center', 
                                                lineHeight: '45px',
                                                fontSize: '15px'
                                            }}
                                        >
                                            <CreditCardOutlined /> Thẻ ngân hàng
                                        </Radio.Button>
                                    </Col>
                                    <Col span={8}>
                                        <Radio.Button 
                                            value="transfer" 
                                            style={{ 
                                                width: '100%', 
                                                height: '45px', 
                                                textAlign: 'center', 
                                                lineHeight: '45px',
                                                fontSize: '15px'
                                            }}
                                        >
                                            <QrcodeOutlined /> Chuyển khoản
                                        </Radio.Button>
                                    </Col>
                                </Row>
                            </Radio.Group>
                        </Form.Item>

                        {renderPaymentMethodContent()}

                        <Form.Item
                            name="note"
                            label={<Text strong>Ghi chú</Text>}
                        >
                            <Input.TextArea 
                                rows={3} 
                                placeholder="Nhập ghi chú nếu cần..."
                                style={{ fontSize: '15px' }}
                            />
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Modal>
    );
};

export default PaymentModal; 