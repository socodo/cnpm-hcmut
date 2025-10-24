import { useState } from 'react';
import { Edit2, Mail, Phone, MapPin, Book, Award, Clock } from 'lucide-react';
import EditProfileModal from './EditProfileModal';

const TutorProfile = ({ profile, setProfile }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="card overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-4 gap-4">
            <img
              src={profile?.avatar}
              alt={profile?.fullName}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="heading-2">{profile?.fullName}</h1>
                  <p className="text-body">{profile?.title || 'Gia sư'}</p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="btn-primary flex items-center gap-2 self-start md:self-center"
                >
                  <Edit2 size={18} />
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-4">
            <p className="text-body">{profile?.bio || 'Chưa có mô tả'}</p>
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
              <MapPin size={20} className="text-sky-500 flex-shrink-0" />
              <span>{profile?.address || 'Chưa cập nhật'}</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="card">
          <h2 className="heading-4 mb-4">Thống kê</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-sky-500">{profile?.totalStudents || 0}</div>
              <div className="text-body-sm mt-1">Học sinh</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{profile?.totalHours || 0}</div>
              <div className="text-body-sm mt-1">Giờ dạy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Teaching Info */}
      <div className="card mt-6">
        <h2 className="heading-4 mb-4">Thông tin giảng dạy</h2>
        
        <div className="space-y-4">
          {/* Subjects */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Book size={20} className="text-sky-500" />
              <h3 className="heading-5">Môn học</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile?.subjects?.map((subject, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {subject}
                </span>
              )) || <span className="text-body-sm">Chưa cập nhật</span>}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award size={20} className="text-sky-500" />
              <h3 className="heading-5">Trình độ học vấn</h3>
            </div>
            <p className="text-body">{profile?.education || 'Chưa cập nhật'}</p>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} className="text-sky-500" />
              <h3 className="heading-5">Kinh nghiệm</h3>
            </div>
            <p className="text-body">{profile?.experience || 'Chưa cập nhật'}</p>
          </div>

          {/* Hourly Rate */}
          
        </div>
      </div>

      {/* Certificates */}
      {profile?.certificates && profile.certificates.length > 0 && (
        <div className="card mt-6">
          <h2 className="heading-4 mb-4">Chứng chỉ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.certificates.map((cert, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-sky-300 transition-colors">
                <h3 className="heading-5">{cert.name}</h3>
                <p className="text-body-sm mt-1">{cert.issuer}</p>
                <p className="text-body-sm text-gray-500 mt-1">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        setProfile={setProfile}
        userType="tutor"
      />
    </div>
  );
};

export default TutorProfile;