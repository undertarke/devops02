export const mockUser = {
  username: "johndoe",
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+84 123 456 789",
  gender: "Male",
  dateOfBirth: "1990-01-01",
  avatar: null
};

export const mockAppointments = [
  {
    id: 1,
    doctorName: "Dr. Sarah Wilson",
    appointmentDate: "2024-03-20",
    appointmentTime: "09:00 AM",
    status: "Scheduled",
    department: "Cardiology"
  },
  {
    id: 2,
    doctorName: "Dr. Michael Brown",
    appointmentDate: "2024-03-25",
    appointmentTime: "02:30 PM",
    status: "Completed",
    department: "General Medicine"
  },
  {
    id: 3,
    doctorName: "Dr. Emily Davis",
    appointmentDate: "2024-04-05",
    appointmentTime: "11:00 AM",
    status: "Pending",
    department: "Neurology"
  }
];

export const mockWaitingList = [
  {
    id: 1,
    doctorName: "Dr. James Wilson",
    date: "2024-03-18",
    queueNumber: 5,
    estimatedTime: "10:30 AM",
    department: "Dentistry"
  },
  {
    id: 2,
    doctorName: "Dr. Lisa Anderson",
    date: "2024-03-18",
    queueNumber: 8,
    estimatedTime: "11:00 AM",
    department: "Ophthalmology"
  }
];

export const mockPrescriptions = [
  {
    id: 1,
    doctorName: "Dr. Sarah Wilson",
    date: "2024-03-15",
    status: "Active",
    medications: [
      { name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily" },
      { name: "Paracetamol", dosage: "650mg", frequency: "As needed" }
    ]
  },
  {
    id: 2,
    doctorName: "Dr. Michael Brown",
    date: "2024-03-10",
    status: "Completed",
    medications: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "2 times daily" },
      { name: "Vitamin C", dosage: "1000mg", frequency: "Once daily" }
    ]
  }
];

export const mockInvoices = [
  {
    id: 1,
    date: "2024-03-15",
    totalAmount: 150.00,
    status: "Paid",
    items: [
      { description: "Consultation Fee", amount: 100.00 },
      { description: "Medication", amount: 50.00 }
    ]
  },
  {
    id: 2,
    date: "2024-03-10",
    totalAmount: 300.00,
    status: "Pending",
    items: [
      { description: "Lab Test", amount: 200.00 },
      { description: "X-Ray", amount: 100.00 }
    ]
  },
  {
    id: 3,
    date: "2024-03-05",
    totalAmount: 75.00,
    status: "Paid",
    items: [
      { description: "Follow-up Visit", amount: 75.00 }
    ]
  }
]; 