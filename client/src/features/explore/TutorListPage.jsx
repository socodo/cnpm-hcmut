import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Users,
  Calendar,
  Video,
  MapPin,
  User,
  Users as UsersIcon,
  ArrowLeft,
  AlertCircle,
  X,
} from "lucide-react";
import { adminService } from "../../service/admin.service";
import TutorScheduleModal from "./components/TutorScheduleModal";

const TutorListPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [filterFormat, setFilterFormat] = useState("Tất cả");
  const [filterTime, setFilterTime] = useState("Tất cả");
  const [filterType, setFilterType] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("Nhiều slot trống");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    if (subjectId) {
      fetchData();
    }
  }, [subjectId]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Lấy thông tin môn học
      const subjectRes = await adminService.getSubjectById(subjectId);
      if (subjectRes.success) {
        const subjectData = subjectRes.data;
        setSubject({
          id: subjectData._id,
          code: subjectData.code,
          name: subjectData.name,
          description: subjectData.description || "Chưa có mô tả",
          department: subjectData.department || "Khoa học Máy tính",
          totalTutors: subjectData.tutorIds?.length || 0,
        });
      }

      // Lấy danh sách giảng viên của môn học
      const tutorsRes = await adminService.getTutorsBySubject(subjectId);
      if (tutorsRes.success) {
        const mappedTutors = tutorsRes.data.tutors.map((tutor) => ({
          id: tutor._id,
          name: tutor.displayName || "Chưa có tên",
          email: tutor.email,
          avatar: tutor.avatarUrl || "https://avatar.iran.liara.run/public",
          education: tutor.title || "Giảng viên",
          department: tutor.department,
          bio: tutor.bio || "",
          tags: ["Online", "Offline", "1-1"],
          specialties: [tutorsRes.data.subject?.name || "Môn học"],
        }));
        setTutors(mappedTutors);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

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
        if (tag.includes("0 slot"))
          return "bg-red-50 text-red-600 border-red-100";
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

  const filteredAndSortedTutors = tutors
    .filter((tutor) => {
      const matchesSearch =
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.specialties.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesFormat =
        filterFormat === "Tất cả" ||
        (tutor.tags && tutor.tags.includes(filterFormat));
      const matchesType =
        filterType === "Tất cả" ||
        (tutor.tags && tutor.tags.includes(filterType));
      const matchesAvailable =
        !showAvailableOnly ||
        (tutor.tags &&
          tutor.tags.some((t) => t.includes("slot") && !t.includes("0 slot")));

      return matchesSearch && matchesFormat && matchesType && matchesAvailable;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Nhiều slot trống":
          const getSlots = (t) => {
            const slotTag = t.tags?.find((tag) => tag.includes("slot"));
            return slotTag ? parseInt(slotTag.match(/\d+/)?.[0] || 0) : 0;
          };
          return getSlots(b) - getSlots(a);
        case "Tên A->Z":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setSearchTerm("");
    setFilterFormat("Tất cả");
    setFilterTime("Tất cả");
    setFilterType("Tất cả");
    setShowAvailableOnly(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/explore")}
          className="flex items-center text-gray-600 hover:text-sky-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Quay lại
        </button>
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy môn học</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/explore")}
        className="flex items-center text-gray-600 hover:text-sky-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Quay lại
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col mb-8">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-sm font-medium mb-2">
                {subject.code || "MÃ MÔN"}
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {subject.name}
              </h2>
              <p className="text-gray-500 text-sm mb-4">{subject.department}</p>
              <p className="text-gray-600 max-w-3xl">{subject.description}</p>
            </div>
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
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className={`flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg transition-colors font-medium ${isFilterExpanded
                  ? "bg-sky-50 text-sky-600 border-sky-200"
                  : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
              <Filter size={20} />
              Lọc
            </button>
          </div>

          {/* Expanded Filter Section */}
          {isFilterExpanded && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {/* Format Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hình thức
                  </label>
                  <select
                    value={filterFormat}
                    onChange={(e) => setFilterFormat(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Tất cả</option>
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Kết hợp</option>
                  </select>
                </div>

                {/* Time Slot Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khung giờ
                  </label>
                  <select
                    value={filterTime}
                    onChange={(e) => setFilterTime(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Tất cả</option>
                    <option>Sáng (7h - 12h)</option>
                    <option>Chiều (12h - 18h)</option>
                    <option>Tối (18h - 22h)</option>
                  </select>
                </div>

                {/* Mentoring Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kiểu mentoring
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Tất cả</option>
                    <option>1-1</option>
                    <option>Nhóm</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sắp xếp theo
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Nhiều slot trống</option>
                    <option>Tên A→Z</option>
                  </select>
                </div>
              </div>

              {/* Checkbox and Clear Actions */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="available-slots"
                    checked={showAvailableOnly}
                    onChange={(e) => setShowAvailableOnly(e.target.checked)}
                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                  />
                  <label
                    htmlFor="available-slots"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Chỉ hiện giảng viên còn slot
                  </label>
                </div>

                <button
                  onClick={clearFilters}
                  className="flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
                >
                  <X size={16} className="mr-1" />
                  Xóa tất cả
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 mb-6 text-gray-500 text-sm">
        Tìm thấy {filteredAndSortedTutors.length} giảng viên
      </p>

      {/* Tutor Grid */}
      {filteredAndSortedTutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Tutor Header */}
              <div className="flex gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0`}
                  style={{
                    backgroundColor: tutor.avatar.includes("background=")
                      ? `#${tutor.avatar.split("background=")[1].split("&")[0]}`
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
                    <h3 className="font-bold text-gray-900">{tutor.name}</h3>
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
              <div className="mb-6 flex-1">
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
                <button
                  onClick={() => navigate(`/tutor-profile/${tutor.id}`)}
                  className="flex-1 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors text-sm"
                >
                  Hồ sơ
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gray-50 rounded-full">
              <AlertCircle size={48} className="text-gray-400" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Không tìm thấy giảng viên phù hợp
          </h3>
          <p className="text-gray-500 mb-6">
            Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      <TutorScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        tutor={selectedTutor}
        subject={subject}
      />
    </div>
  );
};

export default TutorListPage;
