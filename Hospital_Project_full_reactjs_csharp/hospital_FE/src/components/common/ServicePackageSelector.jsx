import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Collapse } from 'react-bootstrap';
import { FaCheck, FaChevronDown, FaChevronUp, FaStethoscope } from 'react-icons/fa';
import api from '../../services/api';
import LoadingSpinner from './LoadingSpinner';

const ServicePackageSelector = ({ selectedPackage, onSelectPackage, disabled = false }) => {
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [servicePackages, setServicePackages] = useState([]);

  const packageIds = [1, 2, 3, 4];

  useEffect(() => {
    fetchServicePackageDetail();
  }, []);

  const fetchServicePackageDetail = async () => {
    try {
      setLoading(true);
      const requests = packageIds.map((id) => api.get(`/MedicalPackage/details/${id}`));
      const responses = await Promise.all(requests);
      const packages = responses.map(res => res.data);
      setServicePackages(packages);
    } catch (error) {
      console.error('Lỗi khi tải chi tiết gói dịch vụ:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
  };

  const toggleExpanded = (packageId) => {
    setExpandedPackage(expandedPackage === packageId ? null : packageId);
  };

  const handleSelectPackage = (pkg) => {
    if (!disabled) {
      onSelectPackage(pkg);
    }
  };

  if (loading) {
    return (
      <Card className="mb-4">
        <Card.Body className="text-center">
          <LoadingSpinner />
          <p className="mt-2">Đang tải thông tin gói dịch vụ...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">
          <FaStethoscope className="me-2" />
          Chọn gói dịch vụ
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="service-packages-grid">
        {servicePackages.map((servicePackage) => (
          <Card
            key={servicePackage.id}
            className={`h-100 service-package-card ${
              selectedPackage?.id === servicePackage.id ? 'border-primary selected' : ''
            } ${servicePackage.isRecommended ? 'recommended' : ''} ${disabled ? 'disabled' : ''}`}
            style={{
              cursor: disabled ? 'not-allowed' : 'pointer',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}
            onClick={() => handleSelectPackage(servicePackage)}
          >
            {servicePackage.isRecommended && (
              <Badge
                bg="primary"
                className="position-absolute top-0 start-50 translate-middle px-3 py-2"
                style={{ zIndex: 1 }}
              >
                Khuyến nghị
              </Badge>
            )}

            <Card.Body
              className={`text-center ${
                servicePackage.isRecommended ? 'bg-primary text-white' : ''
              }`}
            >
              <h6 className="mb-3">{servicePackage.name}</h6>
              <h3 className="fw-bold mb-4">{formatPrice(servicePackage.price)}</h3>

              <div className="service-list mb-3">
                {servicePackage.items?.slice(0, 4).map((item, index) => (
                  <p key={index} className="mb-2">
                    <FaCheck className="me-2" />
                    {item.itemName}
                  </p>
                ))}
                {servicePackage.items?.length > 4 && (
                  <p className="mb-2">
                    <FaCheck className="me-2" />
                    Và {servicePackage.items.length - 4} dịch vụ khác
                  </p>
                )}
              </div>

              <Button
                variant={servicePackage.isRecommended ? 'light' : 'primary'}
                className={`mb-3 w-100 ${servicePackage.isRecommended ? 'text-primary' : ''}`}
                disabled={disabled}
              >
                {selectedPackage?.id === servicePackage.id ? 'Đã chọn' : 'Chọn gói này'}
              </Button>

              <Button
                variant="link"
                size="sm"
                className={`p-0 ${servicePackage.isRecommended ? 'text-white' : 'text-primary'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded(servicePackage.id);
                }}
                disabled={disabled}
              >
                Chi tiết gói{' '}
                {expandedPackage === servicePackage.id ? (
                  <FaChevronUp className="ms-1" />
                ) : (
                  <FaChevronDown className="ms-1" />
                )}
              </Button>

              <Collapse in={expandedPackage === servicePackage.id}>
                <div className="mt-3">
                  <hr className={servicePackage.isRecommended ? 'text-white' : ''} />
                  <h6 className="mb-3">Chi tiết giá dịch vụ:</h6>
                  {servicePackage.items?.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between mb-2">
                      <span className="text-start">{item.itemName}</span>
                      <span className="fw-bold">{formatPrice(item.itemPrice)}</span>
                    </div>
                  ))}
                  <hr className={servicePackage.isRecommended ? 'text-white' : ''} />
                  <div className="d-flex justify-content-between">
                    <strong>Tổng cộng:</strong>
                    <strong>{formatPrice(servicePackage.price)}</strong>
                  </div>
                </div>
              </Collapse>
            </Card.Body>
          </Card>
        ))}
</div>
        {selectedPackage && (
          <div className="mt-4 p-3 bg-light rounded">
            <h6 className="text-primary mb-2">
              <FaCheck className="me-2" />
              Gói đã chọn: {selectedPackage.name}
            </h6>
            <p className="mb-0">
              Tổng giá trị:{' '}
              <strong className="text-primary">{formatPrice(selectedPackage.price)}</strong>
            </p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ServicePackageSelector;
