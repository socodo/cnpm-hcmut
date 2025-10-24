import { useState } from 'react';
import { X } from 'lucide-react';

const EditProfileModal = ({ isOpen, onClose, profile, setProfile, userType }) => {
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || '',
    bio: profile?.bio || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    // Tutor specific
    title: profile?.title || '',
    subjects: profile?.subjects || [],
    education: profile?.education || '',
    experience: profile?.experience || '',
    hourlyRate: profile?.hourlyRate || '',
    // Student specific
    gradeLevel: profile?.gradeLevel || '',
    school: profile?.school || '',
    interestedSubjects: profile?.interestedSubjects || [],
    learningGoals: profile?.learningGoals || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectsChange = (e) => {
    const subjects = e.target.value.split(',').map(s => s.trim()).filter(s => s);
    setFormData(prev => ({ 
      ...prev, 
      [userType === 'tutor' ? 'subjects' : 'interestedSubjects']: subjects 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Giả lập API call
    setTimeout(() => {
      // Cập nhật profile với data mới
      setProfile(prev => ({
        ...prev,
        ...formData
      }));
      
      setLoading(false);
      onClose();
      
      // Hiển thị thông báo thành công (có thể dùng toast library)
      alert('Cập nhật thông tin thành công!');
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="heading-3">Chỉnh sửa thông tin</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Common Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giới thiệu bản thân
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          {/* Tutor Specific Fields */}
          {userType === 'tutor' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chức danh
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="VD: Giáo viên Toán, Gia sư Tiếng Anh"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Môn học (cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  value={formData.subjects.join(', ')}
                  onChange={handleSubjectsChange}
                  placeholder="VD: Toán, Lý, Hóa"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trình độ học vấn
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="VD: Thạc sĩ Toán học - ĐH Khoa học Tự nhiên"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kinh nghiệm
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Mô tả kinh nghiệm giảng dạy của bạn"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Học phí (VNĐ/giờ)
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="200000"
                  className="input-field"
                />
              </div>
            </>
          )}

          {/* Student Specific Fields */}
          {userType === 'student' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lớp học
                  </label>
                  <input
                    type="text"
                    name="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={handleChange}
                    placeholder="VD: Lớp 10"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trường
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    placeholder="VD: THPT Lê Hồng Phong"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Môn học quan tâm (cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  value={formData.interestedSubjects.join(', ')}
                  onChange={handleSubjectsChange}
                  placeholder="VD: Toán, Vật Lý, Tiếng Anh"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mục tiêu học tập
                </label>
                <textarea
                  name="learningGoals"
                  value={formData.learningGoals}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Mô tả mục tiêu học tập của bạn"
                  className="input-field"
                />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;