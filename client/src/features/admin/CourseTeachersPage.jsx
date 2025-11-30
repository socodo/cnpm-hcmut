import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminService } from "../../service/admin.service";

export default function CourseTeachersPage() {
  const { id: semesterId, courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableTutors, setAvailableTutors] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch course (subject) info và danh sách tutors từ API
  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const response = await adminService.getSubjectById(courseId);
      if (response.success) {
        const subjectData = response.data;
        setCourse({
          id: subjectData._id,
          code: subjectData.code,
          name: subjectData.name,
          desc: subjectData.description || "Chưa có mô tả",
          semester: subjectData.semesterId?.name || "Đang tải...",
          department: subjectData.department,
          faculty: subjectData.faculty,
          credits: subjectData.credits,
          tutors: subjectData.tutorIds?.length || 0,
          students: 0,
        });

        // Set teachers từ tutorIds đã được populate
        if (subjectData.tutorIds && subjectData.tutorIds.length > 0) {
          const tutorsList = subjectData.tutorIds.map((tutor) => ({
            id: tutor._id,
            name: tutor.displayName || tutor.fullName,
            email: tutor.email,
            dept: subjectData.department || "Khoa học Máy tính",
            students: 0,
          }));
          setTeachers(tutorsList);
          console.log("Tutors List:", tutorsList);
        } else {
          setTeachers([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch course data", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch danh sách tất cả users có role TUTOR
  const fetchAvailableTutors = async () => {
    try {
      const response = await adminService.getAllUsers();
      if (response.success) {
        // Lọc ra những user có role TUTOR và chưa được gán cho môn học này
        const tutors = response.data.filter(
          (user) =>
            user.roles?.includes("TUTOR") &&
            !teachers.some((t) => t.id === user._id)
        );
        setAvailableTutors(
          tutors.map((tutor) => ({
            id: tutor._id,
            name: tutor.displayName,
            email: tutor.email,
            dept: tutor.tutor?.department || "Khoa học Máy tính",
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch available tutors", error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    if (!loading) {
      fetchAvailableTutors();
    }
  }, [loading, teachers]);

  // add-teacher modal state
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState("");

  const openAdd = () => {
    setSelected("");
    setShowAdd(true);
  };
  const closeAdd = () => setShowAdd(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!selected) return;

    try {
      setActionLoading(true);
      const response = await adminService.assignTutorToSubject(courseId, selected);
      if (response.success) {
        // Refresh data sau khi thêm thành công
        await fetchCourseData();
        setShowAdd(false);
      } else {
        alert(response.message || "Không thể thêm giảng viên");
      }
    } catch (error) {
      console.error("Failed to add tutor", error);
      alert(error.response?.data?.message || "Lỗi khi thêm giảng viên");
    } finally {
      setActionLoading(false);
    }
  };

  const removeTeacher = async (tutorId) => {
    if (!confirm("Bạn có chắc muốn xóa giảng viên này khỏi môn học?")) return;

    try {
      setActionLoading(true);
      const response = await adminService.removeTutorFromSubject(courseId, tutorId);
      if (response.success) {
        // Refresh data sau khi xóa thành công
        await fetchCourseData();
      } else {
        alert(response.message || "Không thể xóa giảng viên");
      }
    } catch (error) {
      console.error("Failed to remove tutor", error);
      alert(error.response?.data?.message || "Lỗi khi xóa giảng viên");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate(`/admin/semester/${semesterId}/courses`)}
          className="px-3 py-2 border rounded mb-4"
        >
          ← Quay lại
        </button>
        <div className="text-red-500">Không tìm thấy môn học</div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate(`/admin/semester/${semesterId}/courses`)}
              className="px-3 py-2 border rounded"
            >
              ← Quay lại
            </button>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border text-sm font-medium">
              {course.code}
            </div>
            <h1 className="text-3xl font-bold">{course.name}</h1>
          </div>
          <div className="text-gray-600 mt-2">{course.desc}</div>
          <div className="text-sm text-gray-500 mt-1">
            Kỳ: {course.semester} • {course.credits} tín chỉ • {course.department}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded shadow-sm flex items-center">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4">
              👥
            </div>
            <div>
              <div className="text-2xl font-semibold">{teachers.length}</div>
              <div className="text-sm text-gray-600">Giảng viên</div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded shadow-sm flex items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mr-4">
                👥
              </div>
              <div>
                <div className="text-2xl font-semibold">{course.students}</div>
                <div className="text-sm text-gray-600">Sinh viên đăng ký</div>
              </div>
            </div>
          </div>
        </div>

        {/* removed duplicate add-teacher button - only header button remains */}

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Danh Sách Giảng Viên</h3>
          <div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={openAdd}
            >
              + Thêm Giảng Viên
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {teachers.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-lg border p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold mr-4">
                  {(t.name || "?").charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{t.name || "Chưa có tên"}</div>
                  <div className="text-sm text-gray-500">{t.email || "Chưa có email"}</div>
                  <div className="text-sm text-gray-500 mt-1">{t.dept || ""}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    👥 {t.students || 0} sinh viên đang hướng dẫn
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => removeTeacher(t.id)}
                  className="px-3 py-2 border rounded text-red-600 disabled:opacity-50"
                  disabled={actionLoading}
                >
                  {actionLoading ? "...Đang xử lý" : "Xóa"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddTeacherModal
        show={showAdd}
        onClose={closeAdd}
        onSubmit={handleAdd}
        selected={selected}
        setSelected={setSelected}
        available={availableTutors}
        course={course}
        loading={actionLoading}
      />
    </>
  );
}

// add-teacher modal
function AddTeacherModal({
  show,
  onClose,
  onSubmit,
  selected,
  setSelected,
  available,
  course,
  loading,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  if (!show) return null;
  const closeAll = () => {
    setDropdownOpen(false);
    onClose();
  };
  const handleSelect = (id) => {
    setSelected(id);
    setDropdownOpen(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={closeAll}
      />
      <form
        onSubmit={onSubmit}
        className="relative bg-white rounded-lg shadow-xl w-[min(600px,92%)] p-6 z-10"
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">Thêm Giảng Viên</h2>
            <div className="text-gray-500 mt-1">
              Chọn giảng viên để thêm vào môn {course.code} - {course.name}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 text-xl"
          >
            ×
          </button>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium">Chọn giảng viên</label>
          {/* custom dropdown to show multi-line items */}
          <div className="relative mt-2">
            <button
              type="button"
              onClick={() => setDropdownOpen((s) => !s)}
              className="w-full text-left border rounded px-3 py-2 flex justify-between items-center"
            >
              <span className="text-gray-600">
                {selected
                  ? available.find((a) => a.id === selected)?.name
                  : "Chọn giảng viên"}
              </span>
              <span className="opacity-60">▾</span>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow max-h-48 overflow-auto z-20">
                {available.length === 0 ? (
                  <div className="px-3 py-2 text-gray-500 text-center">
                    Không có giảng viên khả dụng
                  </div>
                ) : (
                  available.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => handleSelect(a.id)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="font-medium">{a.name}</div>
                      <div className="text-sm text-gray-500">
                        {a.dept} • {a.email}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={closeAll}
            className="px-4 py-2 border rounded"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={() => setDropdownOpen(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={loading || !selected}
          >
            {loading ? "Đang thêm..." : "Thêm giảng viên"}
          </button>
        </div>
      </form>
    </div>
  );
}

// render the modal at module scope by re-exporting a wrapper component that can access local state via props
export function CourseTeachersModalWrapper(props) {
  return <AddTeacherModal {...props} />;
}
