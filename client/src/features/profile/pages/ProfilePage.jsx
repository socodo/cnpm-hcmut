import { useState, useEffect } from 'react';
import TutorProfile from '../components/TutorProfile';
import StudentProfile from '../components/StudentProfile';
import AdminProfile from '../components/AdminProfile';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { useAuthStore } from '@/store/useAuthStore';
import { Lock } from 'lucide-react';

const ProfilePage = () => {
  const { user, fetchMe, loading: authLoading } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const loadProfile = async () => {
    try {
      setLoading(true);
      if (!user) {
        await fetchMe();
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy thông tin người dùng</p>
        </div>
      </div>
    );
  }

  // Check role từ user.roles array
  const isTutor = user.roles?.includes('TUTOR');
  const isAdmin = user.roles?.includes('ADMIN');

  return (
    <div className="section-container">
      {/* Change Password Button - Only show for non-HCMUT accounts */}
      {user.email && !user.email.endsWith('@hcmut.edu.vn') && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setShowChangePassword(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Lock className="w-4 h-4" />
            Đổi mật khẩu
          </button>
        </div>
      )}

      {isAdmin ? (
        <AdminProfile profile={user} />
      ) : isTutor ? (
        <TutorProfile profile={user} />
      ) : (
        <StudentProfile profile={user} />
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
};

export default ProfilePage;