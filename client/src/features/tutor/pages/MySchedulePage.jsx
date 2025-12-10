import React, { useState, useEffect } from "react";
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
import { userService } from "../../../service/user.service";
import { tutorService } from "../../../service/tutor.service";
import { toast } from "react-toastify";

const MySchedulePage = () => {
  const { user, fetchMe } = useAuthStore();
  const [viewMode, setViewMode] = useState(
    user?.roles?.includes("TUTOR") ? "tutor" : "student"
  );
  const [activeSubTab, setActiveSubTab] = useState("upcoming");

  const [studentSessions, setStudentSessions] = useState([]);
  const [tutorSessions, setTutorSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ensure user is loaded
  useEffect(() => {
    if (!user) {
      fetchMe();
    }
  }, []);

  // Update viewMode when user is loaded
  useEffect(() => {
    if (user) {
      setViewMode(user?.roles?.includes("TUTOR") ? "tutor" : "student");
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (viewMode === 'student') {
        const res = await userService.getMyBookings();
        if (res.success) {
          const mapped = res.data.map(b => {
            console.log(b);
            const date = b.slotId ? new Date(b.slotId.date) : new Date(b.bookedAt);
            const isPast = date < new Date();
            let subStatus = 'upcoming';
            if (b.status === 'CANCELLED') subStatus = 'cancelled';
            else if (b.status === 'COMPLETED') subStatus = 'completed';
            else if (b.status === 'PENDING') subStatus = 'pending';
            else if (isPast) subStatus = 'completed';

            return {
              id: b._id,
              tutorName: b.tutorId?.displayName || 'Unknown Tutor',
              avatar: b.tutorId?.displayName?.charAt(0) || 'T',
              avatarColor: "bg-blue-500",
              subject: b.subjectId?.name || 'Unknown Subject',
              topic: b.studentNote || 'No topic',
              date: date.toISOString().split('T')[0],
              time: b.slotId ? `${b.slotId.startTime} - ${b.slotId.endTime}` : 'N/A',
              type: b.slotId?.location?.type || 'offline',
              location: b.slotId?.location?.room || 'Online',
              status: b.status === 'CONFIRMED' ? 'approved' : b.status.toLowerCase(),
              subStatus: subStatus,
              statusText: b.status === 'CONFIRMED' ? 'Đã xác nhận' : b.status === 'COMPLETED' ? 'Đã hoàn thành' : b.status === 'PENDING' ? 'Chờ xác nhận' : 'Đã hủy',
              meetingLink: b.slotId?.location?.room
            };
          });
          setStudentSessions(mapped);
        }
      } else {
        const res = await tutorService.getTutorBookings();
        if (res.success) {
          const mapped = res.data.map(b => {

            const date = b.slotId ? new Date(b.slotId.date) : new Date(b.bookedAt);
            const isPast = date < new Date();
            let subStatus = 'upcoming';
            if (b.status === 'CANCELLED') subStatus = 'cancelled';
            else if (b.status === 'COMPLETED') subStatus = 'completed';
            else if (b.status === 'PENDING') subStatus = 'pending';
            else if (isPast) subStatus = 'completed';


            return {
              id: b._id,
              studentName: b.studentId?.displayName || 'Unknown Student',
              avatar: b.studentId?.displayName?.charAt(0) || 'S',
              avatarColor: "bg-green-500",
              subject: b.subjectId?.name || 'Unknown Subject',
              topic: b.studentNote || 'No topic',
              date: date.toISOString().split('T')[0],
              time: b.slotId ? `${b.slotId.startTime} - ${b.slotId.endTime}` : 'N/A',
              type: b.slotId?.location?.type || 'offline',
              location: b.slotId?.location?.room || 'Online',
              status: b.status === 'CONFIRMED' ? 'approved' : b.status.toLowerCase(),
              subStatus: subStatus,
              statusText: b.status === 'CONFIRMED' ? 'Đã xác nhận' : b.status === 'COMPLETED' ? 'Đã hoàn thành' : b.status === 'PENDING' ? 'Chờ xác nhận' : 'Đã hủy',
              meetingLink: b.slotId?.link
            };
          });
          setTutorSessions(mapped);
        }
      }
    } catch (error) {
      console.error("Failed to fetch schedule", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [viewMode, user]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy lịch này không?")) return;

    try {
      if (viewMode === 'student') {
        await userService.cancelBooking({ bookingId, reason: "User cancelled" });
      } else {
        await tutorService.cancelBooking(bookingId, "Tutor cancelled");
      }
      toast.success("Hủy lịch thành công");
      fetchData();
    } catch (error) {
      console.error("Cancel failed", error);
      toast.error(error.response?.data?.message || "Hủy lịch thất bại");
    }
  };

  const handleComplete = async (bookingId) => {
    if (!window.confirm("Xác nhận hoàn thành buổi học này?")) return;

    try {
      await tutorService.completeBooking(bookingId);
      toast.success("Đã hoàn thành buổi học");
      fetchData();
    } catch (error) {
      console.error("Complete failed", error);
      toast.error(error.response?.data?.message || "Không thể hoàn thành buổi học");
    }
  };

  const getStats = (sessions) => {
    const upcoming = sessions.filter(s => s.subStatus === 'upcoming').length;
    const completed = sessions.filter(s => s.subStatus === 'completed').length;
    const cancelled = sessions.filter(s => s.subStatus === 'cancelled').length;

    return [
      {
        id: "upcoming",
        label: "Sắp tới",
        count: upcoming,
        icon: Calendar,
        color: "text-blue-600",
        bg: "bg-blue-50",
        borderColor: "border-blue-100",
      },
      {
        id: "completed",
        label: "Hoàn thành",
        count: completed,
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-50",
        borderColor: "border-green-100",
      },
      {
        id: "cancelled",
        label: "Đã hủy",
        count: cancelled,
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-50",
        borderColor: "border-red-100",
      },
    ];
  };

  const currentSessions = viewMode === "tutor" ? tutorSessions : studentSessions;
  const currentStats = getStats(currentSessions);

  // Filter logic
  const filteredSessions = currentSessions.filter((session) => {
    return session.subStatus === activeSubTab;
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
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === "student"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Học viên
                </button>
                <button
                  onClick={() => setViewMode("tutor")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === "tutor"
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
          {/* Sub Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-full w-fit">
            <button
              onClick={() => setActiveSubTab("upcoming")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeSubTab === "upcoming"
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Sắp tới ({currentStats.find(s => s.id === 'upcoming').count})
            </button>
            <button
              onClick={() => setActiveSubTab("completed")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeSubTab === "completed"
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Đã hoàn thành ({currentStats.find(s => s.id === 'completed').count})
            </button>
            <button
              onClick={() => setActiveSubTab("cancelled")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeSubTab === "cancelled"
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Đã hủy ({currentStats.find(s => s.id === 'cancelled').count})
            </button>
          </div>
        </div>

        {/* Schedule List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Không có lịch nào trong danh mục này.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative"
              >
                {/* Status Badge - Absolute Top Right */}
                <div className="absolute top-6 right-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${session.subStatus === "completed"
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
                        <div className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded mt-1">
                          {session.subject}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 mt-3">
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
                          session.subStatus === "upcoming" && (
                            <button
                              onClick={() => handleComplete(session.id)}
                              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Hoàn thành
                            </button>
                          )}
                        {viewMode === "tutor" &&
                          session.subStatus === "completed" && (
                            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm">
                              <FileText className="w-4 h-4" />
                              Sửa nhận xét
                            </button>
                          )}
                        {session.subStatus !== "cancelled" &&
                          session.subStatus !== "completed" && (
                            <button
                              onClick={() => handleCancel(session.id)}
                              className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
                            >
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
        )}
      </div>
    </div>
  );
};

export default MySchedulePage;
