import { Users, BookOpen, Award } from 'lucide-react';

const SubjectCard = ({ subject, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="card-interactive group"
    >
      {/* Header với gradient */}
      <div className="h-24 bg-gradient-to-br from-sky-400 to-blue-600 rounded-t-lg -mx-6 -mt-6 mb-4 flex items-center justify-center">
        <BookOpen className="text-white" size={40} />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="heading-4 group-hover:text-sky-500 transition-colors">
              {subject.name}
            </h3>
            <span className="px-2 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded">
              {subject.code}
            </span>
          </div>
          <p className="text-body-sm text-gray-600">{subject.department}</p>
        </div>

        <p className="text-body-sm line-clamp-2">{subject.description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2 text-body-sm">
            <Users size={16} className="text-green-500" />
            <span><strong>{subject.totalTutors}</strong> gia sư</span>
          </div>
          <div className="flex items-center gap-2 text-body-sm">
            <Award size={16} className="text-purple-500" />
            <span><strong>{subject.credits}</strong> tín chỉ</span>
          </div>
        </div>

        <button className="btn-primary w-full mt-2">
          Xem gia sư
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;