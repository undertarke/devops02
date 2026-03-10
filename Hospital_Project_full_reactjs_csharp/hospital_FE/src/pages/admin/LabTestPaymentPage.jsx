import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, message, Card, Tag, Typography } from 'antd';
import { SearchOutlined, DollarOutlined, PrinterOutlined, FileTextOutlined, PlusOutlined } from '@ant-design/icons';
import PaymentModal from '../../components/common/PaymentModal';
import InvoiceModal from '../../components/common/InvoiceModal';

const { Title } = Typography;

const LabTestPaymentPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);
    const [invoiceModalVisible, setInvoiceModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    // Mock data - thay thế bằng API call thực tế
    useEffect(() => {
        setData([
            {
                id: 1,
                testRequestId: 'LAB001',
                patientId: 'PT001',
                patientName: 'Nguyễn Văn A',
                phone: '0901234567',
                doctorName: 'Dr. Trần B',
                department: 'Khoa Xét nghiệm',
                date: '2024-03-20',
                totalAmount: 2500000,
                status: 'unpaid',
                items: [
                    { id: 1, name: 'Xét nghiệm máu tổng quát', quantity: 1, unitPrice: 850000 },
                    { id: 2, name: 'Xét nghiệm chức năng gan', quantity: 1, unitPrice: 950000 },
                    { id: 3, name: 'Xét nghiệm đường huyết', quantity: 1, unitPrice: 700000 }
                ]
            },
            {
                id: 2,
                testRequestId: 'LAB002',
                patientId: 'PT002',
                patientName: 'Lê Thị B',
                phone: '0907654321',
                doctorName: 'Dr. Nguyễn C',
                department: 'Khoa Tim mạch',
                date: '2024-03-20',
                totalAmount: 3500000,
                status: 'unpaid',
                items: [
                    { id: 1, name: 'Siêu âm tim', quantity: 1, unitPrice: 1500000 },
                    { id: 2, name: 'Điện tâm đồ', quantity: 1, unitPrice: 500000 },
                    { id: 3, name: 'Xét nghiệm men tim', quantity: 1, unitPrice: 1500000 }
                ]
            },
            {
                id: 3,
                testRequestId: 'LAB003',
                patientId: 'PT003',
                patientName: 'Phạm Văn C',
                phone: '0909876543',
                doctorName: 'Dr. Lê D',
                department: 'Khoa Nội tiết',
                date: '2024-03-21',
                totalAmount: 2800000,
                status: 'paid',
                items: [
                    { id: 1, name: 'Xét nghiệm nội tiết tố', quantity: 1, unitPrice: 1800000 },
                    { id: 2, name: 'Xét nghiệm tuyến giáp', quantity: 1, unitPrice: 1000000 }
                ]
            }
        ]);
    }, []);

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const handlePayment = async (values) => {
        setLoading(true);
        try {
            // Gọi API thanh toán
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Cập nhật trạng thái local
            setData(prevData => 
                prevData.map(item => 
                    item.id === selectedRecord.id 
                        ? { ...item, status: 'paid' }
                        : item
                )
            );
            
            message.success('Thanh toán thành công!');
            setPaymentModalVisible(false);
            setInvoiceModalVisible(true);
        } catch (error) {
            message.error('Thanh toán thất bại!');
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const expandedRowRender = (record) => {
        const columns = [
            {
                title: 'STT',
                key: 'index',
                width: '5%',
                render: (_, __, index) => index + 1,
            },
            {
                title: 'Tên xét nghiệm',
                dataIndex: 'name',
                key: 'name',
                width: '40%',
            },
            {
                title: 'Số lượng',
                dataIndex: 'quantity',
                key: 'quantity',
                width: '15%',
            },
            {
                title: 'Đơn giá',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
                width: '20%',
                render: (price) => `${price?.toLocaleString('vi-VN')} VNĐ`,
            },
            {
                title: 'Thành tiền',
                key: 'total',
                width: '20%',
                render: (_, record) => `${(record.quantity * record.unitPrice)?.toLocaleString('vi-VN')} VNĐ`,
            },
        ];

        return (
            <Table
                columns={columns}
                dataSource={record.items}
                pagination={false}
                bordered
                size="small"
            />
        );
    };

    const columns = [
        {
            title: 'Mã xét nghiệm',
            dataIndex: 'testRequestId',
            key: 'testRequestId',
            width: '12%',
        },
        {
            title: 'Tên bệnh nhân',
            dataIndex: 'patientName',
            key: 'patientName',
            width: '20%',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record.patientName)
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                    String(record.testRequestId)
                        .toLowerCase()
                        .includes(value.toLowerCase());
            },
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'doctorName',
            key: 'doctorName',
            width: '15%',
        },
        {
            title: 'Khoa',
            dataIndex: 'department',
            key: 'department',
            width: '15%',
        },
        {
            title: 'Ngày yêu cầu',
            dataIndex: 'date',
            key: 'date',
            width: '12%',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: '13%',
            render: (amount) => (
                <span style={{ color: '#1890ff', fontWeight: 'bold' }}>
                    {amount?.toLocaleString('vi-VN')} VNĐ
                </span>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '13%',
            render: (status) => (
                <Tag color={status === 'paid' ? 'success' : 'error'}>
                    {status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            fixed: false,
            width: '15%',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<DollarOutlined />}
                        onClick={() => {
                            setSelectedRecord(record);
                            setPaymentModalVisible(true);
                        }}
                        disabled={record.status === 'paid'}
                    >
                        Thanh toán
                    </Button>
                    <Button
                        icon={<FileTextOutlined />}
                        onClick={() => {
                            setSelectedRecord(record);
                            setInvoiceModalVisible(true);
                        }}
                    >
                        Hóa đơn
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Title level={2} style={{ marginBottom: '20px' }}>
                    <DollarOutlined /> Quản lý thanh toán xét nghiệm
                </Title>

                <Space style={{ marginBottom: 16 }}>
                    <Input.Search
                        placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã xét nghiệm"
                        prefix={<SearchOutlined />}
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 400 }}
                        allowClear
                    />
                </Space>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    loading={loading}
                    expandable={{
                        expandedRowRender,
                        expandIcon: ({ expanded, onExpand, record }) => (
                            <Button 
                                type="text" 
                                icon={<PlusOutlined rotate={expanded ? 45 : 0} />}
                                onClick={e => onExpand(record, e)}
                                style={{ transition: '0.3s' }}
                            />
                        )
                    }}
                    pagination={{
                        total: data.length,
                        pageSize: 10,
                        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} xét nghiệm`,
                        showSizeChanger: true,
                        showQuickJumper: true
                    }}
                    style={{ width: '100%' }}
                />

                <PaymentModal
                    visible={paymentModalVisible}
                    onCancel={() => setPaymentModalVisible(false)}
                    onOk={handlePayment}
                    title="Thanh toán xét nghiệm"
                    totalAmount={selectedRecord?.totalAmount}
                    paymentData={selectedRecord}
                    loading={loading}
                />

                <InvoiceModal
                    visible={invoiceModalVisible}
                    onCancel={() => setInvoiceModalVisible(false)}
                    invoiceData={{
                        ...selectedRecord,
                        invoiceNumber: `INV${selectedRecord?.id.toString().padStart(6, '0')}`,
                    }}
                    onPrint={handlePrint}
                />
            </Card>
        </div>
    );
};

export default LabTestPaymentPage; 