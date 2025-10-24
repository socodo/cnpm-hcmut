import { Route, Routes } from 'react-router-dom'
import HomePage from '../../features/home/HomePage'
import MainLayout from '../../components/layout/MainLayout'
import LoginPage from '@/features/login/LoginPage'
import ProfilePage from '@/features/profile/pages/ProfilePage';
//E:\math 243\CNPM\Tutor-Support-System\client\src\.jsx
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path='/login' element={<LoginPage />}>

      </Route>

      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default AppRouter