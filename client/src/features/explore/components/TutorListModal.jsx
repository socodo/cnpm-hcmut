import { useState, useEffect } from 'react';
import { X, Star, DollarSign } from 'lucide-react';
import { getMockTutorsBySubject } from '../data/mockdata.js';
import TutorScheduleModal from './TutorScheduleModal';

const TutorListModal = ({ isOpen, onClose, subject }) => {
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Load tutors khi modal mở
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

  if (!isOpen || !subject) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-40 px-4 pt-20">

        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="heading-3">{subject.name}</h2>
              <p className="text-body-sm text-gray-600 mt-1">{subject.department}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Tutor List */}
          <div className="p-6">
            {tutors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-body text-gray-500">
                  Chưa có gia sư nào cho môn học này
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {tutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    className="card hover:shadow-xl transition-shadow cursor-pointer"
                    
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Avatar */}
                      <img
                        src={tutor.avatar}
                        alt={tutor.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="heading-4">{tutor.name}</h3>
                            <p className="text-body-sm text-gray-600">{tutor.education}</p>
                            <p className="text-body-sm text-gray-600">{tutor.experience}</p>
                          </div>

                        </div>

                        <p className="text-body mb-3">{tutor.bio}</p>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {tutor.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-sky-100 text-sky-700 text-sm rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>

                        <button className="btn-primary" onClick={() => handleTutorClick(tutor)}>
                          Xem lịch rảnh & Đặt lịch
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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