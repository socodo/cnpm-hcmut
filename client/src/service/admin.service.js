import axios from './axios.config'
import { useEffect } from 'react'

export const adminService = {
  getAllUsers: async () => {
    const response = await axios.get('/admin/get-all-user')
    return response
  },

  updateUserStatus: async (userId, status) => {
    const response = await axios.patch(`/admin/update-user-status/${userId}`, { status })
    return response
  },

  createSemester: async (semesterData) => {
    const response = await axios.post('/admin/create-semester', semesterData)
    return response
  },

  getAllSemesters: async () => {
    const response = await axios.get('/admin/get-all-semester')
    return response
  },

  updateSemesterStatus: async (semesterId, status) => {
    const response = await axios.patch(`/admin/update-semester-status/${semesterId}`, { status })
    return response
  },

  getAllSubject: async (semesterId) => {
    const response = await axios.get(`/admin/get-all-subject/${semesterId}`)
    return response
  },

  createSubject: async (semesterId, data) => {
    const response = await axios.post(`/admin/create-subject/${semesterId}`, data)
    return response
  },

  getSemesterById: async (semesterId) => {
    const response = await axios.get(`/admin/get-semester/${semesterId}`)
    return response
  },

  getSubjectById: async (subjectId) => {
    const response = await axios.get(`/admin/get-subject/${subjectId}`)
    return response
  },

  // Gán giảng viên cho môn học
  assignTutorToSubject: async (subjectId, tutorId) => {
    const response = await axios.post(`/admin/assign-tutor/${subjectId}`, { tutorId })
    return response
  },

  // Xóa giảng viên khỏi môn học
  removeTutorFromSubject: async (subjectId, tutorId) => {
    const response = await axios.delete(`/admin/remove-tutor/${subjectId}`, { data: { tutorId } })
    return response
  },

  // Lấy danh sách giảng viên của môn học
  getTutorsBySubject: async (subjectId) => {
    const response = await axios.get(`/admin/get-tutors-by-subject/${subjectId}`)
    return response
  }
}
