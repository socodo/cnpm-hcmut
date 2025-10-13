import { Route, Routes } from 'react-router-dom'
import HomePage from '../../features/home/HomePage'
import MainLayout from '../../components/layout/MainLayout'
import LoginPage from '@/features/login/LoginPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path='/login' element={<LoginPage />}>

      </Route>
    </Routes>
  )
}

export default AppRouter