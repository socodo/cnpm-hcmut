import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import SubjectCard from "./components/SubjectCard";
import { adminService } from "../../service/admin.service";

const ExplorePage = () => {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [semester, setSemester] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Lấy tất cả kỳ học và tìm kỳ ACTIVE
      const semestersRes = await adminService.getAllSemesters();
      if (semestersRes.success) {
        const activeSemester = semestersRes.data.find(s => s.status === 'ACTIVE');

        if (activeSemester) {
          setSemester(activeSemester);

          // Lấy danh sách môn học của kỳ ACTIVE
          const subjectsRes = await adminService.getAllSubject(activeSemester._id);
          if (subjectsRes.success) {
            // Map dữ liệu từ API sang format phù hợp với SubjectCard
            const mappedSubjects = subjectsRes.data.subjects.map(subject => ({
              id: subject._id,
              code: subject.code,
              name: subject.name,
              description: subject.description || "Chưa có mô tả",
              department: subject.department || "Khoa học Máy tính",
              faculty: subject.faculty || "CNTT",
              credits: subject.credits || 3,
              totalTutors: subject.tutorIds?.length || 0,
              image: `https://picsum.photos/seed/${subject.code}/400/300`,
              format: "Kết hợp", // Default format
            }));
            setSubjects(mappedSubjects);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectClick = (subject) => {
    navigate(`/explore/${subject.id}`);
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Khám Phá Môn Học
        </h1>
        <p className="text-gray-600">
          Tìm kiếm và lựa chọn môn học phù hợp với nhu cầu của bạn tại HCMUT
        </p>
        {semester && (
          <div className="mt-3 inline-flex items-center px-4 py-2 bg-sky-50 text-sky-700 rounded-lg border border-sky-200">
            <span className="font-medium">Kỳ hiện tại:</span>
            <span className="ml-2">{semester.name} - {semester.academicYear}</span>
          </div>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm môn học..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Tìm thấy{" "}
          <span className="font-semibold text-sky-600">
            {filteredSubjects.length}
          </span>{" "}
          môn học
        </p>
      </div>

      {/* Subject Grid */}
      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onClick={() => handleSubjectClick(subject)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Không tìm thấy môn học phù hợp
          </h3>
          <p className="text-gray-500">
            Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
          </p>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
