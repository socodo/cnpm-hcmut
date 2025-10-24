import { useState } from 'react';
import { Edit2, Mail, Phone, MapPin, BookOpen, Target, Calendar } from 'lucide-react';
import EditProfileModal from './EditProfileModal';

const StudentProfile = ({ profile, setProfile }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="card overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-green-500 to-teal-600"></div>
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
                  <p className="text-body">Học sinh</p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="btn-primary flex items-center gap-2 bg-green-500 hover:bg-green-600 self-start md:self-center"
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
              <Mail size={20} className="text-green-500 flex-shrink-0" />
              <span className="break-all">{profile?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-body">
              <Phone size={20} className="text-green-500 flex-shrink-0" />
              <span>{profile?.phone || 'Chưa cập nhật'}</span>
            </div>
            <div className="flex items-center gap-3 text-body">
              <MapPin size={20} className="text-green-500 flex-shrink-0" />
              <span>{profile?.address || 'Chưa cập nhật'}</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="card">
          <h2 className="heading-4 mb-4">Thống kê</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{profile?.totalCourses || 0}</div>
              <div className="text-body-sm mt-1">Khóa học</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-sky-500">{profile?.totalHours || 0}</div>
              <div className="text-body-sm mt-1">Giờ học</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Info */}
      <div className="card mt-6">
        <h2 className="heading-4 mb-4">Thông tin học tập</h2>
        
        <div className="space-y-4">
          {/* Grade Level */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={20} className="text-green-500" />
              <h3 className="heading-5">Lớp học</h3>
            </div>
            <p className="text-body">{profile?.gradeLevel || 'Chưa cập nhật'}</p>
          </div>

          {/* School */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-green-500" />
              <h3 className="heading-5">Trường</h3>
            </div>
            <p className="text-body">{profile?.school || 'Chưa cập nhật'}</p>
          </div>

          {/* Interested Subjects */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target size={20} className="text-green-500" />
              <h3 className="heading-5">Môn học quan tâm</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile?.interestedSubjects?.map((subject, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                >
                  {subject}
                </span>
              )) || <span className="text-body-sm">Chưa cập nhật</span>}
            </div>
          </div>

          {/* Learning Goals */}
          <div>
            <h3 className="heading-5 mb-2">Mục tiêu học tập</h3>
            <p className="text-body">{profile?.learningGoals || 'Chưa cập nhật'}</p>
          </div>
        </div>
      </div>

      {/* Current Tutors */}
      {profile?.currentTutors && profile.currentTutors.length > 0 && (
        <div className="card mt-6">
          <h2 className="heading-4 mb-4">Gia sư hiện tại</h2>
          <div className="space-y-3">
            {profile.currentTutors.map((tutor, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="heading-5">{tutor.name}</h3>
                  <p className="text-body-sm">{tutor.subject}</p>
                </div>
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
        userType="student"
      />
    </div>
  );
};

export default StudentProfile;