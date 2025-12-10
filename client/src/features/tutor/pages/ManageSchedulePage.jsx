import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Plus,
  Clock,
  User,
  Video,
  MapPin,
  Edit,
  Trash2,
  X,
  BookOpen,
} from "lucide-react";
import { tutorService } from "@/service/tutor.service";
import { toast } from "react-toastify";

const ScheduleModal = ({ isOpen, onClose, onSubmit, initialData, subjects }) => {
  const [formData, setFormData] = useState({
    subjectId: "",
    day: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "online",
    classType: "1-1",
    link: "",
    location: "",
    isRecurring: false,
    capacity: 1,
  });
  const [errors, setErrors] = useState({});

  // Hàm mapping ngày sang thứ
  const getDayOfWeek = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const dayIndex = date.getDay(); // 0 = Chủ nhật, 1 = Thứ 2, ...
    const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    return days[dayIndex];
  };

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        subjectId: initialData.subjectId?._id || initialData.subjectId || "",
        day: initialData.dayOfWeek || "",
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : "",
        startTime: initialData.startTime || "",
        endTime: initialData.endTime || "",
        type: initialData.location?.type || "online",
        classType: initialData.capacity > 1 ? "group" : "1-1",
        link: initialData.location?.type === 'online' ? initialData.location.room : "",
        location: initialData.location?.type === 'offline' ? initialData.location.room : "",
        isRecurring: false, // Không cho sửa recurring
        capacity: initialData.capacity || 1,
      });
    } else {
      setFormData({
        subjectId: subjects.length > 0 ? subjects[0]._id : "",
        day: "",
        date: "",
        startTime: "",
        endTime: "",
        type: "online",
        classType: "1-1",
        link: "",
        location: "",
        isRecurring: false,
        capacity: 1,
      });
    }
    setErrors({});
  }, [initialData, isOpen, subjects]);

  // Cập nhật thứ khi chọn ngày
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const dayOfWeek = getDayOfWeek(selectedDate);
    setFormData({
      ...formData,
      date: selectedDate,
      day: dayOfWeek
    });
    if (selectedDate) setErrors({ ...errors, date: null });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.subjectId) newErrors.subjectId = "Vui lòng chọn môn học";
    if (!formData.date) newErrors.date = "Vui lòng chọn ngày";
    if (!formData.startTime) newErrors.startTime = "Vui lòng chọn giờ bắt đầu";
    if (!formData.endTime) newErrors.endTime = "Vui lòng chọn giờ kết thúc";

    if (formData.type === "online" && !formData.link) {
      newErrors.link = "Vui lòng nhập link meeting";
    }
    if (formData.type === "offline" && !formData.location) {
      newErrors.location = "Vui lòng nhập địa điểm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const submitData = {
        ...formData,
        capacity: formData.classType === "group" ? 5 : 1, // Default group size 5
      };
      onSubmit(submitData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl mx-4 overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Chỉnh sửa lịch rảnh" : "Thêm lịch rảnh mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Subject Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Môn học *
            </label>
            <select
              value={formData.subjectId}
              onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
              className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.subjectId ? "border-red-500" : "border-gray-300"
                }`}
              disabled={!!initialData} // Không cho sửa môn học khi edit
            >
              <option value="">Chọn môn học</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.code} - {subject.name}
                </option>
              ))}
            </select>
            {errors.subjectId && (
              <p className="text-red-500 text-xs mt-1">{errors.subjectId}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date picker */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Chọn ngày *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={handleDateChange}
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.date ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>

            {/* Day of week (auto-filled) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Thứ trong tuần
              </label>
              <input
                type="text"
                value={formData.day}
                readOnly
                placeholder="----------------------------------------"
                className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Start Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Giờ bắt đầu *
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => {
                  setFormData({ ...formData, startTime: e.target.value });
                  if (e.target.value) setErrors({ ...errors, startTime: null });
                }}
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.startTime ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.startTime && (
                <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
              )}
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Giờ kết thúc *
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => {
                  setFormData({ ...formData, endTime: e.target.value });
                  if (e.target.value) setErrors({ ...errors, endTime: null });
                }}
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.endTime ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.endTime && (
                <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
              )}
            </div>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Hình thức *
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="online">🎥 Online</option>
              <option value="offline">📍 Offline</option>
            </select>
          </div>

          {/* Class Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Loại buổi học *
            </label>
            <select
              value={formData.classType}
              onChange={(e) =>
                setFormData({ ...formData, classType: e.target.value })
              }
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="1-1">👤 1-1</option>
              <option value="group">👥 Nhóm</option>
            </select>
          </div>

          {/* Meeting Link or Location */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {formData.type === "online" ? "Link meeting *" : "Địa điểm *"}
            </label>
            {formData.type === "online" ? (
              <input
                type="text"
                value={formData.link}
                onChange={(e) => {
                  setFormData({ ...formData, link: e.target.value });
                  if (e.target.value) setErrors({ ...errors, link: null });
                }}
                placeholder="https://meet.google.com/abc-defg-hij"
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.link ? "border-red-500" : "border-gray-300"
                  }`}
              />
            ) : (
              <input
                type="text"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  if (e.target.value) setErrors({ ...errors, location: null });
                }}
                placeholder="Nhập địa điểm học (VD: Phòng H1-101, CS1)"
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.location ? "border-red-500" : "border-gray-300"
                  }`}
              />
            )}
            {errors.link && formData.type === "online" && (
              <p className="text-red-500 text-xs mt-1">{errors.link}</p>
            )}
            {errors.location && formData.type === "offline" && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>

          {/* Recurring Checkbox */}
          {!initialData && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="recurring"
                checked={formData.isRecurring}
                onChange={(e) =>
                  setFormData({ ...formData, isRecurring: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="recurring"
                className="text-sm font-medium text-gray-700"
              >
                Lặp lại hàng tuần (4 tuần tiếp theo)
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 font-medium transition-colors"
          >
            {initialData ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageSchedulePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
    fetchSlots();
  }, []);

  useEffect(() => {
    fetchSlots();
  }, [selectedSubject]);

  const fetchSubjects = async () => {
    try {
      const res = await tutorService.getMySubjects();
      if (res.success) {
        setSubjects(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    }
  };

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedSubject !== "all") {
        params.subjectId = selectedSubject;
      }
      const res = await tutorService.getMySlots(params);
      if (res.success) {
        setSchedules(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch slots:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSchedule = async (formData) => {
    try {
      if (editingSchedule) {
        // Update existing schedule
        const res = await tutorService.updateSlot(editingSchedule._id, formData);
        if (res.success) {
          toast.success("Cập nhật lịch thành công!");
          fetchSlots();
        }
      } else {
        // Add new schedule
        const res = await tutorService.createSlot(formData);
        if (res.success) {
          toast.success(res.message || "Thêm lịch thành công!");
          fetchSlots();
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error("Failed to save schedule:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const handleEditClick = (schedule) => {
    setEditingSchedule(schedule);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setEditingSchedule(null);
    setShowModal(true);
  };

  const handleDeleteSchedule = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch này không?")) {
      try {
        const res = await tutorService.deleteSlot(id);
        if (res.success) {
          toast.success("Xóa lịch thành công!");
          fetchSlots();
        }
      } catch (error) {
        console.error("Failed to delete schedule:", error);
        toast.error(error.response?.data?.message || "Có lỗi xảy ra");
      }
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await tutorService.toggleSlotStatus(id);
      if (res.success) {
        toast.success("Cập nhật trạng thái thành công!");
        fetchSlots();
      }
    } catch (error) {
      console.error("Failed to toggle status:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const stats = [
    {
      label: "Tổng số lịch",
      value: schedules.length,
      icon: Calendar,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Đang mở",
      value: schedules.filter((s) => s.status === "AVAILABLE").length,
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      label: "Đã đóng",
      value: schedules.filter((s) => s.status === "CANCELLED").length,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quản Lý Lịch Rảnh
          </h1>
          <p className="text-gray-600 mt-2">
            Thiết lập và quản lý các khung giờ rảnh để sinh viên có thể đặt lịch
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Thêm lịch rảnh
        </button>
      </div>

      {/* Filter by Subject */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
        <BookOpen className="text-gray-500" size={20} />
        <span className="font-medium text-gray-700">Lọc theo môn học:</span>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">Tất cả môn học</option>
          {subjects.map((subject) => (
            <option key={subject._id} value={subject._id}>
              {subject.code} - {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4 shadow-sm"
          >
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* List Section */}
      {loading ? (
        <div className="text-center py-12">Đang tải dữ liệu...</div>
      ) : (
        <div className="space-y-8">
          {/* Open Schedules */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Lịch Rảnh Đang Mở (
              {schedules.filter((s) => s.status === "AVAILABLE").length})
            </h2>

            <div className="space-y-4">
              {schedules
                .filter((s) => s.status === "AVAILABLE")
                .map((schedule) => (
                  <div
                    key={schedule._id}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-4 flex-1">
                        {/* Tags */}
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
                            {schedule.subjectId?.code} - {schedule.subjectId?.name}
                          </span>
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                            {schedule.dayOfWeek}, {new Date(schedule.date).toLocaleDateString('vi-VN')}
                          </span>
                          <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                            Đang mở
                          </span>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
                          <div className="flex items-center gap-3 text-gray-600">
                            <Clock size={18} />
                            <span>
                              {schedule.startTime} - {schedule.endTime}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-gray-600">
                            {schedule.location?.type === "online" ? (
                              <Video size={18} />
                            ) : (
                              <MapPin size={18} />
                            )}
                            <span>
                              {schedule.location?.type === "online" ? "Online" : "Offline"}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-gray-600">
                            <User size={18} />
                            <span>
                              {schedule.capacity > 1
                                ? `Nhóm (${schedule.bookedCount}/${schedule.capacity})`
                                : "1-1"}
                            </span>
                          </div>

                          {schedule.location?.type === "online" ? (
                            <div className="text-gray-500 text-sm pl-8 truncate">
                              Link:{" "}
                              <a
                                href={schedule.location.room}
                                className="hover:text-blue-500 hover:underline"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {schedule.location.room}
                              </a>
                            </div>
                          ) : (
                            <div className="text-gray-600 pl-8">
                              {schedule.location?.room}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleToggleStatus(schedule._id)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                          title="Đóng lịch"
                        >
                          <XCircle size={20} />
                        </button>
                        <button
                          onClick={() => handleEditClick(schedule)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200"
                          title="Chỉnh sửa"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteSchedule(schedule._id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
                          title="Xóa"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Closed Schedules */}
          {schedules.filter((s) => s.status === "CANCELLED").length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Lịch Đã Đóng (
                {schedules.filter((s) => s.status === "CANCELLED").length})
              </h2>

              <div className="space-y-4">
                {schedules
                  .filter((s) => s.status === "CANCELLED")
                  .map((schedule) => (
                    <div
                      key={schedule._id}
                      className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-4 flex-1 opacity-75">
                          {/* Tags */}
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
                              {schedule.subjectId?.code} - {schedule.subjectId?.name}
                            </span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                              {schedule.dayOfWeek}, {new Date(schedule.date).toLocaleDateString('vi-VN')}
                            </span>
                            <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium">
                              Đã đóng
                            </span>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
                            <div className="flex items-center gap-3 text-gray-600">
                              <Clock size={18} />
                              <span>
                                {schedule.startTime} - {schedule.endTime}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-gray-600">
                              {schedule.location?.type === "online" ? (
                                <Video size={18} />
                              ) : (
                                <MapPin size={18} />
                              )}
                              <span>
                                {schedule.location?.type === "online"
                                  ? "Online"
                                  : "Offline"}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-gray-600">
                              <User size={18} />
                              <span>
                                {schedule.capacity > 1
                                  ? `Nhóm (${schedule.bookedCount}/${schedule.capacity})`
                                  : "1-1"}
                              </span>
                            </div>

                            {schedule.location?.type === "online" ? (
                              <div className="text-gray-500 text-sm pl-8 truncate">
                                Link:{" "}
                                <a
                                  href={schedule.location.room}
                                  className="hover:text-blue-500 hover:underline"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {schedule.location.room}
                                </a>
                              </div>
                            ) : (
                              <div className="text-gray-600 pl-8">
                                {schedule.location?.room}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => handleToggleStatus(schedule._id)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-gray-200"
                            title="Mở lại lịch"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            onClick={() => handleEditClick(schedule)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200"
                            title="Chỉnh sửa"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteSchedule(schedule._id)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
                            title="Xóa"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSaveSchedule}
        initialData={editingSchedule}
        subjects={subjects}
      />
    </div>
  );
};

export default ManageSchedulePage;