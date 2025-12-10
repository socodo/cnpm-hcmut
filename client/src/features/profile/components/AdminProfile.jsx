import { Mail, Phone, Calendar, User } from 'lucide-react';

const AdminProfile = ({ profile }) => {
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
        <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 relative"></div>

        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                {profile?.displayName?.charAt(0) || 'A'}
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left sm:mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {profile?.displayName || 'Admin'}
              </h1>
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Quản trị viên
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="card mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b">
          Thông tin cá nhân
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-gray-900 font-medium">{profile?.email || 'Chưa cập nhật'}</p>
            </div>
          </div>

          {/* Tên */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Họ và tên</p>
              <p className="text-gray-900 font-medium">{profile?.displayName || 'Chưa cập nhật'}</p>
            </div>
          </div>

          {/* Ngày sinh */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Ngày sinh</p>
              <p className="text-gray-900 font-medium">{formatDate(profile?.dateOfBirth)}</p>
            </div>
          </div>

          {/* Số điện thoại */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Số điện thoại</p>
              <p className="text-gray-900 font-medium">{profile?.phoneNumber || 'Chưa cập nhật'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
