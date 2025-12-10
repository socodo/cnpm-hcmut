import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SemestersTab from "./tabs/SemestersTab";
import SurveyTab from "./tabs/SurveyTab";
import UsersTab from "./tabs/UsersTab";
import { adminService } from "../../service/admin.service";

export default function AdminDashboard() {
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
    startDateSurvey: "",
    endDateSurvey: "",
  });

  const [semesters, setSemesters] = useState([]);

  const fetchSemesters = async () => {
    try {
      const response = await adminService.getAllSemesters();

      if (response.success) {
        const formattedSemesters = response.data.map(s => ({
          id: s._id,
          name: s.name,
          code: s.code,
          status: s.status === 'ACTIVE' ? "Đang mở" : "Đã đóng",
          startDate: s.startDate.split('T')[0],
          endDate: s.endDate.split('T')[0],
          subjects: 0, // Placeholder
          students: 0, // Placeholder
          statusColor: s.status === 'ACTIVE' ? "text-green-600 bg-green-50" : "text-gray-600 bg-gray-50",
        }));
        setSemesters(formattedSemesters);
      }
    } catch (error) {
      console.error("Failed to fetch semesters", error);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminService.createSemester(formData);
      // Kiểm tra response.success hoặc response.data.success tùy theo cách API trả về
      if (response.success || response.data?.success) {
        toast.success("Tạo kỳ đăng ký thành công!");
        fetchSemesters();
        setFormData({
          code: "",
          name: "",
          academicYear: "",
          semesterNumber: 1,
          startDate: "",
          endDate: "",
          startDateSurvey: "",
          endDateSurvey: "",
        });
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error("Failed to create semester", error);
      toast.error(error.response?.data?.message || "Không thể tạo kỳ đăng ký");
    }
  };

  const toggleSemesterStatus = async (id) => {
    const semester = semesters.find(s => s.id === id);
    if (!semester) return;

    const isClosing = semester.status === "Đang mở";
    const newStatus = isClosing ? "COMPLETED" : "ACTIVE";

    try {
      const response = await adminService.updateSemesterStatus(id, newStatus);
      if (response.success) {
        const message = isClosing ? "Đóng kỳ học thành công!" : "Mở kỳ học thành công!";
        toast.success(message);
        fetchSemesters();
      }
    } catch (error) {
      console.error("Failed to update semester status", error);
      toast.error(error.response?.data?.message || "Không thể cập nhật trạng thái kỳ học");
    }
  };

  const handleDeleteSemester = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa kỳ học này không? Tất cả môn học liên quan sẽ bị xóa.")) return;
    try {
      const response = await adminService.deleteSemester(id);
      if (response.success) {
        toast.success("Xóa kỳ học thành công!");
        fetchSemesters();
      }
    } catch (error) {
      console.error("Failed to delete semester", error);
      toast.error(error.response?.data?.message || "Không thể xóa kỳ học");
    }
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

  return (
    <div className="p-6 space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{headerTitle}</h1>
          <p className="text-gray-500 mt-2">{headerSubtitle}</p>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setActiveTab("semesters")}
            className={`px-3 py-1 rounded ${activeTab === "semesters" ? "bg-blue-600 text-white" : "border"
              }`}
          >
            Quản Lý Kỳ Đăng Ký
          </button>
          <button
            onClick={() => setActiveTab("survey")}
            className={`px-3 py-1 rounded ${activeTab === "survey" ? "bg-blue-600 text-white" : "border"
              }`}
          >
            Khảo Sát & Thống Kê
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-3 py-1 rounded ${activeTab === "users" ? "bg-blue-600 text-white" : "border"
              }`}
          >
            Quản Lý Người Dùng
          </button>
        </div>
      </div>

      {activeTab === "semesters" && (
        <SemestersTab
          semesters={semesters}
          showCreateForm={showCreateForm}
          setShowCreateForm={setShowCreateForm}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          toggleSemesterStatus={toggleSemesterStatus}
          handleDeleteSemester={handleDeleteSemester}
        />
      )}

      {activeTab === "survey" && <SurveyTab semesters={semesters} />}

      {activeTab === "users" && <UsersTab />}
    </div>
  );
}
