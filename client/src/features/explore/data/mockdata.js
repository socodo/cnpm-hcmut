export const getMockSubjects = () => {
  return [
    {
      id: 1,
      name: 'Toán Cao Cấp 1',
      code: 'MATH101',
      department: 'Khoa Toán - Tin học',
      description: 'Giới hạn, liên tục, đạo hàm và tích phân',
      totalTutors: 8,
      semester: 'HK1 2024-2025',
      credits: 4
    },
    {
      id: 2,
      name: 'Vật Lý Đại Cương 1',
      code: 'PHY101',
      department: 'Khoa Vật Lý',
      description: 'Cơ học, nhiệt học, dao động sóng',
      totalTutors: 5,
      semester: 'HK1 2024-2025',
      credits: 3
    },
    {
      id: 3,
      name: 'Lập Trình C++',
      code: 'CS102',
      department: 'Khoa Công nghệ Thông tin',
      description: 'Lập trình hướng đối tượng với C++',
      totalTutors: 12,
      semester: 'HK1 2024-2025',
      credits: 4
    },
    {
      id: 4,
      name: 'Tiếng Anh Chuyên Ngành',
      code: 'ENG201',
      department: 'Khoa Ngoại ngữ',
      description: 'Tiếng Anh học thuật và giao tiếp',
      totalTutors: 6,
      semester: 'HK1 2024-2025',
      credits: 2
    },
    {
      id: 5,
      name: 'Cấu Trúc Dữ Liệu',
      code: 'CS201',
      department: 'Khoa Công nghệ Thông tin',
      description: 'Array, Linked List, Stack, Queue, Tree, Graph',
      totalTutors: 10,
      semester: 'HK1 2024-2025',
      credits: 4
    }
  ];
};

export const getMockTutorsBySubject = (subjectId) => {
  const tutors = {
    1: [ // Toán Cao Cấp 1
      {
        id: 1,
        name: 'TS. Nguyễn Văn An',
        avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+An&size=200&background=0ea5e9&color=fff',
        education: 'Tiến sĩ Toán học - ĐH Khoa học Tự nhiên',
        experience: '10 năm giảng dạy',
        rating: 4.9,
        totalReviews: 45,
        hourlyRate: 350000,
        specialties: ['Giải tích', 'Đại số', 'Hình học'],
        bio: 'Chuyên gia giảng dạy Toán cao cấp với phương pháp dễ hiểu'
      },
      {
        id: 2,
        name: 'ThS. Trần Thị Mai',
        avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+Mai&size=200&background=8b5cf6&color=fff',
        education: 'Thạc sĩ Toán ứng dụng - ĐH Bách Khoa',
        experience: '7 năm giảng dạy',
        rating: 4.8,
        totalReviews: 38,
        hourlyRate: 300000,
        specialties: ['Giải tích', 'Xác suất thống kê'],
        bio: 'Giảng dạy nhiệt tình, tận tâm với học sinh'
      },
      {
        id: 3,
        name: 'ThS. Lê Hoàng Nam',
        avatar: 'https://ui-avatars.com/api/?name=Le+Hoang+Nam&size=200&background=f59e0b&color=fff',
        education: 'Thạc sĩ Toán học - ĐH Sư phạm',
        experience: '5 năm giảng dạy',
        rating: 4.7,
        totalReviews: 32,
        hourlyRate: 280000,
        specialties: ['Giải tích', 'Đại số tuyến tính'],
        bio: 'Phương pháp giảng dạy sinh động, dễ hiểu'
      }
    ],
    2: [ // Vật Lý
      {
        id: 4,
        name: 'TS. Phạm Minh Tuấn',
        avatar: 'https://ui-avatars.com/api/?name=Pham+Minh+Tuan&size=200&background=ef4444&color=fff',
        education: 'Tiến sĩ Vật lý - ĐH Quốc gia',
        experience: '12 năm giảng dạy',
        rating: 4.9,
        totalReviews: 52,
        hourlyRate: 380000,
        specialties: ['Cơ học', 'Điện từ học', 'Quang học'],
        bio: 'Chuyên gia Vật lý với nhiều công trình nghiên cứu'
      }
    ],
    3: [ // Lập Trình C++
      {
        id: 5,
        name: 'ThS. Võ Thanh Sơn',
        avatar: 'https://ui-avatars.com/api/?name=Vo+Thanh+Son&size=200&background=10b981&color=fff',
        education: 'Thạc sĩ Khoa học Máy tính',
        experience: '8 năm kinh nghiệm',
        rating: 4.8,
        totalReviews: 67,
        hourlyRate: 320000,
        specialties: ['C++', 'OOP', 'Thuật toán'],
        bio: 'Developer với 8 năm kinh nghiệm thực tế'
      },
      {
        id: 6,
        name: 'Nguyễn Quốc Bảo',
        avatar: 'https://ui-avatars.com/api/?name=Nguyen+Quoc+Bao&size=200&background=06b6d4&color=fff',
        education: 'Cử nhân CNTT - ĐH Bách Khoa',
        experience: '4 năm giảng dạy',
        rating: 4.6,
        totalReviews: 28,
        hourlyRate: 250000,
        specialties: ['C++', 'Java', 'Python'],
        bio: 'Trẻ trung, năng động, giảng dạy dễ hiểu'
      }
    ]
  };

  return tutors[subjectId] || [];
};

export const getMockTutorSchedule = (tutorId) => {
  // Tạo lịch cho 7 ngày tới
  const schedule = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const daySchedule = {
      date: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('vi-VN', { weekday: 'long' }),
      slots: []
    };

    // Tạo các slot thời gian
    const timeSlots = [
      { time: '07:00 - 09:00', available: Math.random() > 0.3 },
      { time: '09:00 - 11:00', available: Math.random() > 0.3 },
      { time: '13:00 - 15:00', available: Math.random() > 0.3 },
      { time: '15:00 - 17:00', available: Math.random() > 0.3 },
      { time: '17:00 - 19:00', available: Math.random() > 0.3 },
      { time: '19:00 - 21:00', available: Math.random() > 0.3 }
    ];

    daySchedule.slots = timeSlots;
    schedule.push(daySchedule);
  }

  return schedule;
};