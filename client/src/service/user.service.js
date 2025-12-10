import axios from './axios.config'

export const userService = {
  getMe: async () => {
    const response = await axios.get('/users/get-me')
    return response
  },

  postProgram: async (data) => {
    const response = await axios.post('/users/post-reqprogram', data)
    return response
  },

  updateUserInfo: async (data) => {
    const response = await axios.patch('/users/update-user-infor', data)
    return response
  },

  bookSlot: async (data) => {
    const response = await axios.post('/users/book-slot', data)
    return response
  },

  getMyBookings: async () => {
    const response = await axios.get('/users/my-bookings')
    return response
  },

  cancelBooking: async (data) => {
    const response = await axios.post('/users/cancel-booking', data)
    return response
  },

  changePassword: async (data) => {
    const response = await axios.post('/users/change-password', data)
    return response
  }
}
