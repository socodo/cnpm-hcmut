import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  // default to survey tab (Khảo Sát & Thống Kê)
  const [activeTab, setActiveTab] = useState("survey");
  const location = useLocation();

  useEffect(() => {
    if (location && location.state && location.state.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    academicYear: "",
    semesterNumber: 1,
    startDate: "",
    endDate: "",
  });

  // Users (mock)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyen.vana@hcmut.edu.vn",
      role: "student",
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tran.thib@hcmut.edu.vn",
      role: "student",
      status: "Hoạt động",
    },
    {
      id: 3,
      name: "TS. Lê Văn C",
      email: "le.vanc@hcmut.edu.vn",
      role: "tutor",
      status: "Hoạt động",
    },
    {
      id: 4,
      name: "Phạm Minh D",
      email: "pham.minhd@hcmut.edu.vn",
      role: "student",
      status: "Đã chặn",
    },
    {
      id: 5,
      name: "Hoàng Thị E",
      email: "hoang.thie@hcmut.edu.vn",
      role: "student",
      status: "Hoạt động",
    },
    {
      id: 6,
      name: "PGS.TS. Võ Văn F",
      email: "vo.vanf@hcmut.edu.vn",
      role: "tutor",
      status: "Hoạt động",
    },
  ]);

  const [query, setQuery] = useState("");
  const filteredUsers = users.filter((u) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  const toggleUserBlock = (id) =>
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Hoạt động" ? "Đã chặn" : "Hoạt động" }
          : u
      )
    );

  // registrations (mock)
  const [registrations] = useState([
    {
      id: 1,
      mssv: "2012345",
      name: "Nguyễn Văn A",
      email: "nguyen.vana@hcmut.edu.vn",
      dept: "Khoa KHMT",
      course: "CO2003",
      courseName: "Cấu Trúc Dữ Liệu & Giải Thuật",
      issue: "Khó hiểu về cây AVL và cách cân bằng",
      priority: "Cao",
      status: "Đã duyệt",
      date: "2024-09-15",
    },
    {
      id: 2,
      mssv: "2013456",
      name: "Trần Thị B",
      email: "tran.thib@hcmut.edu.vn",
      dept: "Khoa KHMT",
      course: "CO3001",
      courseName: "Cơ Sở Dữ Liệu",
      issue: "Cần hỗ trợ về SQL optimization và indexing",
      priority: "Trung bình",
      status: "Đã duyệt",
      date: "2024-09-16",
    },
    {
      id: 3,
      mssv: "2014567",
      name: "Lê Văn C",
      email: "le.vanc@hcmut.edu.vn",
      dept: "Khoa KHMT",
      course: "CO2003",
      courseName: "Cấu Trúc Dữ Liệu & Giải Thuật",
      issue: "Không hiểu thuật toán đồ thị",
      priority: "Cao",
      status: "Chờ duyệt",
      date: "2024-09-17",
    },
    {
      id: 4,
      mssv: "2015678",
      name: "Phạm Thị D",
      email: "pham.thid@hcmut.edu.vn",
      dept: "Khoa Điện-Điện tử",
      course: "CO3002",
      courseName: "Lập Trình Hướng Đối Tượng",
      issue: "Design patterns và SOLID principles",
      priority: "Trung bình",
      status: "Đã duyệt",
      date: "2024-09-18",
    },
    {
      id: 5,
      mssv: "2016789",
      name: "Hoàng Văn E",
      email: "hoang.vane@hcmut.edu.vn",
      dept: "Khoa KHMT",
      course: "CO2007",
      courseName: "Hệ Điều Hành",
      issue: "Process scheduling và deadlock",
      priority: "Thấp",
      status: "Đã duyệt",
      date: "2024-09-19",
    },
    {
      id: 6,
      mssv: "2017890",
      name: "Võ Thị F",
      email: "vo.thif@hcmut.edu.vn",
      dept: "Khoa KHMT",
      course: "CO2003",
      courseName: "Cấu Trúc Dữ Liệu & Giải Thuật",
      issue: "Quy hoạch động và Greedy",
      priority: "Trung bình",
      status: "Từ chối",
      date: "2024-09-20",
    },
  ]);

  const [semesters, setSemesters] = useState([
    {
      id: 1,
      code: "HK1 2024-2025",
      status: "Đang mở",
      startDate: "2024-09-01",
      endDate: "2025-01-15",
      subjects: 12,
      students: 234,
      statusColor: "text-red-600 bg-red-50",
    },
    {
      id: 2,
      code: "HK2 2023-2024",
      status: "Đã đóng",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      subjects: 15,
      students: 198,
      statusColor: "text-green-600 bg-green-50",
    },
    {
      id: 3,
      code: "HK1 2023-2024",
      status: "Đã đóng",
      startDate: "2023-09-01",
      endDate: "2024-01-10",
      subjects: 14,
      students: 187,
      statusColor: "text-green-600 bg-green-50",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSemester, setFilterSemester] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const courseOptions = Array.from(
    registrations.reduce((set, r) => {
      set.add(`${r.course}|${r.courseName}`);
      return set;
    }, new Set())
  ).map((s) => {
    const [code, name] = s.split("|");
    return { code, name };
  });

  const filteredRegistrations = registrations.filter((r) => {
    const q = searchTerm.trim().toLowerCase();
    if (q) {
      const combined =
        `${r.name} ${r.mssv} ${r.course} ${r.courseName} ${r.email}`.toLowerCase();
      if (!combined.includes(q)) return false;
    }
    if (filterCourse !== "all" && r.course !== filterCourse) return false;
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    return true;
  });

  const exportCSV = () => {
    const rows = [
      [
        "MSSV",
        "Họ tên",
        "Email",
        "Khoa",
        "Môn",
        "Tên môn",
        "Vấn đề",
        "Ưu tiên",
        "Trạng thái",
        "Ngày đăng ký",
      ],
      ...filteredRegistrations.map((r) => [
        r.mssv,
        r.name,
        r.email,
        r.dept,
        r.course,
        r.courseName,
        r.issue,
        r.priority,
        r.status,
        r.date,
      ]),
    ];
    const csvContent = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSemester = {
      id: Date.now(),
      code:
        formData.code ||
        `HK${formData.semesterNumber} ${formData.academicYear}`,
      status: "Đã đóng",
      startDate: formData.startDate || "",
      endDate: formData.endDate || "",
      subjects: 0,
      students: 0,
      statusColor: "text-green-600 bg-green-50",
    };
    setSemesters((prev) => [newSemester, ...prev]);
    setFormData({
      code: "",
      name: "",
      academicYear: "",
      semesterNumber: 1,
      startDate: "",
      endDate: "",
    });
    setShowCreateForm(false);
  };

  const toggleSemesterStatus = (id) => {
    setSemesters((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const isOpen = s.status === "Đang mở";
        return {
          ...s,
          status: isOpen ? "Đã đóng" : "Đang mở",
          statusColor: isOpen
            ? "text-green-600 bg-green-50"
            : "text-red-600 bg-red-50",
        };
      })
    );
  };

  const headerMap = {
    semesters: {
      title: "Quản Lý Kỳ Đăng Ký",
      subtitle: "Tạo và quản lý các kỳ đăng ký",
    },
    survey: {
      title: "Khảo Sát & Thống Kê",
      subtitle: "Tổng quan khảo sát và thống kê",
    },
    users: {
      title: "Quản Lý Người Dùng",
      subtitle: "Tìm kiếm và quản lý tài khoản người dùng trong hệ thống",
    },
  };

  const { title: headerTitle, subtitle: headerSubtitle } =
    headerMap[activeTab] || headerMap.survey;

  const currentSemester =
    semesters && semesters.length > 0
      ? semesters.find((s) => s.status === "Đang mở") || semesters[0]
      : null;
  const navigate = useNavigate();

  const navigateToSemesterCourses = (semesterId) => {
    // SPA navigation so location.state is preserved when coming back
    navigate(`/admin/semester/${semesterId}/courses`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{headerTitle}</h1>
          <p className="text-gray-500 mt-2">{headerSubtitle}</p>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setActiveTab("semesters")}
            className={`px-3 py-1 rounded ${
              activeTab === "semesters" ? "bg-blue-600 text-white" : "border"
            }`}
          >
            Quản Lý Kỳ Đăng Ký
          </button>
          <button
            onClick={() => setActiveTab("survey")}
            className={`px-3 py-1 rounded ${
              activeTab === "survey" ? "bg-blue-600 text-white" : "border"
            }`}
          >
            Khảo Sát & Thống Kê
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-3 py-1 rounded ${
              activeTab === "users" ? "bg-blue-600 text-white" : "border"
            }`}
          >
            Quản Lý Người Dùng
          </button>
        </div>
      </div>

      {/* Semesters tab - rewritten to match attachment */}
      {activeTab === "semesters" && (
        <div>
          {/* top row: System Online + stat cards */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-100" />
              <div className="text-sm text-gray-600">System Online</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm flex items-center">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4 text-xl">
                  📅
                </div>
                <div>
                  <div className="text-2xl font-semibold">
                    {semesters.filter((s) => s.status === "Đang mở").length}
                  </div>
                  <div className="text-sm text-gray-600">Kỳ đang mở</div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm flex items-center">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mr-4 text-xl">
                  📚
                </div>
                <div>
                  <div className="text-2xl font-semibold">
                    {semesters.reduce((acc, s) => acc + (s.subjects || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Tổng môn học</div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm flex items-center">
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mr-4 text-xl">
                  👥
                </div>
                <div>
                  <div className="text-2xl font-semibold">
                    {semesters.reduce((acc, s) => acc + (s.students || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Tổng sinh viên</div>
                </div>
              </div>
            </div>
          </div>

          {/* create button (moved up) */}
          <div className="flex items-center justify-end mb-4">
            <div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Tạo kỳ mới
              </button>
            </div>
          </div>

          {/* stacked semester cards */}
          <div className="space-y-4">
            {semesters.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-medium">{s.code}</div>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm ${s.statusColor}`}
                    >
                      {s.status}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>Bắt đầu: {s.startDate}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>Kết thúc: {s.endDate}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📚</span>
                      {s.subjects} môn học
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">👥</span>
                      {s.students} sinh viên đăng ký
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end ml-6">
                  <button
                    onClick={() => navigateToSemesterCourses(s.id)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    Quản lý môn học →
                  </button>
                  <button
                    onClick={() => toggleSemesterStatus(s.id)}
                    className={`mt-3 px-4 py-2 border rounded-lg ${
                      s.status === "Đang mở"
                        ? "border-red-200 text-red-600"
                        : "border-green-200 text-green-600"
                    }`}
                  >
                    {s.status === "Đang mở" ? "Đóng" : "Mở"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Survey tab (stacked) */}
      {activeTab === "survey" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold">Thống kê nhanh</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="p-4 bg-gray-50 rounded">
                Tổng đăng ký:{" "}
                <div className="text-2xl font-bold">{registrations.length}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                Chờ duyệt:{" "}
                <div className="text-2xl font-bold">
                  {registrations.filter((r) => r.status === "Chờ duyệt").length}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                Đã duyệt:{" "}
                <div className="text-2xl font-bold">
                  {registrations.filter((r) => r.status === "Đã duyệt").length}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                Từ chối:{" "}
                <div className="text-2xl font-bold">
                  {registrations.filter((r) => r.status === "Từ chối").length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">
              Biểu đồ - Môn được đăng ký nhiều nhất (placeholder)
            </h3>
            <div className="h-40 bg-gradient-to-r from-blue-50 to-blue-100 rounded flex items-end">
              <div className="w-16 mx-2 h-3/4 bg-blue-400" />
              <div className="w-16 mx-2 h-1/2 bg-blue-300" />
              <div className="w-16 mx-2 h-2/3 bg-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="font-semibold">Phân bố theo khoa (placeholder)</h4>
            <div className="h-48 flex items-center justify-center text-gray-500">
              Pie chart placeholder
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="font-semibold">Gợi ý hành động</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 mt-2">
              <li>Thống kê các môn có tỷ lệ chờ duyệt cao</li>
              <li>Ưu tiên phân bổ giảng viên cho môn có yêu cầu cao</li>
              <li>Cập nhật nội dung bài giảng cho các vấn đề chung</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Đăng ký chi tiết</h3>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:space-x-3">
                <input
                  placeholder="Tìm kiếm theo tên, MSSV, môn học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border bg-gray-50 mb-3 md:mb-0"
                />
                <select
                  value={filterSemester}
                  onChange={(e) => setFilterSemester(e.target.value)}
                  className="px-4 py-3 rounded-lg border bg-white mb-3 md:mb-0"
                >
                  <option value="all">Tất cả kỳ</option>
                  {semesters.map((s) => (
                    <option key={s.id} value={s.code}>
                      {s.code}
                    </option>
                  ))}
                </select>
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="px-4 py-3 rounded-lg border bg-white mb-3 md:mb-0"
                >
                  <option value="all">Tất cả môn</option>
                  {courseOptions.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 rounded-lg border bg-white"
                >
                  <option value="all">Tất cả</option>
                  <option value="Chờ duyệt">Chờ duyệt</option>
                  <option value="Đã duyệt">Đã duyệt</option>
                  <option value="Từ chối">Từ chối</option>
                </select>
              </div>
              <div className="flex-shrink-0 ml-auto mt-3 md:mt-0">
                <button
                  onClick={exportCSV}
                  className="px-4 py-3 bg-white border rounded-lg"
                >
                  Xuất CSV
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-3">
              Hiển thị {filteredRegistrations.length} / {registrations.length}{" "}
              đăng ký
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="text-left text-sm text-gray-600 border-b">
                    <th className="py-3 px-4">MSSV</th>
                    <th className="py-3 px-4">Sinh viên</th>
                    <th className="py-3 px-4">Khoa</th>
                    <th className="py-3 px-4">Môn học</th>
                    <th className="py-3 px-4">Vấn đề</th>
                    <th className="py-3 px-4">Ưu tiên</th>
                    <th className="py-3 px-4">Trạng thái</th>
                    <th className="py-3 px-4">Ngày đăng ký</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((r) => (
                    <tr key={r.id} className="border-b last:border-b-0">
                      <td className="py-4 px-4 font-medium">{r.mssv}</td>
                      <td className="py-4 px-4">
                        <div className="font-medium">{r.name}</div>
                        <div className="text-sm text-gray-500">{r.email}</div>
                      </td>
                      <td className="py-4 px-4">{r.dept}</td>
                      <td className="py-4 px-4">
                        <div className="inline-block px-3 py-1 rounded-full bg-gray-50 border text-sm font-medium">
                          {r.course}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {r.courseName}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {r.issue}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm ${
                            r.priority === "Cao"
                              ? "bg-red-50 text-red-600"
                              : r.priority === "Trung bình"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {r.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm ${
                            r.status === "Đã duyệt"
                              ? "bg-green-50 text-green-700"
                              : r.status === "Chờ duyệt"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Users tab */}
      {activeTab === "users" && (
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Quản Lý Người Dùng
            </h2>
            <p className="text-gray-600 mt-2 mb-4">
              Tìm kiếm và quản lý tài khoản người dùng trong hệ thống
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4">
                  👥
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {users.filter((u) => u.role === "student").length}
                  </div>
                  <div className="text-sm text-gray-600">Sinh viên</div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mr-4">
                  🧑‍🏫
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {users.filter((u) => u.role === "tutor").length}
                  </div>
                  <div className="text-sm text-gray-600">Giảng viên</div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center">
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mr-4">
                  🚫
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {users.filter((u) => u.status === "Đã chặn").length}
                  </div>
                  <div className="text-sm text-gray-600">Đã chặn</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm theo tên hoặc email..."
                className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="text-left text-sm text-gray-600 border-b">
                    <th className="py-3 px-4">Tên</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Vai trò</th>
                    <th className="py-3 px-4">Trạng thái</th>
                    <th className="py-3 px-4">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b last:border-b-0">
                      <td className="py-4 px-4">{u.name}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {u.email}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 text-sm rounded-full ${
                            u.role === "tutor"
                              ? "bg-black text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {u.role === "tutor" ? "Giảng viên" : "Sinh viên"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 text-sm rounded-full ${
                            u.status === "Hoạt động"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {u.status === "Hoạt động" ? "Hoạt động" : "Đã chặn"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {u.status === "Hoạt động" ? (
                          <button
                            onClick={() => toggleUserBlock(u.id)}
                            className="px-3 py-1 rounded-lg border border-red-200 text-red-600"
                          >
                            🚫 Chặn
                          </button>
                        ) : (
                          <button
                            onClick={() => toggleUserBlock(u.id)}
                            className="px-3 py-1 rounded-lg border border-green-200 text-green-600"
                          >
                            ✅ Mở chặn
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Create modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Tạo Kỳ Đăng Ký Mới
              </h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Mã kỳ"
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tên kỳ"
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  placeholder="Năm học"
                  className="w-full px-3 py-2 border rounded"
                />
                <select
                  name="semesterNumber"
                  value={formData.semesterNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value={1}>Kỳ 1</option>
                  <option value={2}>Kỳ 2</option>
                  <option value={3}>Kỳ hè</option>
                </select>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Tạo kỳ mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
