import { useState } from 'react';
import { BookOpen, Users, Award } from 'lucide-react';
import { getMockSubjects } from './data/mockdata.js';
import SubjectCard from './components/SubjectCard';
import TutorListModal from './components/TutorListModal';

const ExplorePage = () => {
  const [subjects] = useState(getMockSubjects());
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setIsTutorModalOpen(true);
  };

  return (
    <div className="section-container">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="heading-1 mb-3">Khám Phá Môn Học</h1>
        <p className="text-body max-w-2xl mx-auto">
          Tìm kiếm gia sư phù hợp cho các môn học trong kỳ này. 
          Chọn môn học để xem danh sách gia sư và đặt lịch học ngay!
        </p>
      </div>

      {/* Semester Info */}
      <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-8">
        <div className="flex items-center justify-center gap-2">
          <Award className="text-sky-500" size={20} />
          <span className="text-subtitle">Học kỳ hiện tại: <strong>HK1 2024-2025</strong></span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
            <BookOpen className="text-sky-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-sky-500 mb-1">{subjects.length}</div>
          <div className="text-body-sm">Môn học</div>
        </div>
        
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
            <Users className="text-green-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-green-500 mb-1">
            {subjects.reduce((sum, s) => sum + s.totalTutors, 0)}
          </div>
          <div className="text-body-sm">Gia sư sẵn sàng</div>
        </div>

        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
            <Award className="text-purple-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-purple-500 mb-1">
            {subjects.reduce((sum, s) => sum + s.credits, 0)}
          </div>
          <div className="text-body-sm">Tổng số tín chỉ</div>
        </div>
      </div>

      {/* Subject List */}
      <div className="mb-4">
        <h2 className="heading-3 mb-4">Danh sách môn học</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onClick={() => handleSubjectClick(subject)}
          />
        ))}
      </div>

      {/* Tutor List Modal */}
      <TutorListModal
        isOpen={isTutorModalOpen}
        onClose={() => setIsTutorModalOpen(false)}
        subject={selectedSubject}
      />
    </div>
  );
};

export default ExplorePage;