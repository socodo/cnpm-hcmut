import { useState, useEffect } from 'react';
import { X, Calendar, Clock, Check } from 'lucide-react';
import { getMockTutorSchedule } from '../data/mockdata';

const TutorScheduleModal = ({ isOpen, onClose, tutor, subject }) => {
  const [schedule, setSchedule] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && tutor) {
      const tutorSchedule = getMockTutorSchedule(tutor.id);
      setSchedule(tutorSchedule);
      setSelectedSlots([]);
    }
  }, [isOpen, tutor]);

  const handleSlotClick = (date, slot) => {
    if (!slot.available) return;

    const slotId = `${date}-${slot.time}`;
    setSelectedSlots(prev => {
      if (prev.includes(slotId)) {
        return prev.filter(id => id !== slotId);
      } else {
        return [...prev, slotId];
      }
    });
  };

  const isSlotSelected = (date, slot) => {
    return selectedSlots.includes(`${date}-${slot.time}`);
  };

  const handleRegister = () => {
    if (selectedSlots.length === 0) {
      alert('Vui lòng chọn ít nhất 1 khung giờ!');
      return;
    }

    setLoading(true);
    
    // Giả lập API call
    setTimeout(() => {
      setLoading(false);
      alert(`Đăng ký thành công!\n\nGia sư: ${tutor.name}\nMôn: ${subject.name}\nSố buổi đã chọn: ${selectedSlots.length}\n\nGia sư sẽ liên hệ với bạn sớm!`);
      onClose();
    }, 1500);
  };

  if (!isOpen || !tutor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="heading-3">Đặt lịch với {tutor.name}</h2>
            <p className="text-body-sm text-gray-600 mt-1">
              Môn: <strong>{subject.name}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Instructions */}
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Calendar className="text-sky-500 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="heading-5 mb-1">Hướng dẫn đặt lịch</h3>
                <p className="text-body-sm">
                  Chọn các khung giờ phù hợp với lịch học của bạn. 
                  Bạn có thể chọn nhiều khung giờ. Sau khi đăng ký, gia sư sẽ xác nhận và liên hệ với bạn.
                </p>
              </div>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="space-y-6">
            {schedule.map((day) => (
              <div key={day.date} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="text-sky-500" size={20} />
                  <div>
                    <h3 className="heading-5">{day.dayName}</h3>
                    <p className="text-body-sm text-gray-600">
                      {new Date(day.date).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {day.slots.map((slot, index) => {
                    const selected = isSlotSelected(day.date, slot);
                    const available = slot.available;

                    return (
                      <button
                        key={index}
                        onClick={() => handleSlotClick(day.date, slot)}
                        disabled={!available}
                        className={`
                          p-3 rounded-lg border-2 transition-all duration-200
                          flex flex-col items-center gap-2
                          ${available
                            ? selected
                              ? 'border-sky-500 bg-sky-50 text-sky-700'
                              : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
                            : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                          }
                        `}
                      >
                        <Clock size={18} />
                        <span className="text-sm font-medium text-center">
                          {slot.time}
                        </span>
                        {selected && (
                          <Check size={16} className="text-sky-500" />
                        )}
                        {!available && (
                          <span className="text-xs">Đã đặt</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Summary & Register */}
          <div className="mt-6 border-t pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-body">
                  Đã chọn: <strong className="text-sky-500">{selectedSlots.length}</strong> khung giờ
                </p>
                {selectedSlots.length > 0 && (
                  <p className="text-body-sm text-gray-600 mt-1">
                    Tổng chi phí dự kiến: <strong className="text-green-600">
                      {(selectedSlots.length * 2 * tutor.hourlyRate).toLocaleString()}đ
                    </strong> (mỗi buổi 2 giờ)
                  </p>
                )}
              </div>

              <button
                onClick={handleRegister}
                disabled={selectedSlots.length === 0 || loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
              >
                {loading ? 'Đang xử lý...' : 'Đăng ký ngay'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorScheduleModal;