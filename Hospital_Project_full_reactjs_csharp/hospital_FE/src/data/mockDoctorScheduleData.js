export const mockDoctorSchedules = [
  {
    id: 1,
    doctorId: 1,
    doctor: {
      id: 1,
      name: "Dr. John Smith",
      specialization: "Cardiology",
      imageUrl: "/images/team-item.jpg"
    },
    roomId: 101,
    room: {
      id: 101,
      name: "Room 101",
      floor: "1st Floor",
      type: "Consultation"
    },
    dayOfWeek: 1, // Monday
    startTime: "09:00",
    endTime: "17:00",
    note: "Regular consultation hours"
  },
  {
    id: 2,
    doctorId: 2,
    doctor: {
      id: 2,
      name: "Dr. Sarah Johnson",
      specialization: "Pediatrics",
      imageUrl: "/images/team-item1.jpg"
    },
    roomId: 102,
    room: {
      id: 102,
      name: "Room 102",
      floor: "1st Floor",
      type: "Pediatric Care"
    },
    dayOfWeek: 2, // Tuesday
    startTime: "08:00",
    endTime: "16:00",
    note: "Pediatric consultations"
  },
  {
    id: 3,
    doctorId: 3,
    doctor: {
      id: 3,
      name: "Dr. Michael Chen",
      specialization: "Neurology",
      imageUrl: "/images/team-item2.jpg"
    },
    roomId: 201,
    room: {
      id: 201,
      name: "Room 201",
      floor: "2nd Floor",
      type: "Neurology"
    },
    dayOfWeek: 3, // Wednesday
    startTime: "10:00",
    endTime: "18:00",
    note: "Neurological consultations"
  },
  {
    id: 4,
    doctorId: 4,
    doctor: {
      id: 4,
      name: "Dr. Emily Brown",
      specialization: "Dermatology",
      imageUrl: "/images/team-item.jpg"
    },
    roomId: 202,
    room: {
      id: 202,
      name: "Room 202",
      floor: "2nd Floor",
      type: "Dermatology"
    },
    dayOfWeek: 4, // Thursday
    startTime: "09:30",
    endTime: "17:30",
    note: "Skin consultations"
  },
  {
    id: 5,
    doctorId: 5,
    doctor: {
      id: 5,
      name: "Dr. Robert Wilson",
      specialization: "Orthopedics",
      imageUrl: "/images/team-item1.jpg"
    },
    roomId: 301,
    room: {
      id: 301,
      name: "Room 301",
      floor: "3rd Floor",
      type: "Orthopedics"
    },
    dayOfWeek: 5, // Friday
    startTime: "08:30",
    endTime: "16:30",
    note: "Orthopedic consultations"
  }
];

export const getDayName = (dayNumber) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNumber];
};

export const formatTime = (time) => {
  return time.substring(0, 5);
}; 