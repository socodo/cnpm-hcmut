import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SemesterCoursesPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // simple mock data (in real app replace with API call)
  const semesters = [
    {
      id: "1",
      code: "HK1 2024-2025",
      status: "Đang mở",
      startDate: "2024-09-01",
      endDate: "2025-01-15",
    },
    {
      id: "2",
      code: "HK2 2023-2024",
      status: "Đã đóng",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
    },
  ];

  const coursesBySemester = {
    1: [
      {
        id: "CO2003",
        code: "CO2003",
        name: "Cấu Trúc Dữ Liệu & Giải Thuật",
        desc: "Học về các cấu trúc dữ liệu cơ bản và thuật toán",
        tutors: 2,
        students: 45,
      },
      {
        id: "CO3001",
        code: "CO3001",
        name: "Cơ Sở Dữ Liệu",
        desc: "Thiết kế và quản lý cơ sở dữ liệu",
        tutors: 1,
        students: 38,
      },
    ],
    2: [
      {
        id: "CO1001",
        code: "CO1001",
        name: "Nhập Môn Tin Học",
        desc: "Kiến thức cơ bản về tin học",
        tutors: 1,
        students: 120,
      },
    ],
  };

  const sem = semesters.find((s) => s.id === id) || semesters[0];
  const [courses, setCourses] = useState(coursesBySemester[id] || []);
  const totalTutors = courses.reduce((acc, c) => acc + (c.tutors || 0), 0);
  const totalStudents = courses.reduce((acc, c) => acc + (c.students || 0), 0);

  const openManageTeachers = (courseId) =>
    navigate(`/admin/semester/${id}/course/${courseId}/teachers`);

  // create course modal state
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ code: "", name: "", desc: "" });
  const [errors, setErrors] = useState({});

  const openCreate = () => {
    setForm({ code: "", name: "", desc: "" });
    setErrors({});
    setShowCreate(true);
  };
  const closeCreate = () => setShowCreate(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCreate = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.code.trim()) errs.code = "Mã môn học là bắt buộc";
    if (!form.name.trim()) errs.name = "Tên môn học là bắt buộc";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const newCourse = {
      id: form.code.trim(),
      code: form.code.trim(),
      name: form.name.trim(),
      desc: form.desc.trim(),
      tutors: 0,
      students: 0,
    };
    setCourses((prev) => [newCourse, ...prev]);
    setShowCreate(false);
  };

  return (
    <>
      <div className="p-6">
        {/* separate back button aligned left */}
        <div className="flex justify-start mb-3">
          <button
            onClick={() => navigate("/admin", { state: { tab: "semesters" } })}
            className="px-3 py-2 border rounded"
          >
            ← Quay lại
          </button>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-3xl font-bold">{sem.code}</h2>
                <div className="inline-block px-3 py-1 rounded-full text-sm text-green-700 bg-green-50">
                  {sem.status}
                </div>
              </div>
              <p className="text-gray-600 mt-2">
                Quản lý môn học trong kỳ {sem.code}
              </p>
              <div className="text-sm text-gray-500 mt-1">
                {sem.startDate} - {sem.endDate}
              </div>
            </div>
            {/* empty right-side slot removed; '+ Tạo Môn Học' moved below the stat cards to match design */}
            <div />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="p-4 bg-gray-50 rounded shadow-sm flex items-center">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4">
                📘
              </div>
              <div>
                <div className="text-2xl font-semibold">{courses.length}</div>
                <div className="text-sm text-gray-600">Môn học</div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded shadow-sm flex items-center">
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mr-4">
                🧑‍🏫
              </div>
              <div>
                <div className="text-2xl font-semibold">{totalTutors}</div>
                <div className="text-sm text-gray-600">Giảng viên</div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded shadow-sm flex items-center">
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mr-4">
                👥
              </div>
              <div>
                <div className="text-2xl font-semibold">{totalStudents}</div>
                <div className="text-sm text-gray-600">Sinh viên đăng ký</div>
              </div>
            </div>
          </div>
          {/* place the create button under the stat cards (under the 3rd card) */}
          <div className="mt-4 flex justify-end md:justify-end">
            <button
              onClick={openCreate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              + Tạo Môn Học
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Danh Sách Môn Học</h3>
            <div className="space-y-4">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-lg border p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-4">
                      <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border text-sm font-medium">
                        {c.code}
                      </div>
                      <div className="text-lg font-medium">{c.name}</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">{c.desc}</div>
                    <div className="mt-3 text-sm text-gray-500 flex items-center space-x-4">
                      <div>👩‍🏫 {c.tutors} giảng viên</div>
                      <div>👥 {c.students} sinh viên</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openManageTeachers(c.id)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                      Quản lý GV →
                    </button>
                    <button className="px-3 py-2 border rounded">✏️</button>
                    <button className="px-3 py-2 border rounded text-red-600">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create course modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={closeCreate}
          />
          <form
            onSubmit={handleCreate}
            className="relative bg-white rounded-lg shadow-xl w-[min(700px,92%)] p-6 z-10"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">Tạo Môn Học Mới</h2>
                <div className="text-gray-500 mt-1">
                  Thêm môn học vào kỳ {sem.code}
                </div>
              </div>
              <button
                type="button"
                onClick={closeCreate}
                className="text-gray-500 text-xl"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Mã môn học *
                </label>
                <input
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="VD: CO3005"
                />
                {errors.code && (
                  <div className="text-sm text-red-600 mt-1">{errors.code}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Tên môn học *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="VD: Phân tích thiết kế hệ thống"
                />
                {errors.name && (
                  <div className="text-sm text-red-600 mt-1">{errors.name}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Mô tả</label>
                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2 h-28"
                  placeholder="Mô tả ngắn gọn về môn học..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeCreate}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Tạo môn học
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
