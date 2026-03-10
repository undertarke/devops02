import React, { useEffect, useState } from 'react';
import { getInvoicesByPatientId } from '../services/api';
import { toast } from 'react-toastify';

const InvoicePatientPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const patientId = localStorage.getItem('patientId');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        if (!patientId) {
          toast.error('Patient ID not found');
          return;
        }
        const response = await getInvoicesByPatientId(patientId);
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        toast.error('Failed to load invoices');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [patientId]);

  const formatInvoiceId = (id) => `INV${id.toString().padStart(3, '0')}`;
  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-600';
      case 'Unpaid':
        return 'bg-red-600';
      case 'Pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  if (loading) return <p className="text-center mt-10">Loading invoices...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Invoices</h2>

      {invoices.length === 0 && (
        <p className="text-center text-gray-500">No invoices found.</p>
      )}

      {invoices.map((invoice) => {
        const payment = invoice.payments?.[0];

        return (
          <div key={invoice.id} className="border rounded-md p-4 shadow-sm space-y-2">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">
                  {new Date(invoice.issuedDate).toLocaleDateString()}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Invoice #{formatInvoiceId(invoice.id)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-lg font-semibold">{formatCurrency(invoice.totalAmount)}</p>
                <span className={`text-white text-xs px-2 py-1 rounded ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </span>
              </div>
            </div>

            {/* Note + Payment info */}
            <div>
              <p className="text-sm font-medium">{invoice.note || 'General consultation'}</p>
              {payment && (
                <p className="text-sm text-gray-500">
                  Paid via {payment.paymentMethod} on {new Date(payment.paymentDate).toLocaleDateString()}
                </p>
              )}
            </div>

            <hr />

            {/* Invoice Items */}
            <div>
              <p className="font-semibold mb-1">Items:</p>
              {invoice.invoiceDetails?.map((item, index) => (
                <div key={index} className="flex justify-between text-sm py-1">
                  <div>
                    <p className="font-medium">{item.description}</p>
                    <p className="text-gray-500 text-xs">{item.itemType}</p>
                  </div>
                  <div className="text-right">
                    <p>{formatCurrency(item.totalPrice)}</p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvoicePatientPage;
