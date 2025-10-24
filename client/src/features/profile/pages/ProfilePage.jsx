import { useState, useEffect } from 'react';
import TutorProfile from '../components/TutorProfile';
import StudentProfile from '../components/StudentProfile';
import { getMockProfile } from '../data/mockData';

const ProfilePage = () => {
  // Mock user - Thay đổi role thành 'student' hoặc 'tutor' để test
  const [currentUser] = useState({
    id: 1,
    role: 'student', // Đổi thành 'student' để xem profile học sinh
    email: 'user@example.com'
  });

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập fetch data
    setTimeout(() => {
      const mockProfile = getMockProfile(currentUser.role);
      setProfile(mockProfile);
      setLoading(false);
    }, 500);
  }, [currentUser.role]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="section-container">
      {currentUser?.role === 'tutor' ? (
        <TutorProfile profile={profile} setProfile={setProfile} />
      ) : (
        <StudentProfile profile={profile} setProfile={setProfile} />
      )}
    </div>
  );
};

export default ProfilePage;