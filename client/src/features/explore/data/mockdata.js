export const getMockSubjects = () => {
  return [
    {
      id: 1,
      name: "Lập trình hướng đối tượng",
      code: "CS102",
      department: "Khoa Khoa học & Kỹ thuật Máy tính",
      description:
        "Học các khái niệm OOP, thiết kế phần mềm và lập trình với Java/C++.",
      totalTutors: 8,
      semester: "HK1 2024-2025",
      credits: 4,
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
      format: "Trực tuyến",
    },
    {
      id: 2,
      name: "Toán học",
      code: "MATH101",
      department: "Khoa Khoa học Ứng dụng",
      description:
        "Lớp học từ cơ bản đến nâng cao, rèn luyện tư duy logic và giải tích.",
      totalTutors: 12,
      semester: "HK1 2024-2025",
      credits: 4,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60",
      format: "Trực tiếp",
    },
    {
      id: 3,
      name: "Vật lý",
      code: "PHY101",
      department: "Khoa Khoa học Ứng dụng",
      description:
        "Nâng cao kiến thức vật lý, tư duy và ứng dụng thực tế trong kỹ thuật.",
      totalTutors: 10,
      semester: "HK1 2024-2025",
      credits: 3,
      image:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=60",
      format: "Kết hợp",
    },
    {
      id: 4,
      name: "Hóa học",
      code: "CHEM101",
      department: "Khoa Khoa học Ứng dụng",
      description:
        "Khám phá thế giới hóa học với các bài giảng sinh động và thí nghiệm.",
      totalTutors: 7,
      semester: "HK1 2024-2025",
      credits: 3,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60",
      format: "Trực tuyến",
    },
    {
      id: 5,
      name: "Cơ học kỹ thuật",
      code: "ME101",
      department: "Khoa Cơ khí",
      description:
        "Nghiên cứu các nguyên lý cơ học cơ bản và ứng dụng trong kỹ thuật.",
      totalTutors: 6,
      semester: "HK1 2024-2025",
      credits: 3,
      image:
        "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&auto=format&fit=crop&q=60",
      format: "Kết hợp",
    },
    {
      id: 6,
      name: "Mạch điện tử",
      code: "EE101",
      department: "Khoa Điện - Điện tử",
      description: "Thiết kế và phân tích các mạch điện tử analog và digital.",
      totalTutors: 9,
      semester: "HK1 2024-2025",
      credits: 4,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
      format: "Trực tiếp",
    },
    {
      id: 8,
      name: "Cấu trúc dữ liệu và giải thuật",
      code: "CS201",
      department: "Khoa Khoa học & Kỹ thuật Máy tính",
      description:
        "Nắm vững các cấu trúc dữ liệu và thuật toán cơ bản trong lập trình.",
      totalTutors: 11,
      semester: "HK1 2024-2025",
      credits: 4,
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
      format: "Trực tiếp",
    },
    {
      id: 9,
      name: "Sinh học phân tử",
      code: "BIO101",
      department: "Khoa Khoa học Ứng dụng",
      description:
        "Tìm hiểu về các quá trình sinh học ở cấp độ phân tử và tế bào.",
      totalTutors: 4,
      semester: "HK1 2024-2025",
      credits: 3,
      image:
        "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60",
      format: "Kết hợp",
    },
  ];
};

