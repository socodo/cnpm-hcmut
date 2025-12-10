import { BookOpen } from "lucide-react";

const SubjectCard = ({ subject, onClick }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="h-48 overflow-hidden relative group">
        <img
          src={subject.image}
          alt={subject.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Department */}
        <div className="flex items-center gap-2 text-sky-500 mb-2">
          <BookOpen size={16} />
          <span className="text-sm font-medium">{subject.department}</span>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold text-gray-900 mb-2 line-clamp-1"
          title={subject.name}
        >
          {subject.code} - {subject.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {subject.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <span className="text-gray-500 text-sm">
            {subject.totalTutors} giảng viên
          </span>
          <button
            onClick={onClick}
            className="bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
          >
            Xem giảng viên
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
