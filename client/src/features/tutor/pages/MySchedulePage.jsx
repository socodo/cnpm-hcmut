import React, { useState } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Video,
  MessageSquare,
  X,
  ExternalLink,
  FileText,
  Star,
} from "lucide-react";

const FeedbackModal = ({ isOpen, onClose, session }) => {
  const [rating, setRating] = useState(4); // Default to 'Tốt' as per screenshot
  const [comment, setComment] = useState("");

  if (!isOpen || !session) return null;

  const ratings = [
    { value: 5, label: "Xuất sắc" },
    { value: 4, label: "Tốt" },
    { value: 3, label: "Trung bình" },
    { value: 2, label: "Cần cải thiện" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Nhận Xét Sinh Viên
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Nhận xét cho sinh viên {session.studentName} - {session.subject}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Rating Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Đánh giá mức độ tiếp thu
            </h3>
            <div className="space-y-3">
              {ratings.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="rating"
                      value={option.value}
                      checked={rating === option.value}
                      onChange={() => setRating(option.value)}
                      className="peer sr-only"
                    />
                    <div className="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-black peer-checked:border-[5px] transition-all" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= option.value
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {option.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Nhận xét chi tiết
            </h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Nhập nhận xét về quá trình học tập, điểm mạnh, điểm cần cải thiện..."
              className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm placeholder:text-gray-400"
            />
            <p className="text-xs text-gray-500 mt-2">
              Nhận xét sẽ được gửi đến sinh viên sau khi lưu
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              // Handle save logic here
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 transition-colors"
          >
            Lưu nhận xét
          </button>
        </div>
      </div>
    </div>
  );
};

const MySchedulePage = () => {
  const [activeMainTab, setActiveMainTab] = useState("approved"); // 'approved' | 'pending'
  const [activeSubTab, setActiveSubTab] = useState("upcoming"); // 'upcoming' | 'completed' | 'cancelled'
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleEditFeedback = (session) => {
    setSelectedSession(session);
    setShowFeedbackModal(true);
  };

  // Mock Data
  const stats = [
    {
      id: "upcoming",
      label: "Sắp tới",
      count: 4,
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      id: "completed",
      label: "Hoàn thành",
      count: 1,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      borderColor: "border-green-100",
    },
    {
      id: "pending",
      label: "Chờ duyệt",
      count: 1,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      borderColor: "border-yellow-100",
    },
    {
      id: "cancelled",
      label: "Đã hủy",
      count: 1,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      borderColor: "border-red-100",
    },
  ];

  const sessions = [
    {
      id: 1,
      studentName: "Lê Thị C",
      mssv: "2013456",
      avatar: "C",
      avatarColor: "bg-cyan-500",
      subject: "Cấu Trúc Dữ Liệu & Giải Thuật",
      topic: "Đồ thị - BFS/DFS",
      date: "2025-10-15",
      time: "09:00 - 11:00",
      type: "offline",
      location: "Phòng H1-101, CS1",
      status: "approved",
      subStatus: "upcoming",
      statusText: "Đã xác nhận",
    },
    {
      id: 2,
      studentName: "Phạm Minh D",
      mssv: "2011234",
      avatar: "D",
      avatarColor: "bg-sky-500",
      subject: "Lập Trình Thi Đấu",
      topic: "Quy hoạch động",
      date: "2025-10-16",
      time: "15:00 - 17:00",
      type: "online",
      meetingLink: "https://meet.google.com/xyz-uvwx-rst",
      status: "approved",
      subStatus: "upcoming",
      statusText: "Đã xác nhận",
    },
    {
      id: 3,
      studentName: "Nguyễn Thị E",
      mssv: "2014567",
      avatar: "E",
      avatarColor: "bg-teal-500",
      subject: "Thiết Kế & Phân Tích Thuật Toán",
      topic: "Divide & Conquer",
      date: "2025-10-18",
      time: "10:00 - 12:00",
      type: "offline",
      location: "Phòng H2-205, CS2",
      status: "approved",
      subStatus: "upcoming",
      statusText: "Đã xác nhận",
    },
    {
      id: 4,
      studentName: "Hoàng Văn F",
      mssv: "2012678",
      avatar: "F",
      avatarColor: "bg-emerald-500",
      subject: "Cấu Trúc Dữ Liệu & Giải Thuật",
      topic: "Thuật toán sắp xếp",
      date: "2025-10-20",
      time: "14:00 - 16:00",
      type: "online",
      meetingLink: "https://meet.google.com/klm-nopq-rst",
      status: "approved",
      subStatus: "upcoming",
      statusText: "Đã xác nhận",
    },
    {
      id: 5,
      studentName: "Trần Văn B",
      mssv: "2012345",
      avatar: "B",
      avatarColor: "bg-cyan-500",
      subject: "Cấu Trúc Dữ Liệu & Giải Thuật",
      topic: "Cây AVL",
      date: "2025-10-10",
      time: "14:00 - 16:00",
      type: "online",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      status: "approved",
      subStatus: "completed",
      statusText: "Đã hoàn thành",
    },
    {
      id: 6,
      studentName: "Ngô Văn I",
      mssv: "2016890",
      avatar: "I",
      avatarColor: "bg-teal-500",
      subject: "Lập Trình Thi Đấu",
      topic: "Graph Theory",
      date: "2025-10-11",
      time: "10:00 - 12:00",
      type: "online",
      meetingLink: "https://meet.google.com/def-ghi-456",
      status: "approved",
      subStatus: "cancelled",
      statusText: "Đã hủy",
    },
    {
      id: 7,
      studentName: "Đỗ Thị H",
      mssv: "2015789",
      avatar: "H",
      avatarColor: "bg-teal-500",
      subject: "Cơ Sở Dữ Liệu",
      topic: "Database Design",
      date: "2025-10-22",
      time: "14:00 - 16:00",
      type: "offline",
      location: "Phòng H1-201, CS1",
      status: "pending",
      subStatus: "pending",
      statusText: "Chờ xác nhận",
    },
    // Add more mock data for other tabs if needed
  ];

  // Filter logic
  const filteredSessions = sessions.filter((session) => {
    if (activeMainTab === "pending") {
      return session.status === "pending";
    }
    // activeMainTab === 'approved'
    return session.status === "approved" && session.subStatus === activeSubTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Lịch Dạy</h1>
          <p className="text-gray-600 mt-1">
            Quản lý và theo dõi các buổi dạy của bạn
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`bg-white p-4 rounded-xl border ${stat.borderColor} shadow-sm flex items-center space-x-4`}
            >
              <div
                className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.count}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          {/* Main Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-full w-fit mb-4">
            <button
              onClick={() => setActiveMainTab("approved")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeMainTab === "approved"
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Đã duyệt (6)
            </button>
            <button
              onClick={() => setActiveMainTab("pending")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeMainTab === "pending"
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Chờ duyệt (1)
            </button>
          </div>

          {/* Sub Tabs (Only for Approved) */}
          {activeMainTab === "approved" && (
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-full w-fit">
              <button
                onClick={() => setActiveSubTab("upcoming")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSubTab === "upcoming"
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sắp tới (4)
              </button>
              <button
                onClick={() => setActiveSubTab("completed")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSubTab === "completed"
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Đã hoàn thành (1)
              </button>
              <button
                onClick={() => setActiveSubTab("cancelled")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSubTab === "cancelled"
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Đã hủy (1)
              </button>
            </div>
          )}
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              {/* Status Badge - Absolute Top Right */}
              <div className="absolute top-6 right-6">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    session.subStatus === "completed"
                      ? "text-blue-600 bg-blue-50 border-blue-100"
                      : session.subStatus === "cancelled"
                      ? "text-red-600 bg-red-50 border-red-100"
                      : session.status === "pending"
                      ? "text-yellow-600 bg-yellow-50 border-yellow-100"
                      : "text-green-500 bg-green-50 border-green-100"
                  }`}
                >
                  {session.statusText}
                </span>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                {/* Left Content */}
                <div className="flex items-start space-x-4 w-full">
                  <div
                    className={`w-12 h-12 rounded-full ${session.avatarColor} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                  >
                    {session.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {session.studentName}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        MSSV: {session.mssv}
                      </p>
                    </div>

                    <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md mb-3">
                      {session.subject}
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-700 font-medium">
                        Chủ đề:{" "}
                        <span className="font-normal">{session.topic}</span>
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {session.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {session.time}
                        </div>
                        <div className="flex items-center gap-1.5">
                          {session.type === "online" ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          {session.type === "online" ? "Online" : "Offline"}
                        </div>
                      </div>
                      {session.type === "offline" && (
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {session.location}
                        </div>
                      )}
                      {session.type === "online" && (
                        <a
                          href={session.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {session.meetingLink}
                        </a>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      {session.subStatus === "completed" ? (
                        <>
                          <button
                            onClick={() => handleEditFeedback(session)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium text-sm"
                          >
                            <FileText className="w-4 h-4" />
                            Sửa nhận xét
                          </button>
                          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                            <MessageSquare className="w-4 h-4" />
                            Nhắn tin
                          </button>
                        </>
                      ) : session.subStatus === "cancelled" ? (
                        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                          <MessageSquare className="w-4 h-4" />
                          Nhắn tin
                        </button>
                      ) : session.status === "pending" ? (
                        <>
                          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                            <MessageSquare className="w-4 h-4" />
                            Nhắn tin
                          </button>
                          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm">
                            <X className="w-4 h-4" />
                            Hủy
                          </button>
                        </>
                      ) : (
                        <>
                          {session.type === "online" && (
                            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                              <Video className="w-4 h-4" />
                              Tham gia
                            </button>
                          )}
                          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                            <MessageSquare className="w-4 h-4" />
                            Nhắn tin
                          </button>
                          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm">
                            <X className="w-4 h-4" />
                            Hủy
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        session={selectedSession}
      />
    </div>
  );
};

export default MySchedulePage;
