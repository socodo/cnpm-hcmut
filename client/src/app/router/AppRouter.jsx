import { Route, Routes } from 'react-router-dom'
import HomePage from '../../features/home/HomePage'
import MainLayout from '../../components/layout/MainLayout'
import LoginPage from '@/features/login/LoginPage'
import ProfilePage from '@/features/profile/pages/ProfilePage'
import ProgramPage from '../../features/program/ProgramPage'
import ProtectedRoute from './ProtectedRouter'
import ExplorePage from '../../features/explore/ExplorePage.jsx';
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="programs" element={<ProgramPage />} />
        <Route 
          path="explore" 
          element={
            <ProtectedRoute>
              <ExplorePage />
            </ProtectedRoute>
          } 
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

      </Route>

      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}

export default AppRouter