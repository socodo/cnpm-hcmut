import React, { useState, useEffect } from "react";
import { adminService } from "@/service/admin.service";
import { toast } from "react-toastify";

export default function SurveyTab({ semesters }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSemester, setActiveSemester] = useState(null);

  useEffect(() => {
    fetchActiveSemesterRequests();
  }, []);

  const fetchActiveSemesterRequests = async () => {
    try {
      setLoading(true);
      const response = await adminService.getActiveSemesterRequests();
      if (response.success) {
        setActiveSemester(response.data.semester);
        const formattedRequests = response.data.requests.map(req => ({
          id: req._id,
          mssv: req.studentId?.student?.studentId || 'N/A',
          name: req.studentId?.displayName || 'Unknown',
          email: req.studentId?.email || 'N/A',
          dept: req.studentId?.student?.faculty || 'N/A',
          course: req.problem,
          courseName: req.problem,
          issue: req.problemDetail || req.problem,
          priority: req.sessionType === 'ONE_ON_ONE' ? 'Cao' : 'Trung bình',
          status: req.status === 'OPEN' ? 'Chờ duyệt' : 'Đã duyệt',
          date: new Date(req.createdAt).toISOString().split('T')[0],
          preferredMode: req.preferredMode,
          sessionType: req.sessionType,
          reason: req.reason,
          learningGoals: req.learningGoals,
        }));
        setRegistrations(formattedRequests);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      toast.error('Không thể tải danh sách đăng ký');
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

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
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold">Thống kê nhanh</h3>
            {activeSemester && (
              <p className="text-sm text-gray-600 mt-1">
                Kỳ học: {activeSemester.name} ({activeSemester.code})
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="p-4 bg-gray-50 rounded">
                Tổng đăng ký:{" "}
                <div className="text-2xl font-bold">{registrations.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Đăng ký chi tiết</h3>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
              <div className="flex-1">
                <input
                  placeholder="Tìm kiếm theo tên, môn học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50"
                />
              </div>
              <div className="flex-shrink-0 mt-3 md:mt-0">
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
                    <th className="py-3 px-4">Sinh viên</th>
                    <th className="py-3 px-4">Khoa</th>
                    <th className="py-3 px-4">Môn học</th>
                    <th className="py-3 px-4">Vấn đề</th>
                    <th className="py-3 px-4">Ngày đăng ký</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((r) => (
                    <tr key={r.id} className="border-b last:border-b-0">
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
                      <td className="py-4 px-4">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