export const getMockTutorsBySubject = (subjectId) => {
  const tutors = {
    2: [
      // Toán Cao Cấp 1
      {
        id: 1,
        name: "TS. Nguyễn Văn An",
        avatar:
          "https://ui-avatars.com/api/?name=Nguyen+Van+An&size=200&background=0ea5e9&color=fff",
        education: "Tiến sĩ Toán học - ĐH Khoa học Tự nhiên",
        title: "Tiến sĩ",
        department: "Bộ môn Khoa học Máy tính",
        experience: "15 năm",
        rating: 4.9,
        totalReviews: 45,
        hourlyRate: 350000,
        specialties: ["Giải tích", "Đại số", "Hình học"],
        tags: ["Online", "Offline", "1-1", "Nhóm"],
        bio: "Chuyên gia giảng dạy Toán cao cấp với phương pháp dễ hiểu",
        studentsGuided: 187,
        mentoringSessions: 312,
        workingHours: "Thứ 2, 4, 6: 14:00 - 16:00",
        email: "nguyen.vanan@hcmut.edu.vn",
        location: "Phòng H1-301, Cơ sở 1",
        introduction:
          "Tiến sĩ Nguyễn Văn An có hơn 15 năm kinh nghiệm giảng dạy tại Đại học Bách Khoa TP.HCM. Chuyên sâu về cấu trúc dữ liệu, giải thuật và lập trình thi đấu. Đã hướng dẫn nhiều sinh viên đạt giải trong các cuộc thi lập trình quốc tế.",
        topics: [
          { code: "CTDL-GT", name: "Cấu trúc dữ liệu và giải thuật" },
          { code: "LT-TĐ", name: "Lập trình thi đấu" },
          { code: "TTN-TT", name: "Thiết kế và phân tích thuật toán" },
        ],
      },
      {
        id: 2,
        name: "ThS. Trần Thị Mai",
        avatar:
          "https://ui-avatars.com/api/?name=Tran+Thi+Mai&size=200&background=8b5cf6&color=fff",
        education: "Thạc sĩ Toán ứng dụng - ĐH Bách Khoa",
        experience: "7 năm giảng dạy",
        rating: 4.8,
        totalReviews: 38,
        hourlyRate: 300000,
        specialties: ["Giải tích", "Xác suất thống kê"],
        tags: ["Offline", "Nhóm", "Còn 3 slot"],
        bio: "Giảng dạy nhiệt tình, tận tâm với học sinh",
      },
      {
        id: 3,
        name: "ThS. Lê Hoàng Nam",
        avatar:
          "https://ui-avatars.com/api/?name=Le+Hoang+Nam&size=200&background=f59e0b&color=fff",
        education: "Thạc sĩ Toán học - ĐH Sư phạm",
        experience: "5 năm giảng dạy",
        rating: 4.7,
        totalReviews: 32,
        hourlyRate: 280000,
        specialties: ["Giải tích", "Đại số tuyến tính"],
        tags: ["Online", "Offline", "1-1", "Còn 8 slot"],
        bio: "Phương pháp giảng dạy sinh động, dễ hiểu",
      },
    ],
    3: [
      // Vật Lý
      {
        id: 4,
        name: "TS. Phạm Minh Tuấn",
        avatar:
          "https://ui-avatars.com/api/?name=Pham+Minh+Tuan&size=200&background=ef4444&color=fff",
        education: "Tiến sĩ Vật lý - ĐH Quốc gia",
        experience: "12 năm giảng dạy",
        rating: 4.9,
        totalReviews: 52,
        hourlyRate: 380000,
        specialties: ["Cơ học", "Điện từ học", "Quang học"],
        tags: ["Online", "1-1", "Còn 4 slot"],
        bio: "Chuyên gia Vật lý với nhiều công trình nghiên cứu",
      },
    ],
    1: [
      // Lập Trình C++
      {
        id: 5,
        name: "ThS. Võ Thanh Sơn",
        avatar:
          "https://ui-avatars.com/api/?name=Vo+Thanh+Son&size=200&background=10b981&color=fff",
        education: "Thạc sĩ Khoa học Máy tính",
        experience: "8 năm kinh nghiệm",
        rating: 4.8,
        totalReviews: 67,
        hourlyRate: 320000,
        specialties: ["C++", "OOP", "Thuật toán"],
        tags: ["Offline", "1-1", "Còn 6 slot"],
        bio: "Developer với 8 năm kinh nghiệm thực tế",
      },
      {
        id: 6,
        name: "Nguyễn Quốc Bảo",
        avatar:
          "https://ui-avatars.com/api/?name=Nguyen+Quoc+Bao&size=200&background=06b6d4&color=fff",
        education: "Cử nhân CNTT - ĐH Bách Khoa",
        experience: "4 năm giảng dạy",
        rating: 4.6,
        totalReviews: 28,
        hourlyRate: 250000,
        specialties: ["C++", "Java", "Python"],
        tags: ["Online", "Nhóm", "Còn 10 slot"],
        bio: "Trẻ trung, năng động, giảng dạy dễ hiểu",
      },
    ],
    8: [
      // Cấu trúc dữ liệu và giải thuật
      {
        id: 7,
        name: "ThS. Lê Minh Cường",
        avatar:
          "https://ui-avatars.com/api/?name=Le+Minh+Cuong&size=200&background=0ea5e9&color=fff",
        education: "Bộ môn Khoa học Máy tính",
        experience: "10 năm giảng dạy",
        rating: 4.9,
        totalReviews: 45,
        hourlyRate: 350000,
        specialties: ["Heap", "Hash Table", "Graph Traversal"],
        tags: ["Offline", "Nhóm", "Còn 8 slot"],
        bio: "Chuyên gia về thuật toán và cấu trúc dữ liệu",
      },
      {
        id: 8,
        name: "TS. Đặng Quốc Gia",
        avatar:
          "https://ui-avatars.com/api/?name=Dang+Quoc+Gia&size=200&background=06b6d4&color=fff",
        education: "Bộ môn Khoa học Máy tính",
        experience: "12 năm giảng dạy",
        rating: 4.8,
        totalReviews: 52,
        hourlyRate: 380000,
        specialties: ["Divide & Conquer", "Recursion", "Master Theorem"],
        tags: ["Online", "Offline", "Nhóm", "Còn 7 slot"],
        bio: "Nghiên cứu sâu về giải thuật và độ phức tạp",
      },
      {
        id: 9,
        name: "ThS. Hoàng Văn Em",
        avatar:
          "https://ui-avatars.com/api/?name=Hoang+Van+Em&size=200&background=10b981&color=fff",
        education: "Bộ môn Khoa học Máy tính",
        experience: "6 năm giảng dạy",
        rating: 4.7,
        totalReviews: 35,
        hourlyRate: 300000,
        specialties: ["BFS", "DFS", "Shortest Path"],
        tags: ["Online", "1-1", "Nhóm", "Còn 6 slot"],
        bio: "Giảng dạy nhiệt tình, dễ hiểu",
      },
      {
        id: 10,
        name: "TS. Nguyễn Văn An",
        avatar:
          "https://ui-avatars.com/api/?name=Nguyen+Van+An&size=200&background=0ea5e9&color=fff",
        education: "Bộ môn Khoa học Máy tính",
        experience: "15 năm giảng dạy",
        rating: 4.9,
        totalReviews: 80,
        hourlyRate: 400000,
        specialties: ["Cây", "Đồ thị", "Sắp xếp"],
        tags: ["Online", "Offline", "1-1", "Nhóm", "Còn 5 slot"],
        bio: "Chuyên gia hàng đầu về cấu trúc dữ liệu",
      },
      {
        id: 11,
        name: "ThS. Bùi Thị Hương",
        avatar:
          "https://ui-avatars.com/api/?name=Bui+Thi+Huong&size=200&background=10b981&color=fff",
        education: "Bộ môn Khoa học Máy tính",
        experience: "5 năm giảng dạy",
        rating: 4.6,
        totalReviews: 25,
        hourlyRate: 280000,
        specialties: ["Segment Tree", "Fenwick Tree", "Range Query"],
        tags: ["Online", "1-1", "Còn 5 slot"],
        bio: "Tận tâm, hỗ trợ sinh viên nhiệt tình",
      },
      {
        id: 12,
        name: "TS. Phạm Thu Dung",
        avatar:
          "https://ui-avatars.com/api/?name=Pham+Thu+Dung&size=200&background=06b6d4&color=fff",
        education: "Bộ môn Khoa học Máy tính",
        experience: "9 năm giảng dạy",
        rating: 4.8,
        totalReviews: 42,
        hourlyRate: 360000,
        specialties: ["Cây nhị phân", "AVL", "Red-Black Tree"],
        tags: ["Online", "Offline", "1-1", "Còn 4 slot"],
        bio: "Phương pháp giảng dạy khoa học, logic",
      },
      {
        id: 13,
        name: "PGS.TS. Trần Thị Bình",
        avatar:
          "https://ui-avatars.com/api/?name=Tran+Thi+Binh&size=200&background=10b981&color=fff",
        education: "Bộ môn Khoa học Máy tính",
        experience: "20 năm giảng dạy",
        rating: 5.0,
        totalReviews: 120,
        hourlyRate: 500000,
        specialties: ["Quy hoạch động", "Thuật toán tham lam", "Backtracking"],
        tags: ["Online", "1-1", "Còn 3 slot"],
        bio: "Nhiều năm kinh nghiệm giảng dạy và nghiên cứu",
      },
      {
        id: 14,
        name: "ThS. Ngô Văn Mạnh",
        avatar:
          "https://ui-avatars.com/api/?name=Ngo+Van+Manh&size=200&background=f59e0b&color=fff",
        education: "Bộ môn Khoa học Máy tính",
        experience: "4 năm giảng dạy",
        rating: 4.5,
        totalReviews: 15,
        hourlyRate: 250000,
        specialties: ["Stack", "Queue", "Linked List"],
        tags: ["Offline", "Nhóm", "Còn 10 slot"],
        bio: "Hỗ trợ sinh viên nhiệt tình, thân thiện",
      },
      {
        id: 15,
        name: "TS. Lê Thị Lan",
        avatar:
          "https://ui-avatars.com/api/?name=Le+Thi+Lan&size=200&background=ef4444&color=fff",
        education: "Bộ môn Khoa học Máy tính",
        experience: "11 năm giảng dạy",
        rating: 4.8,
        totalReviews: 60,
        hourlyRate: 370000,
        specialties: ["String Matching", "Trie", "Suffix Tree"],
        tags: ["Online", "Offline", "1-1", "Còn 2 slot"],
        bio: "Chuyên sâu về xử lý chuỗi và văn bản",
      },
      {
        id: 16,
        name: "ThS. Đỗ Văn Hùng",
        avatar:
          "https://ui-avatars.com/api/?name=Do+Van+Hung&size=200&background=6b7280&color=fff",
        education: "Bộ môn Khoa học Máy tính",
        experience: "3 năm giảng dạy",
        rating: 4.2,
        totalReviews: 10,
        hourlyRate: 200000,
        specialties: ["Basic Sorting", "Array", "Pointer"],
        tags: ["Online", "Nhóm", "0 slot"],
        bio: "Giảng viên trẻ, nhiệt huyết",
      },
    ],
  };

  return tutors[subjectId] || [];
};

