import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SemestersTab from "./tabs/SemestersTab";
import SurveyTab from "./tabs/SurveyTab";
import UsersTab from "./tabs/UsersTab";

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
  });

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
        />
      )}

      {activeTab === "survey" && <SurveyTab semesters={semesters} />}

      {activeTab === "users" && <UsersTab />}
    </div>
  );
}
