export const mockMedicalServices = [
  { id: 1, name: 'General Check-up', type: 'Consultation', price: 50.00, description: 'A comprehensive general health examination.' },
  { id: 2, name: 'Ultrasound Scan', type: 'Imaging', price: 120.00, description: 'Standard diagnostic ultrasound imaging.' },
  { id: 3, name: 'Blood Test - Full Panel', type: 'Laboratory', price: 80.00, description: 'Complete blood count and metabolic panel.' },
  { id: 4, name: 'X-Ray', type: 'Imaging', price: 75.00, description: 'Chest X-Ray for diagnostic purposes.' },
  { id: 5, name: 'Dental Cleaning', type: 'Dental', price: 65.00, description: 'Standard teeth cleaning and polishing.' },
];

export const mockLabTests = [
  { id: 1, name: 'Complete Blood Count (CBC)', price: 45.00, description: 'Measures different components of blood.' },
  { id: 2, name: 'Lipid Panel', price: 60.00, description: 'Measures cholesterol and triglyceride levels.' },
  { id: 3, name: 'Thyroid Stimulating Hormone (TSH)', price: 75.00, description: 'Tests thyroid gland function.' },
  { id: 4, name: 'Urinalysis', price: 30.00, description: 'Analysis of urine for various compounds.' },
];

export const mockTestRequests = [
  { 
    id: 1, 
    medicalRecordId: 1, 
    patientName: 'Peter Jones', 
    testName: 'Complete Blood Count (CBC)', 
    requestedAt: '2024-07-20T10:05:00Z', 
    status: 'Completed' 
  },
  { 
    id: 2, 
    medicalRecordId: 2, 
    patientName: 'Mary White', 
    testName: 'Lipid Panel', 
    requestedAt: '2024-07-21T11:35:00Z', 
    status: 'Pending' 
  },
  { 
    id: 3, 
    medicalRecordId: 2, 
    patientName: 'Mary White', 
    testName: 'Thyroid Stimulating Hormone (TSH)', 
    requestedAt: '2024-07-21T11:35:00Z', 
    status: 'Pending' 
  },
  { 
    id: 4, 
    medicalRecordId: 3, 
    patientName: 'Peter Jones', 
    testName: 'Urinalysis', 
    requestedAt: '2024-07-28T09:20:00Z', 
    status: 'Completed' 
  },
];

export const mockTestResults = [
  { 
    id: 1, 
    testRequestId: 1, 
    patientName: 'Peter Jones', 
    testName: 'Complete Blood Count (CBC)',
    result: 'All values within normal range.',
    resultDate: '2024-07-21T09:00:00Z'
  },
  { 
    id: 2, 
    testRequestId: 4, 
    patientName: 'Peter Jones', 
    testName: 'Urinalysis',
    result: 'No abnormalities detected.',
    resultDate: '2024-07-29T14:00:00Z'
  }
];

export const mockPendingRequests = [
  {id: 2, patientName: 'Mary White', testName: 'Lipid Panel'},
  {id: 3, patientName: 'Mary White', testName: 'Thyroid Stimulating Hormone (TSH)'}
]; 