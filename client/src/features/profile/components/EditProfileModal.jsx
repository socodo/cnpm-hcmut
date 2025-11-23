import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditProfileModal = ({ isOpen, onClose, profile, userType }) => {
  const [formData, setFormData] = useState({
    displayName: '',
    phone: '',
    dateOfBirth: '',
    sex: '',
    avatarUrl: '',
    // Tutor specific
    title: '',
    department: '',
    bio: '',
    // Student specific
    faculty: '',
    class: '',
    year: '',
    gpa: '',
  });
  const [loading, setLoading] = useState(false);

  // Load dữ liệu từ profile vào form khi modal mở
  useEffect(() => {
    if (isOpen && profile) {
      setFormData({
        displayName: profile?.displayName || '',
        phone: profile?.phone || '',
        dateOfBirth: profile?.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : '',
        sex: profile?.sex || '',
        avatarUrl: profile?.avatarUrl || '',
        // Tutor
        title: profile?.tutor?.title || '',
        department: profile?.tutor?.department || '',
        bio: profile?.tutor?.bio || '',
        // Student
        faculty: profile?.student?.faculty || '',
        class: profile?.student?.class || '',
        year: profile?.student?.year || '',
        gpa: profile?.student?.gpa || '',
      });
    }
  }, [isOpen, profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Call API để update profile
    setTimeout(() => {
      setLoading(false);
      onClose();
      alert('Cập nhật thông tin thành công!');
      // Reload page để fetch lại data mới
      window.location.reload();
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
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder={profile?.displayName}
              required
              disabled
              className="input-field bg-gray-100 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Không thể chỉnh sửa</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={profile?.phone || 'VD: +84901234567'}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày sinh
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled
                className="input-field bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Không thể chỉnh sửa</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giới tính
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                disabled
                className="input-field bg-gray-100 cursor-not-allowed"
              >
                <option value="">Chọn giới tính</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Không thể chỉnh sửa</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL Avatar
            </label>
            <input
              type="url"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              placeholder={profile?.avatarUrl || 'https://avatar.iran.liara.run/public'}
              className="input-field"
            />
          </div>

          {/* Tutor Specific Fields */}
          {userType === 'tutor' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Học hàm học vị
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={profile?.tutor?.title || 'VD: Tiến sĩ, Thạc sĩ'}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Khoa/Bộ môn
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder={profile?.tutor?.department || 'VD: Khoa Khoa học và Kỹ thuật Máy tính'}
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
                  rows={4}
                  placeholder={profile?.tutor?.bio || 'Mô tả kinh nghiệm, chuyên môn của bạn...'}
                  className="input-field"
                />
              </div>
            </>
          )}

          {/* Student Specific Fields */}
          {userType === 'student' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Khoa
                </label>
                <input
                  type="text"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  placeholder={profile?.student?.faculty || 'VD: Computer Science and Engineering'}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lớp
                  </label>
                  <input
                    type="text"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    placeholder={profile?.student?.class || 'VD: MT2022'}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Năm học
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    placeholder={profile?.student?.year?.toString() || 'VD: 3'}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GPA
                </label>
                <input
                  type="number"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder={profile?.student?.gpa?.toString() || 'VD: 8.5'}
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