import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CourseTeachersPage() {
  const { id: semesterId, courseId } = useParams();
  const navigate = useNavigate();

  // mock course + teachers data
  const course = {
    id: courseId,
    code: courseId,
    name: "Cấu Trúc Dữ Liệu & Giải Thuật",
    desc: "Học về các cấu trúc dữ liệu cơ bản và thuật toán",
    semester: `HK1 2024-2025`,
    tutors: 2,
    students: 45,
  };

  const [teachers, setTeachers] = useState([
    {
      id: "t1",
      name: "TS. Nguyễn Văn An",
      email: "nguyen.vanan@hcmut.edu.vn",
      dept: "Khoa học Máy tính",
      students: 25,
    },
    {
      id: "t2",
      name: "PGS.TS. Trần Thị Bình",
      email: "tran.thibinh@hcmut.edu.vn",
      dept: "Khoa học Máy tính",
      students: 20,
    },
  ]);

  // add-teacher modal state and mock available teachers
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState("");
  const available = [
    {
      id: "t3",
      name: "ThS. Lê Văn Cường",
      email: "le.vancuong@hcmut.edu.vn",
      dept: "Khoa học Máy tính",
    },
    {
      id: "t4",
      name: "TS. Phạm Thị Dung",
      email: "pham.thidung@hcmut.edu.vn",
      dept: "Khoa học Máy tính",
    },
  ];

  const openAdd = () => {
    setSelected("");
    setShowAdd(true);
  };
  const closeAdd = () => setShowAdd(false);

  const handleAdd = (e) => {
    e.preventDefault();
    const sel = available.find((a) => a.id === selected);
    if (!sel) return;
    setTeachers((prev) => [
      ...prev,
      {
        id: sel.id,
        name: sel.name,
        email: sel.email,
        dept: sel.dept,
        students: 0,
      },
    ]);
    setShowAdd(false);
  };

  const removeTeacher = (tid) =>
    setTeachers((prev) => prev.filter((t) => t.id !== tid));

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
            Kỳ: {course.semester}
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
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.email}</div>
                  <div className="text-sm text-gray-500 mt-1">{t.dept}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    👥 {t.students} sinh viên đang hướng dẫn
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => removeTeacher(t.id)}
                  className="px-3 py-2 border rounded text-red-600"
                >
                  Xóa
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
        available={available}
        course={course}
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
                {available.map((a) => (
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
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={closeAll}
            className="px-4 py-2 border rounded"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={() => setDropdownOpen(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Thêm giảng viên
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
