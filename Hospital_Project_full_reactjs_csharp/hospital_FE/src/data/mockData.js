export const branches = [
  {
    id: 1,
    name: "Main Hospital Branch",
    address: "123 Main Street, City Center",
    phone: "(+84) 123-456-789"
  },
  {
    id: 2,
    name: "North District Branch",
    address: "456 North Avenue, North District",
    phone: "(+84) 987-654-321"
  },
  {
    id: 3,
    name: "East Medical Center",
    address: "789 East Road, East District",
    phone: "(+84) 456-789-123"
  }
];

export const doctors = [
  {
    id: 1,
    name: "John Smith",
    specialization: "Cardiology",
    qualification: "MD, PhD in Cardiology",
    experience: 15,
    image: "/images/team-item.jpg",
    branchId: 1,
    languages: ["English", "Vietnamese"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    specialization: "Pediatrics",
    qualification: "MD, Specialist in Pediatrics",
    experience: 10,
    image: "/images/team-item1.jpg",
    branchId: 1,
    languages: ["English", "French"]
  },
  {
    id: 3,
    name: "Michael Brown",
    specialization: "Neurology",
    qualification: "MD, Neurosurgery Specialist",
    experience: 12,
    image: "/images/team-item2.jpg",
    branchId: 2,
    languages: ["English", "Spanish"]
  },
  {
    id: 4,
    name: "Emily Davis",
    specialization: "Dermatology",
    qualification: "MD, Dermatology Expert",
    experience: 8,
    image: "/images/team-item.jpg",
    branchId: 2,
    languages: ["English", "Vietnamese"]
  },
  {
    id: 5,
    name: "Robert Wilson",
    specialization: "Orthopedics",
    qualification: "MD, Orthopedic Surgeon",
    experience: 20,
    image: "/images/team-item1.jpg",
    branchId: 3,
    languages: ["English", "German"]
  }
];

export const generateTimeSlots = (doctorId, selectedDate) => {
  const slots = [];
  const currentDate = new Date();
  const targetDate = new Date(selectedDate);

  // Return empty if selected date is in the past
  if (targetDate < new Date(currentDate.setHours(0,0,0,0))) {
    return slots;
  }

  // Generate slots between 9 AM and 5 PM
  const startHour = 9;
  const endHour = 17;
  const slotDuration = 30; // 30 minutes per slot

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      // Randomly skip some slots to simulate unavailable times
      if (Math.random() > 0.3) {
        const startTime = new Date(selectedDate);
        startTime.setHours(hour, minute, 0);
        
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + slotDuration);

        slots.push({
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          available: true
        });
      }
    }
  }

  return slots;
}; 

