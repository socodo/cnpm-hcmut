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
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const MySchedulePage = () => {
  const { user } = useAuthStore();
  const [viewMode, setViewMode] = useState(
    user?.roles?.includes("TUTOR") ? "tutor" : "student"
  );
  const [activeMainTab, setActiveMainTab] = useState("approved");
  const [activeSubTab, setActiveSubTab] = useState("upcoming");

  // Student Mock Data
  const studentStats = [
    {
      id: "upcoming",
      label: "Sắp tới",
      count: 3,
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
      count: 2,
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

  const studentSessions = [
    {
      id: 1,
      tutorName: "PGS.TS. Trần Thị Bình",
      avatar: "B",
      avatarColor: "bg-cyan-500",
      subject: "Cơ Sở Dữ Liệu",
      topic: "SQL Optimization",
      date: "2025-10-16",
      time: "09:00 - 11:00",
      type: "offline",
      location: "Phòng H1-101, CS1",
      status: "approved",
      subStatus: "upcoming",
      statusText: "Đã xác nhận",
    },
    {
      id: 2,
      tutorName: "TS. Nguyễn Văn An",
      avatar: "A",
      avatarColor: "bg-teal-500",
      subject: "Cấu Trúc Dữ Liệu & Giải Thuật",
      topic: "Đồ thị - BFS/DFS",
      date: "2025-10-18",
      time: "15:00 - 17:00",
      type: "online",
      meetingLink: "https://meet.google.com/xyz-uvwx-rst",
      status: "approved",
      subStatus: "upcoming",
      statusText: "Đã xác nhận",
    },
    {
      id: 3,
      tutorName: "ThS. Lê Minh Cường",
      avatar: "C",
      avatarColor: "bg-sky-500",
      subject: "Lập Trình Hướng Đối Tượng",
      topic: "Design Patterns",
      date: "2025-10-20",
      time: "10:00 - 12:00",
      type: "offline",
      location: "Phòng H2-205, CS2",
      status: "approved",
      subStatus: "upcoming",
      statusText: "Đã xác nhận",
    },
    {
      id: 4,
      tutorName: "TS. Phạm Minh Tuấn",
      avatar: "P",
      avatarColor: "bg-purple-500",
      subject: "Vật Lý Đại Cương",
      topic: "Cơ học cổ điển",
      date: "2025-10-25",
      time: "08:00 - 10:00",
      type: "offline",
      location: "Phòng H3-301, CS2",
      status: "pending",
      subStatus: "pending",
      statusText: "Chờ xác nhận",
    },
    {
      id: 5,
      tutorName: "ThS. Võ Thanh Sơn",
      avatar: "V",
      avatarColor: "bg-orange-500",
      subject: "Lập Trình C++",
      topic: "Con trỏ & Quản lý bộ nhớ",
      date: "2025-10-26",
      time: "13:00 - 15:00",
      type: "online",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      status: "pending",
      subStatus: "pending",
      statusText: "Chờ xác nhận",
    },
    {
      id: 6,
      tutorName: "TS. Nguyễn Văn An",
      avatar: "A",
      avatarColor: "bg-teal-500",
      subject: "Cấu Trúc Dữ Liệu & Giải Thuật",
      topic: "Cây nhị phân",
      date: "2025-10-10",
      time: "14:00 - 16:00",
      type: "online",
      meetingLink: "https://meet.google.com/old-link",
      status: "approved",
      subStatus: "completed",
      statusText: "Đã hoàn thành",
    },
    {
      id: 7,
      tutorName: "ThS. Trần Thị Mai",
      avatar: "T",
      avatarColor: "bg-pink-500",
      subject: "Toán Cao Cấp 1",
      topic: "Ma trận & Định thức",
      date: "2025-10-12",
      time: "09:00 - 11:00",
      type: "offline",
      location: "Phòng H1-202, CS1",
      status: "approved",
      subStatus: "cancelled",
      statusText: "Đã hủy",
    },
  ];

  // Tutor Mock Data
  const tutorStats = [
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

  const tutorSessions = [
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
      avatarColor: "bg-teal-500",
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
      avatarColor: "bg-sky-500",
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
      avatarColor: "bg-purple-500",
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
    {
      id: 6,
      studentName: "Trần Văn B",
      mssv: "2012345",
      avatar: "B",
      avatarColor: "bg-teal-500",
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
      id: 7,
      studentName: "Ngô Văn I",
      mssv: "2016890",
      avatar: "I",
      avatarColor: "bg-cyan-500",
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
  ];

  const currentStats = viewMode === "tutor" ? tutorStats : studentStats;
  const currentSessions =
    viewMode === "tutor" ? tutorSessions : studentSessions;

  // Filter logic
  const filteredSessions = currentSessions.filter((session) => {
    if (activeMainTab === "pending") {
      return session.status === "pending";
    }
    return session.status === "approved" && session.subStatus === activeSubTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {viewMode === "tutor" ? "Lịch Dạy" : "Lịch Của Tôi"}
            </h1>
            <p className="text-gray-600 mt-1">
              {viewMode === "tutor"
                ? "Quản lý và theo dõi các buổi dạy của bạn"
                : "Quản lý và theo dõi các buổi mentoring của bạn"}
            </p>
          </div>

          {/* Role Switcher if user has both roles */}
          {user?.roles?.includes("TUTOR") &&
            user?.roles?.includes("STUDENT") && (
              <div className="flex bg-gray-200 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("student")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === "student"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Học viên
                </button>
                <button
                  onClick={() => setViewMode("tutor")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === "tutor"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Giáo viên
                </button>
              </div>
            )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {currentStats.map((stat) => (
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
              Đã duyệt ({viewMode === "tutor" ? 6 : 5})
            </button>
            <button
              onClick={() => setActiveMainTab("pending")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeMainTab === "pending"
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Chờ duyệt ({viewMode === "tutor" ? 1 : 2})
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
                Sắp tới ({viewMode === "tutor" ? 4 : 3})
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
                        {viewMode === "tutor"
                          ? session.studentName
                          : session.tutorName}
                      </h3>
                      {viewMode === "tutor" && (
                        <div className="text-sm text-gray-500 mb-1">
                          MSSV: {session.mssv}
                        </div>
                      )}
                      <div className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded mt-1">
                        {session.subject}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 mt-3">
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
                      {session.type === "online" &&
                        session.subStatus === "upcoming" && (
                          <a
                            href={session.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                          >
                            <Video className="w-4 h-4" />
                            Tham gia
                          </a>
                        )}
                      {viewMode === "tutor" &&
                        session.subStatus === "completed" && (
                          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm">
                            <FileText className="w-4 h-4" />
                            Sửa nhận xét
                          </button>
                        )}
                      <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                        <MessageSquare className="w-4 h-4" />
                        Nhắn tin
                      </button>
                      {session.subStatus !== "cancelled" &&
                        session.subStatus !== "completed" && (
                          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm">
                            <X className="w-4 h-4" />
                            Hủy
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySchedulePage;
