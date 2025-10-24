export const getMockProfile = (role) => {
  if (role === 'tutor') {
    return {
      id: 1,
      fullName: 'Phùng Đanh Tộ',
      email: 'to.phungdanh@hcmut.edu.vn',
      phone: '0936363636',
      address: 'Phường Diên Hồng, TP. Hồ Chí Minh',
      avatar: 'https://ui-avatars.com/api/?name=Phung+Danh+To&size=200&background=0ea5e9&color=fff',
      title: 'Sinh viên Năm 3',
      bio: 'Tôi là sinh viên năm 3 trường Đại học Bách Khoa - Đại học Quốc gia Thành phố Hồ CHí Minh với 3 năm kinh nghiệm giảng dạy. Ôn thi THPT Quốc gia. Phương pháp giảng dạy của tôi tập trung vào việc giúp học sinh hiểu bản chất vấn đề, không học vẹt.',
      subjects: ['Toán', 'Vật Lý', 'Hóa Học'],
      education: 'Sinh viên năm 3 - trường Đại học Bách Khoa - Đại học Quốc gia Thành phố Hồ CHí Minh',
      experience: '3 năm giảng dạy Toán THPT. Đã có hơn 50 học sinh đỗ đại học khối A, A1 với điểm số cao. Từng là giảng viên tại trung tâm luyện thi ABC.',
      hourlyRate: 300000,
      totalStudents: 45,
      totalHours: 520,
      certificates: [
        {
          name: 'Sinh viên 5 tốt',
          issuer: 'ABC university',
          year: '2022'
        },
        {
          name: 'Giải Nhì Olympic Toán sinh viên',
          issuer: 'Bộ Giáo dục',
          year: '2022'
        }
      ]
    };
  } else {
    return {
      id: 2,
      fullName: 'Trần Thị Bình',
      email: 'tranbinhstudent@example.com',
      phone: '0912345678',
      address: 'Quận 3, TP. Hồ Chí Minh',
      avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+Binh&size=200&background=10b981&color=fff',
      bio: 'Mình là học sinh lớp 11, đang chuẩn bị cho kỳ thi THPT Quốc gia. Mình muốn tìm gia sư giỏi để nâng cao kiến thức Toán và Lý.',
      gradeLevel: 'Lớp 11',
      school: 'THPT Lê Hồng Phong',
      interestedSubjects: ['Toán', 'Vật Lý', 'Tiếng Anh'],
      learningGoals: 'Đạt điểm 9+ môn Toán và Vật Lý trong kỳ thi THPT Quốc gia. Chuẩn bị thi vào các trường Đại học top đầu khối A.',
      totalCourses: 3,
      totalHours: 120,
      currentTutors: [
        {
          name: 'Nguyễn Văn An',
          subject: 'Toán',
          avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+An&size=100&background=0ea5e9&color=fff'
        },
        {
          name: 'Lê Thị Hoa',
          subject: 'Vật Lý',
          avatar: 'https://ui-avatars.com/api/?name=Le+Thi+Hoa&size=100&background=8b5cf6&color=fff'
        }
      ]
    };
  }
};