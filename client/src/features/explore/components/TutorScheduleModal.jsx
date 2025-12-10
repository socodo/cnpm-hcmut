import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  CheckCircle,
  Video,
  MapPin,
  User,
  Users,
  AlertCircle,
} from "lucide-react";
import { adminService } from "../../../service/admin.service";
import { userService } from "../../../service/user.service";
import { toast } from "react-toastify";

const TutorScheduleModal = ({ isOpen, onClose, tutor, subject }) => {
  const [schedule, setSchedule] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      if (isOpen && tutor && subject) {
        setLoading(true);
        try {
          const tutorId = tutor.id || tutor._id;
          const subjectId = subject.id || subject._id;

          if (!tutorId || !subjectId) {
            console.error("Missing tutorId or subjectId", { tutor, subject });
            setLoading(false);
            return;
          }

          const response = await adminService.getTutorSlotsBySubject(tutorId, subjectId);
          if (response.success) {
            const mappedSlots = response.data.map(slot => ({
              id: slot._id,
              available: true,
              dayName: `${slot.dayOfWeek}, ${new Date(slot.date).toLocaleDateString('vi-VN')}`,
              time: `${slot.startTime} - ${slot.endTime}`,
              format: slot.location.type === 'online' ? 'Online' : 'Offline',
              type: slot.capacity === 1 ? '1-1' : 'Nhóm',
              members: slot.capacity > 1 ? `${slot.bookedCount}/${slot.capacity}` : null,
              location: slot.location.room
            }));
            setSchedule(mappedSlots);
          }
        } catch (error) {
          console.error("Failed to fetch slots", error);
        } finally {
          setLoading(false);
        }
        setSelectedSlots([]);
      }
    };

    fetchSlots();
  }, [isOpen, tutor, subject]);

  const handleSlotClick = (slot) => {
    if (!slot.available) return;

    setSelectedSlots((prev) => {
      if (prev.includes(slot.id)) {
        return prev.filter((id) => id !== slot.id);
      } else {
        return [...prev, slot.id];
      }
    });
  };

  const isSlotSelected = (slot) => {
    return selectedSlots.includes(slot.id);
  };

  const handleRegister = async () => {
    if (selectedSlots.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 khung giờ!");
      return;
    }

    setLoading(true);

    try {
      // Call API for each selected slot
      // Note: Ideally backend should support bulk booking, but for now we loop
      const promises = selectedSlots.map(slotId =>
        userService.bookSlot({ slotId })
      );

      await Promise.all(promises);

      toast.success(
        `Đăng ký thành công!\n\nGia sư: ${tutor.name}\nMôn: ${subject.name}\nSố buổi đã chọn: ${selectedSlots.length}\n\nGia sư sẽ liên hệ với bạn sớm!`
      );
      onClose();
    } catch (error) {
      console.error("Booking failed", error);
      toast.error(error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !tutor) return null;

  const availableSlots = schedule.filter((s) => s.available);
  const fullSlots = schedule.filter((s) => !s.available);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
          <div className="flex gap-4">
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
              <h2 className="text-xl font-bold text-gray-900">{tutor.name}</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-md">
                Chọn slot thời gian phù hợp với bạn. Hệ thống sẽ tự động kiểm
                tra trùng lịch.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Available Slots */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={20} className="text-green-500" />
              <h3 className="font-bold text-gray-900">
                Slot có sẵn ({availableSlots.length})
              </h3>
            </div>

            <div className="space-y-3">
              {availableSlots.map((slot) => {
                const isSelected = isSlotSelected(slot);
                return (
                  <div
                    key={slot.id}
                    onClick={() => handleSlotClick(slot)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected
                      ? "border-sky-500 bg-sky-50"
                      : "border-gray-200 hover:border-sky-200 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar size={18} className="text-gray-500" />
                      <span className="font-medium text-gray-900">
                        {slot.dayName}
                      </span>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <Clock size={18} className="text-gray-500" />
                      <span className="text-gray-600">{slot.time}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${slot.format === "Online"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : "bg-green-50 text-green-600 border-green-100"
                          }`}
                      >
                        {slot.format === "Online" ? (
                          <Video size={14} className="mr-1" />
                        ) : (
                          <MapPin size={14} className="mr-1" />
                        )}
                        {slot.format}
                      </span>

                      <span
                        className={`flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${slot.type === "1-1"
                          ? "bg-purple-50 text-purple-600 border-purple-100"
                          : "bg-orange-50 text-orange-600 border-orange-100"
                          }`}
                      >
                        {slot.type === "1-1" ? (
                          <User size={14} className="mr-1" />
                        ) : (
                          <Users size={14} className="mr-1" />
                        )}
                        {slot.type} {slot.members && `(${slot.members})`}
                      </span>
                    </div>

                    {slot.location && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={16} />
                        {slot.location}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full Slots */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={20} className="text-gray-400" />
              <h3 className="font-bold text-gray-500">
                Đã đầy ({fullSlots.length})
              </h3>
            </div>

            <div className="space-y-3">
              {fullSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="p-4 rounded-xl border border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-gray-400" />
                      <span className="font-medium text-gray-500">
                        {slot.dayName}
                      </span>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <Clock size={18} className="text-gray-400" />
                      <span className="text-gray-500">{slot.time}</span>
                    </div>
                    <span className="px-2 py-1 bg-gray-200 text-gray-500 text-xs rounded font-medium">
                      Đã đầy
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleRegister}
            disabled={selectedSlots.length === 0 || loading}
            className="flex-1 py-2.5 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang xử lý..." : "Xác nhận đặt lịch"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorScheduleModal;
