import { useState, useEffect } from "react";
import {
  X,
  Search,
  Filter,
  Users,
  Calendar,
  Video,
  MapPin,
  User,
  Users as UsersIcon,
} from "lucide-react";
import { getMockTutorsBySubject } from "../data/mockdata.js";
import TutorScheduleModal from "./TutorScheduleModal";

const TutorListModal = ({ isOpen, onClose, subject }) => {
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen && subject) {
      const tutorList = getMockTutorsBySubject(subject.id);
      setTutors(tutorList);
    }
  }, [isOpen, subject]);

  const handleTutorClick = (tutor) => {
    setSelectedTutor(tutor);
    setIsScheduleModalOpen(true);
  };

  const getTagStyle = (tag) => {
    switch (tag) {
      case "Online":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Offline":
        return "bg-green-50 text-green-600 border-green-100";
      case "Nhóm":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "1-1":
        return "bg-purple-50 text-purple-600 border-purple-100";
      default:
        if (tag.includes("slot"))
          return "bg-emerald-50 text-emerald-600 border-emerald-100";
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getTagIcon = (tag) => {
    switch (tag) {
      case "Online":
        return <Video size={14} className="mr-1" />;
      case "Offline":
        return <MapPin size={14} className="mr-1" />;
      case "Nhóm":
        return <UsersIcon size={14} className="mr-1" />;
      case "1-1":
        return <User size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  if (!isOpen || !subject) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-sm font-medium mb-2">
                  {subject.code || "CTDL-GT"}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {subject.name}
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  {subject.department}
                </p>
                <p className="text-gray-600 max-w-3xl">{subject.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Users size={18} className="text-sky-500" />
                <span className="font-medium text-gray-700">
                  {tutors.length} giảng viên đang mở
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Calendar size={18} className="text-green-500" />
                <span className="font-medium text-gray-700">
                  48 slot tuần này
                </span>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Tìm theo tên giảng viên hoặc chuyên đề..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                <Filter size={20} />
                Lọc
              </button>
            </div>
            <p className="mt-4 text-gray-500 text-sm">
              Tìm thấy {tutors.length} giảng viên
            </p>
          </div>

          {/* Tutor Grid */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  {/* Tutor Header */}
                  <div className="flex gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0`}
                      style={{
                        backgroundColor: tutor.avatar.includes("background=")
                          ? `#${tutor.avatar.split("background=")[1].split("&")[0]
                          }`
                          : "#0ea5e9",
                      }}
                    >
                      {tutor.name
                        .split(".")
                        .pop()
                        .trim()
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">
                          {tutor.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500">{tutor.education}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(tutor.tags || ["Online", "Offline", "1-1"]).map(
                      (tag, idx) => (
                        <span
                          key={idx}
                          className={`flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getTagStyle(
                            tag
                          )}`}
                        >
                          {getTagIcon(tag)}
                          {tag}
                        </span>
                      )
                    )}
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-500 mb-2">Chuyên đề:</p>
                    <div className="flex flex-wrap gap-2">
                      {tutor.specialties.map((spec, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => handleTutorClick(tutor)}
                      className="flex-1 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors text-sm"
                    >
                      Xem lịch
                    </button>
                    <button className="flex-1 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors text-sm">
                      Hồ sơ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      <TutorScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        tutor={selectedTutor}
        subject={subject}
      />
    </>
  );
};

export default TutorListModal;
