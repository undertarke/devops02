import React, { useState, useEffect } from "react";
import { Card, Table, Badge } from 'react-bootstrap';
import { FaFileInvoice, FaCalendarAlt, FaClock, FaUserMd, FaMapMarkerAlt, FaStethoscope } from 'react-icons/fa';

const InvoicePreview = ({ 
  selectedPackage, 
  doctorDetails, 
  branchDetails, 
  selectedDate, 
  selectedSlot,
  patientInfo 
}) => {

useEffect(() => {
  console.log("📋 InvoicePreview nhận selectedPackage:", selectedPackage);
  console.log("📋 InvoicePreview services:", selectedPackage?.services);
}, [selectedPackage]);


  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeSlot) => {
    if (!timeSlot) return '';
    return `${timeSlot.startTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })} - ${timeSlot.endTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })}`;
  };

  if (!selectedPackage || !doctorDetails || !selectedDate || !selectedSlot) {
    return null;
  }

  return (
    <Card className="mb-4 invoice-preview">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">
          <FaFileInvoice className="me-2" />
          Preview Hóa Đơn
        </h5>
      </Card.Header>
      <Card.Body>
        {/* Thông tin bệnh viện */}
        <div className="text-center mb-4">
          <h4 className="text-primary fw-bold">BỆNH VIỆN ĐA KHOA</h4>
          <p className="mb-0">123 Arling, Miola, NY</p> 
          <p className="mb-0">Điện thoại: (+487) 384 9452</p>
        </div>

        <hr />

        {/* Thông tin bệnh nhân */}
        <div className="row mb-4">
          <div className="col-md-6">
            <h6 className="text-primary mb-3">Thông tin bệnh nhân</h6>
            <p className="mb-1"><strong>Họ tên:</strong> {patientInfo?.fullName || 'N/A'}</p>
            <p className="mb-1"><strong>Số điện thoại:</strong> {patientInfo?.phone || 'N/A'}</p>
            <p className="mb-1"><strong>Email:</strong> {patientInfo?.email || 'N/A'}</p>
          </div>
          <div className="col-md-6">
            <h6 className="text-primary mb-3">Thông tin cuộc hẹn</h6>
            <p className="mb-1">
              <FaCalendarAlt className="me-2 text-primary" />
              <strong>Ngày khám:</strong> {formatDate(selectedDate)}
            </p>
            <p className="mb-1">
              <FaClock className="me-2 text-primary" />
              <strong>Giờ khám:</strong> {formatTime(selectedSlot)}
            </p>
            <p className="mb-1">
              <FaUserMd className="me-2 text-primary" />
              <strong>Bác sĩ:</strong> Dr. {doctorDetails.fullName}
            </p>
            <p className="mb-1">
              <FaMapMarkerAlt className="me-2 text-primary" />
              <strong>Chi nhánh:</strong> {branchDetails?.name || 'N/A'}
            </p>
          </div>
        </div>

        <hr />

        {/* Chi tiết gói dịch vụ */}
        <div className="mb-4">
          <h6 className="text-primary mb-3">
            <FaStethoscope className="me-2" />
            Chi tiết gói dịch vụ: {selectedPackage.name}
          </h6>
          
          <div className="invoice-table-responsive">
            <Table bordered hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th width="60%">Tên dịch vụ</th>
                  <th width="15%" className="text-center">Số lượng</th>
                  <th width="25%" className="text-end">Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                {selectedPackage.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemName}</td>
                    <td className="text-center">1</td>
                    <td className="text-end">{formatPrice(item.itemPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        {/* Tổng cộng */}
        <div className="border-top pt-3">
          <div className="row">
            <div className="col-md-8">
              <div className="d-flex align-items-center">
                <Badge bg="success" className="me-2">
                  Gói khuyến mãi
                </Badge>
                <span className="text-muted">Tiết kiệm so với đặt dịch vụ riêng lẻ</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-end">
                <div className="d-flex justify-content-between mb-2">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(selectedPackage.items.reduce((sum, item) => sum + item.itemPrice, 0))}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Giảm giá gói:</span>
                  <span className="text-success">
                    -{formatPrice(selectedPackage.items.reduce((sum, item) => sum + item.itemPrice  , 0) - selectedPackage.price)}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong className="h5">Tổng cộng:</strong>
                  <strong className="h5 text-primary">{formatPrice(selectedPackage.price)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lưu ý */}
        <div className="mt-4 p-3 bg-light rounded">
          <h6 className="text-warning mb-2">Lưu ý quan trọng:</h6>
          <ul className="mb-0 text-muted">
            <li>Vui lòng có mặt trước 15 phút để làm thủ tục.</li>
            <li>Mang theo CMND/CCCD và thẻ bảo hiểm y tế (nếu có).</li>
            <li>Thanh toán có thể thực hiện bằng tiền mặt hoặc thẻ.</li>
            <li>Để hủy/thay đổi lịch hẹn, vui lòng liên hệ trước 24 giờ.</li>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};

export default InvoicePreview; 