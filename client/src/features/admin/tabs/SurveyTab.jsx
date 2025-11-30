import React, { useState } from "react";

export default function SurveyTab({ semesters }) {
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

  return (
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
                      className={`inline-block px-3 py-1 rounded-full text-sm ${r.priority === "Cao"
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
                      className={`inline-block px-3 py-1 rounded-full text-sm ${r.status === "Đã duyệt"
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
  );
}