export const getMockTutorSchedule = (tutorId) => {
  // Return specific mock data matching the screenshot for demo purposes
  const today = new Date();

  // Helper to get date string for next Monday, Wednesday, Friday etc.
  const getNextDay = (dayIndex) => {
    const d = new Date(today);
    d.setDate(today.getDate() + ((dayIndex + 7 - today.getDay()) % 7));
    return d;
  };

  return [
    {
      id: "s1",
      date: getNextDay(1).toISOString().split("T")[0], // Monday
      dayName: "Thứ 2",
      time: "14:00 - 16:00",
      available: true,
      type: "1-1",
      format: "Online",
      location: null,
    },
    {
      id: "s2",
      date: getNextDay(3).toISOString().split("T")[0], // Wednesday
      dayName: "Thứ 4",
      time: "09:00 - 11:00",
      available: true,
      type: "1-1",
      format: "Offline",
      location: "Phòng H1-101, CS1",
    },
    {
      id: "s3",
      date: getNextDay(5).toISOString().split("T")[0], // Friday
      dayName: "Thứ 6",
      time: "15:00 - 17:00",
      available: true,
      type: "Nhóm",
      members: "2/5",
      format: "Online",
      location: null,
    },
    {
      id: "s4",
      date: getNextDay(2).toISOString().split("T")[0], // Tuesday
      dayName: "Thứ 3",
      time: "10:00 - 12:00",
      available: false,
      type: "1-1",
      format: "Online",
      location: null,
    },
  ];
};

export const getMockTutorById = (tutorId) => {
  const subjectIds = [1, 2, 3, 8];
  for (const subId of subjectIds) {
    const tutors = getMockTutorsBySubject(subId);
    const found = tutors.find((t) => t.id.toString() === tutorId.toString());
    if (found) return found;
  }
  return null;
};