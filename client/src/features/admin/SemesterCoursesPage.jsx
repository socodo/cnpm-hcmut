import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminService } from "../../service/admin.service";

export default function SemesterCoursesPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [semester, setSemester] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSemesterAndCourses = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllSubject(id);
      if (response.success) {
        // Set semester info
        if (response.data.semester) {
          setSemester({
            id: response.data.semester._id,
            code: response.data.semester.code,
            name: response.data.semester.name,
            status: response.data.semester.status === 'ACTIVE' ? "Đang mở" : "Đã đóng",
            startDate: response.data.semester.startDate?.split('T')[0],
            endDate: response.data.semester.endDate?.split('T')[0],
          });
        }
        // Set courses
        const formattedCourses = (response.data.subjects || []).map(c => ({
          id: c._id,
          code: c.code,
          name: c.name,
          desc: c.description || "",
          tutors: c.tutorCount || 0,
          students: c.studentCount || 0,
        }));
        setCourses(formattedCourses);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
      toast.error("Không thể tải danh sách môn học");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesterAndCourses();
  }, [id]);

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

  const handleCreate = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.code.trim()) errs.code = "Mã môn học là bắt buộc";
    if (!form.name.trim()) errs.name = "Tên môn học là bắt buộc";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      const payload = {
        code: form.code.trim(),
        name: form.name.trim(),
        description: form.desc.trim(),
      };
      const response = await adminService.createSubject(id, payload);
      if (response.success) {
        toast.success("Tạo môn học thành công!");
        setShowCreate(false);
        fetchSemesterAndCourses(); // Fetch lại danh sách
      }
    } catch (error) {
      console.error("Failed to create subject", error);
      toast.error(error.message || "Không thể tạo môn học");
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  if (!semester) {
    return (
      <div className="p-6">
        <div className="text-red-500">Không tìm thấy kỳ học</div>
        <button
          onClick={() => navigate("/admin", { state: { tab: "semesters" } })}
          className="mt-4 px-3 py-2 border rounded"
        >
          ← Quay lại
        </button>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
                <h2 className="text-3xl font-bold">{semester.code}</h2>
                <div className="inline-block px-3 py-1 rounded-full text-sm text-green-700 bg-green-50">
                  {semester.status}
                </div>
              </div>
              <p className="text-gray-600 mt-2">
                Quản lý môn học trong kỳ {semester.code}
              </p>
              <div className="text-sm text-gray-500 mt-1">
                {semester.startDate} - {semester.endDate}
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
              {courses.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  Chưa có môn học nào trong kỳ này
                </div>
              ) : (
                courses.map((c) => (
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
                ))
              )}
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
                  Thêm môn học vào kỳ {semester.code}
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
