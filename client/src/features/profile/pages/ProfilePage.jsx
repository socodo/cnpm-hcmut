import { useState, useEffect } from 'react';
import TutorProfile from '../components/TutorProfile';
import StudentProfile from '../components/StudentProfile';
import { useAuthStore } from '@/store/useAuthStore';

const ProfilePage = () => {
  const { user, fetchMe, loading: authLoading } = useAuthStore();
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="section-container">
      {isTutor ? (
        <TutorProfile profile={user} />
      ) : (
        <StudentProfile profile={user} />
      )}
    </div>
  );
};

export default ProfilePage;