export const mockUserData = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main Street, New York, NY 10001",
  joinDate: "2023-01-15",
  
  appointments: [
    {
      id: 1,
      date: "2024-03-25",
      time: "09:30 AM",
      doctorName: "Dr. Sarah Wilson",
      department: "Cardiology",
      reason: "Annual heart checkup",
      status: "Scheduled",
      roomNumber: "203",
      notes: "Please arrive 15 minutes early for registration"
    },
    {
      id: 2,
      date: "2024-03-15",
      time: "02:00 PM",
      doctorName: "Dr. Michael Brown",
      department: "General Medicine",
      reason: "Follow-up consultation",
      status: "Completed",
      roomNumber: "105",
      notes: "Bring previous test results"
    },
    {
      id: 3,
      date: "2024-03-10",
      time: "11:00 AM",
      doctorName: "Dr. Emily Davis",
      department: "Dermatology",
      reason: "Skin examination",
      status: "Cancelled",
      roomNumber: "302",
      notes: "Cancellation due to doctor emergency"
    },
    {
      id: 4,
      date: "2024-04-05",
      time: "10:15 AM",
      doctorName: "Dr. Robert Chen",
      department: "Orthopedics",
      reason: "Knee pain assessment",
      status: "Scheduled",
      roomNumber: "401",
      notes: "X-ray scheduled before appointment"
    },
    {
      id: 5,
      date: "2024-04-12",
      time: "03:30 PM",
      doctorName: "Dr. Lisa Anderson",
      department: "Neurology",
      reason: "Headache consultation",
      status: "Scheduled",
      roomNumber: "205",
      notes: "Please complete headache diary"
    }
  ],

  waitingList: [
    {
      id: 1,
      date: "2024-03-26",
      queueNumber: "A123",
      department: "Radiology",
      estimatedTime: "30 minutes",
      status: "Waiting",
      priority: "Normal",
      currentNumber: "A120"
    },
    {
      id: 2,
      date: "2024-03-26",
      queueNumber: "B045",
      department: "Laboratory",
      estimatedTime: "15 minutes",
      status: "Called",
      priority: "Normal",
      currentNumber: "B045"
    },
    {
      id: 3,
      date: "2024-03-26",
      queueNumber: "A145",
      department: "Radiology",
      estimatedTime: "45 minutes",
      status: "Waiting",
      priority: "Urgent",
      currentNumber: "A120"
    },
    {
      id: 4,
      date: "2024-03-26",
      queueNumber: "C078",
      department: "Pharmacy",
      estimatedTime: "20 minutes",
      status: "Waiting",
      priority: "Normal",
      currentNumber: "C075"
    },
    {
      id: 5,
      date: "2024-03-26",
      queueNumber: "D012",
      department: "Physical Therapy",
      estimatedTime: "10 minutes",
      status: "Called",
      priority: "Normal",
      currentNumber: "D012"
    }
  ],

  prescriptions: [
    {
      id: "RX001",
      date: "2024-03-15",
      doctorName: "Dr. Michael Brown",
      department: "General Medicine",
      diagnosis: "Upper Respiratory Infection",
      validUntil: "2024-03-22",
      status: "Active",
      medications: [
        {
          name: "Amoxicillin",
          dosage: "500mg",
          frequency: "3 times daily",
          duration: "7 days",
          instructions: "Take with food",
          quantity: 21,
          refills: 0
        },
        {
          name: "Ibuprofen",
          dosage: "400mg",
          frequency: "As needed",
          duration: "5 days",
          instructions: "Take for pain, maximum 4 times daily",
          quantity: 10,
          refills: 1
        }
      ]
    },
    {
      id: "RX002",
      date: "2024-03-10",
      doctorName: "Dr. Emily Davis",
      department: "Dermatology",
      diagnosis: "Contact Dermatitis",
      validUntil: "2024-04-10",
      status: "Active",
      medications: [
        {
          name: "Hydrocortisone Cream",
          dosage: "1%",
          frequency: "Twice daily",
          duration: "30 days",
          instructions: "Apply to affected areas",
          quantity: 1,
          refills: 2
        },
        {
          name: "Antihistamine",
          dosage: "10mg",
          frequency: "Once daily",
          duration: "30 days",
          instructions: "Take at bedtime",
          quantity: 30,
          refills: 2
        }
      ]
    },
    {
      id: "RX003",
      date: "2024-02-28",
      doctorName: "Dr. Sarah Wilson",
      department: "Cardiology",
      diagnosis: "Hypertension",
      validUntil: "2024-05-28",
      status: "Active",
      medications: [
        {
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          duration: "90 days",
          instructions: "Take in the morning",
          quantity: 90,
          refills: 3
        },
        {
          name: "Aspirin",
          dosage: "81mg",
          frequency: "Once daily",
          duration: "90 days",
          instructions: "Take with food",
          quantity: 90,
          refills: 3
        }
      ]
    }
  ],

  invoices: [
    {
      id: "INV001",
      date: "2024-03-15",
      description: "General consultation and medication",
      amount: 250.00,
      status: "Paid",
      paymentMethod: "Credit Card",
      paymentDate: "2024-03-15",
      items: [
        {
          name: "General Consultation",
          description: "30-minute consultation",
          amount: 150.00,
          quantity: 1
        },
        {
          name: "Prescription Medication",
          description: "Amoxicillin 500mg",
          amount: 50.00,
          quantity: 2
        },
        {
          name: "Laboratory Tests",
          description: "Blood work",
          amount: 50.00,
          quantity: 1
        }
      ]
    },
    {
      id: "INV002",
      date: "2024-03-10",
      description: "Dermatology consultation",
      amount: 180.00,
      status: "Pending",
      dueDate: "2024-03-24",
      items: [
        {
          name: "Specialist Consultation",
          description: "20-minute consultation",
          amount: 130.00,
          quantity: 1
        },
        {
          name: "Prescription Cream",
          description: "Hydrocortisone 1%",
          amount: 50.00,
          quantity: 1
        }
      ]
    },
    {
      id: "INV003",
      date: "2024-02-28",
      description: "Cardiology checkup and tests",
      amount: 550.00,
      status: "Paid",
      paymentMethod: "Insurance",
      paymentDate: "2024-02-28",
      insuranceClaim: {
        provider: "BlueCross",
        claimNumber: "CLM123456",
        coveredAmount: 440.00
      },
      items: [
        {
          name: "Cardiology Consultation",
          description: "45-minute consultation",
          amount: 250.00,
          quantity: 1
        },
        {
          name: "ECG Test",
          description: "Standard 12-lead ECG",
          amount: 150.00,
          quantity: 1
        },
        {
          name: "Blood Pressure Monitor",
          description: "24-hour monitoring",
          amount: 150.00,
          quantity: 1
        }
      ]
    },
    {
      id: "INV004",
      date: "2024-02-15",
      description: "Physical Therapy Session",
      amount: 120.00,
      status: "Paid",
      paymentMethod: "Debit Card",
      paymentDate: "2024-02-15",
      items: [
        {
          name: "PT Session",
          description: "60-minute session",
          amount: 90.00,
          quantity: 1
        },
        {
          name: "Hot/Cold Therapy",
          description: "Additional treatment",
          amount: 30.00,
          quantity: 1
        }
      ]
    }
  ]
}; 