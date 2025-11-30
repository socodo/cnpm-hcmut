import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  BookOpen,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Calendar,
  Video,
  User,
  CheckCircle,
} from "lucide-react";
import { getMockTutorById } from "./data/mockdata";
import TutorScheduleModal from "./components/TutorScheduleModal";

const TutorProfilePage = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [activeTab, setActiveTab] = useState("Môn học");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  useEffect(() => {
    if (tutorId) {
      const foundTutor = getMockTutorById(tutorId);
      setTutor(foundTutor);
    }
  }, [tutorId]);

  if (!tutor) return <div className="p-8 text-center">Đang tải...</div>;

  const tabs = ["Môn học", "Chuyên đề", "Học vấn"];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-sky-600 mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={20} className="mr-2" />
        Quay lại
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div
                className={`w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-4xl mb-4 overflow-hidden ring-4 ring-sky-50`}
                style={{
                  backgroundColor: tutor.avatar.includes("background=")
                    ? `#${tutor.avatar.split("background=")[1].split("&")[0]}`
                    : "#0ea5e9",
                }}
              >
                {tutor.avatar.includes("ui-avatars") ? (
                  tutor.name
                    .split(".")
                    .pop()
                    .trim()
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                ) : (
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{tutor.name}</h1>
              <p className="text-gray-500 font-medium">
                {tutor.title || "Giảng viên"}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {tutor.department || "Khoa Khoa học & Kỹ thuật Máy tính"}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mb-8">
              <Users className="text-sky-500" size={20} />
              <span className="text-2xl font-bold text-gray-900">
                {tutor.studentsGuided || 0}
              </span>
              <span className="text-gray-500">Sinh viên đã hướng dẫn</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <BookOpen size={18} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Số buổi mentoring</p>
                  <p className="font-semibold text-gray-900">
                    {tutor.mentoringSessions || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Kinh nghiệm</p>
                  <p className="font-semibold text-gray-900">
                    {tutor.experience}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Giờ làm việc</p>
                  <p className="font-semibold text-gray-900">
                    {tutor.workingHours || "Thứ 2 - Thứ 6: 08:00 - 17:00"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {tutor.tags &&
                tutor.tags.map((tag, index) => {
                  if (tag.includes("slot")) return null;
                  let style = "bg-gray-50 text-gray-600 border-gray-100";
                  let icon = null;
                  if (tag === "Online") {
                    style = "bg-blue-50 text-blue-600 border-blue-100";
                    icon = <Video size={14} className="mr-1" />;
                  }
                  if (tag === "Offline") {
                    style = "bg-green-50 text-green-600 border-green-100";
                    icon = <MapPin size={14} className="mr-1" />;
                  }
                  if (tag === "1-1") {
                    style = "bg-purple-50 text-purple-600 border-purple-100";
                    icon = <User size={14} className="mr-1" />;
                  }
                  if (tag === "Nhóm") {
                    style = "bg-orange-50 text-orange-600 border-orange-100";
                    icon = <Users size={14} className="mr-1" />;
                  }

                  return (
                    <span
                      key={index}
                      className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${style}`}
                    >
                      {icon}
                      {tag}
                    </span>
                  );
                })}
            </div>

            <div className="space-y-3 mb-8">
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                Đặt lịch mentoring
              </button>
              <button className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={20} />
                Nhắn tin
              </button>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              {tutor.email && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} />
                  <span className="text-sm">{tutor.email}</span>
                </div>
              )}
              {tutor.location && (
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin size={18} />
                  <span className="text-sm">{tutor.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Giới Thiệu</h2>
            <p className="text-gray-600 leading-relaxed">
              {tutor.introduction || tutor.bio}
            </p>
          </div>

          {/* Tabs & List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === tab
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {tutor.topics &&
                tutor.topics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs font-bold uppercase">
                        {topic.code}
                      </span>
                      <span className="font-medium text-gray-900">
                        {topic.name}
                      </span>
                    </div>
                    <button className="text-sm font-medium text-gray-500 group-hover:text-sky-600 transition-colors">
                      Xem chi tiết
                    </button>
                  </div>
                ))}
              {(!tutor.topics || tutor.topics.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  Chưa có thông tin về {activeTab.toLowerCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <TutorScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        tutor={tutor}
        subject={{ name: "Mentoring" }} // Placeholder subject
      />
    </div>
  );
};

export default TutorProfilePage;
