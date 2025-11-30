import axios from './axios.config'

export const authService = {
  signin: async (req) => {
    const response = await axios.post('/auth/signin', req)
    return response
  },

  fetchMe: async () => {
    const response = await axios.get('/users/get-me')
    console.log('fetch me response:', response)
    return response
  },

  refreshToken: async () => {
    const response = await axios.post('/auth/refresh-token')
    return response
  },

  logout: async () => {
    const response = await axios.post('/auth/logout')
    return response
  },

  updateUserInfor: async (data) => {
    const response = await axios.patch('/users/update-user-infor', data)
    return response
  }
}

