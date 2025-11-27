import React from "react";
import { useNavigate } from "react-router-dom";

export default function SemestersTab({
  semesters,
  showCreateForm,
  setShowCreateForm,
  formData,
  handleInputChange,
  handleSubmit,
  toggleSemesterStatus,
}) {
  const navigate = useNavigate();

  const navigateToSemesterCourses = (semesterId) => {
    // SPA navigation so location.state is preserved when coming back
    navigate(`/admin/semester/${semesterId}/courses`);
  };

  return (
    <div>
      {/* top row: System Online + stat cards */}
      <div className="mb-6">


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
            className="px-4 py-2 bg-green-600 text-white  rounded-lg"
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
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{s.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${s.statusColor}`}>
                    {s.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 font-medium mb-4">{s.code}</div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">📅</span>
                    <span>Bắt đầu: <span className="font-medium text-gray-900">{s.startDate}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">📅</span>
                    <span>Kết thúc: <span className="font-medium text-gray-900">{s.endDate}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">📚</span>
                    <span><span className="font-medium text-gray-900">{s.subjects}</span> môn học</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">👥</span>
                    <span><span className="font-medium text-gray-900">{s.students}</span> sinh viên</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-3 mt-4 md:mt-0 md:ml-6 w-full md:w-auto">
                <button
                  onClick={() => navigateToSemesterCourses(s.id)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  Quản lý môn học <span>→</span>
                </button>
                <button
                  onClick={() => toggleSemesterStatus(s.id)}
                  className={`px-4 py-2 border text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center ${s.status === "Đang mở"
                    ? "border-red-200 text-red-600 hover:bg-red-50"
                    : "border-green-200 text-green-600 hover:bg-green-50"
                    }`}
                >
                  {s.status === "Đang mở" ? "Đóng kỳ học" : "Mở kỳ học"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
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
              {/* Thông tin cơ bản */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">
                  Thông tin kỳ học
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Mã kỳ <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      placeholder="VD: 2024-1"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Tên kỳ <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="VD: Học kỳ 1 năm 2024-2025"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Năm học <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleInputChange}
                      placeholder="VD: 2024-2025"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Học kỳ số <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="semesterNumber"
                      value={formData.semesterNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value={1}>Học kỳ 1</option>
                      <option value={2}>Học kỳ 2</option>
                      <option value={3}>Học kỳ hè</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Ngày bắt đầu kỳ học <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Ngày kết thúc kỳ học <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Thời gian khảo sát */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">
                  Thời gian khảo sát đăng ký
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Ngày bắt đầu khảo sát <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDateSurvey"
                      value={formData.startDateSurvey}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Ngày kết thúc khảo sát <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDateSurvey"
                      value={formData.endDateSurvey}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
