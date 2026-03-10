import React from 'react';
import { Modal, Typography, Row, Col, Table, Button, Divider } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const InvoiceModal = ({ 
    visible, 
    onCancel, 
    invoiceData,
    onPrint 
}) => {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            width: 70,
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
            title={<Title level={4}>Hóa đơn chi tiết</Title>}
            open={visible}
            onCancel={onCancel}
            width={800}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Đóng
                </Button>,
                <Button 
                    key="print" 
                    type="primary" 
                    icon={<PrinterOutlined />}
                    onClick={onPrint}
                >
                    In hóa đơn
                </Button>
            ]}
        >
            <div style={{ padding: '20px' }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={3}>BỆNH VIỆN ABC</Title>
                        <Text>Địa chỉ: 123 Đường XYZ, Quận ABC</Text><br />
                        <Text>Điện thoại: (028) 1234 5678</Text>
                    </Col>
                    <Col>
                        <Text strong>Số hóa đơn: </Text>
                        <Text>{invoiceData?.invoiceNumber}</Text><br />
                        <Text strong>Ngày: </Text>
                        <Text>{new Date().toLocaleDateString('vi-VN')}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Text strong>Tên bệnh nhân: </Text>
                        <Text>{invoiceData?.patientName}</Text><br />
                        <Text strong>Mã bệnh nhân: </Text>
                        <Text>{invoiceData?.patientId}</Text>
                    </Col>
                    <Col span={12}>
                        <Text strong>Bác sĩ: </Text>
                        <Text>{invoiceData?.doctorName}</Text><br />
                        <Text strong>Khoa: </Text>
                        <Text>{invoiceData?.department}</Text>
                    </Col>
                </Row>

                <Divider />

                <Table 
                    columns={columns} 
                    dataSource={invoiceData?.items} 
                    pagination={false}
                    bordered
                    summary={(pageData) => {
                        const total = pageData.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
                        return (
                            <>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={4} align="right">
                                        <Text strong>Tổng cộng:</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>
                                        <Text strong style={{ color: '#1890ff' }}>
                                            {total?.toLocaleString('vi-VN')} VNĐ
                                        </Text>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        );
                    }}
                />

                <Row justify="end" style={{ marginTop: '20px' }}>
                    <Col>
                        <Text strong>Phương thức thanh toán: </Text>
                        <Text>{invoiceData?.paymentMethod === 'cash' ? 'Tiền mặt' : 'Thẻ'}</Text>
                    </Col>
                </Row>

                <Divider dashed />

                <Row justify="center" style={{ marginTop: '20px' }}>
                    <Col>
                        <Text italic>Cảm ơn quý khách đã sử dụng dịch vụ!</Text>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default InvoiceModal; 