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
                className={`mt-3 px-4 py-2 border rounded-lg ${s.status === "Đang mở"
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
