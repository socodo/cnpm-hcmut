import { useState } from 'react';
import { Edit2, Mail, Phone, MapPin, Book, Award, Clock, Calendar } from 'lucide-react';
import EditProfileModal from './EditProfileModal';

const TutorProfile = ({ profile }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Format ngày sinh
  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="card overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-teal-300 relative">
          {/* Nút chỉnh sửa trên background */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-4 right-4 btn-primary flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 shadow-md"
          >
            <Edit2 size={18} />
            Chỉnh sửa
          </button>
        </div>
        <div className="relative px-6 pb-6">
          <div className="flex flex-col items-center -mt-16">
            <img
              src={profile?.avatarUrl || 'https://avatar.iran.liara.run/public'}
              alt={profile?.displayName}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <div className="mt-3 text-center">
              <h1 className="heading-2">{profile?.displayName}</h1>
              <p className="text-body font-medium text-blue-600">{profile?.tutor?.title || 'Gia sư'}</p>
              <p className="text-body-sm text-gray-600">{profile?.tutor?.department || 'Chưa cập nhật'}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6 text-center">
            <p className="text-body text-gray-700">{profile?.tutor?.bio || 'Chưa có mô tả'}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Contact Info */}
        <div className="card">
          <h2 className="heading-4 mb-4">Thông tin liên hệ</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-body">
              <Mail size={20} className="text-sky-500 flex-shrink-0" />
              <span className="break-all">{profile?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-body">
              <Phone size={20} className="text-sky-500 flex-shrink-0" />
              <span>{profile?.phone || 'Chưa cập nhật'}</span>
            </div>
            <div className="flex items-center gap-3 text-body">
              <Calendar size={20} className="text-sky-500 flex-shrink-0" />
              <span>Ngày sinh: {formatDate(profile?.dateOfBirth)}</span>
            </div>
            <div className="flex items-center gap-3 text-body">
              <MapPin size={20} className="text-sky-500 flex-shrink-0" />
              <span>Giới tính: {profile?.sex || 'Chưa cập nhật'}</span>
            </div>
          </div>
        </div>

        {/* Tutor Info */}
        <div className="card">
          <h2 className="heading-4 mb-4">Thông tin giảng viên</h2>
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award size={18} className="text-sky-500" />
                <span className="font-medium text-gray-700">Học hàm học vị</span>
              </div>
              <p className="text-body ml-6">{profile?.tutor?.title || 'Chưa cập nhật'}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Book size={18} className="text-sky-500" />
                <span className="font-medium text-gray-700">Khoa/Bộ môn</span>
              </div>
              <p className="text-body ml-6">{profile?.tutor?.department || 'Chưa cập nhật'}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock size={18} className="text-sky-500" />
                <span className="font-medium text-gray-700">Trạng thái</span>
              </div>
              <p className="text-body ml-6">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${profile?.status === 'ACTIVE'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
                  }`}>
                  {profile?.status || 'N/A'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>



      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        userType="tutor"
      />
    </div>
  );
};

export default TutorProfile;