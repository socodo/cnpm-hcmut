import axios from './axios.config'

export const tutorService = {
  // Lấy danh sách môn học được phân công
  getMySubjects: async () => {
    const response = await axios.get('/tutor/my-subjects')
    return response
  },

  // Lấy danh sách lịch rảnh
  getMySlots: async (params) => {
    const response = await axios.get('/tutor/slots', { params })
    return response
  },

  // Tạo lịch rảnh mới
  createSlot: async (data) => {
    const response = await axios.post('/tutor/slots', data)
    return response
  },

  // Cập nhật lịch rảnh
  updateSlot: async (slotId, data) => {
    const response = await axios.put(`/tutor/slots/${slotId}`, data)
    return response
  },

  // Xóa lịch rảnh
  deleteSlot: async (slotId) => {
    const response = await axios.delete(`/tutor/slots/${slotId}`)
    return response
  },

  // Toggle trạng thái lịch
  toggleSlotStatus: async (slotId) => {
    const response = await axios.patch(`/tutor/slots/${slotId}/toggle`)
    return response
  },

  // Lấy danh sách lịch dạy (bookings)
  getTutorBookings: async () => {
    const response = await axios.get('/tutor/my-bookings')
    return response
  },

  // Hủy lịch dạy
  cancelBooking: async (bookingId, reason) => {
    const response = await axios.post('/tutor/cancel-booking', { bookingId, reason })
    return response
  },

  // Hoàn thành lịch dạy
  completeBooking: async (bookingId) => {
    const response = await axios.post('/tutor/complete-booking', { bookingId })
    return response
  }
}

