import axios from './axios.config'

export const adminService = {
  // Lấy tất cả users
  getAllUsers: async () => {
    const response = await axios.get('/admin/get-all-user')
    return response
  },

  // Cập nhật trạng thái user (ACTIVE/BANNED)
  updateUserStatus: async (userId, status) => {
    const response = await axios.patch(`/admin/update-user-status/${userId}`, { status })
    return response
  },

  // Tạo kỳ học mới
  createSemester: async (semesterData) => {
    const response = await axios.post('/admin/create-semester', semesterData)
    return response
  },

  // Lấy tất cả kỳ học (nếu có API)
  getAllSemesters: async () => {
    const response = await axios.get('/admin/get-all-semester')
    return response
  },

  // Cập nhật trạng thái kỳ học
  updateSemesterStatus: async (semesterId, status) => {
    const response = await axios.patch(`/admin/update-semester-status/${semesterId}`, { status })
    return response
  }
}
