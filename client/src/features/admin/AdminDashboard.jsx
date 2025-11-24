import { useState } from 'react'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('semesters')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    academicYear: '',
    semesterNumber: 1,
    startDate: '',
    endDate: '',
    startDateSurvey: '',
    endDateSurvey: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Tạo kỳ mới:', formData)
    // TODO: Call API to create semester
    alert('Tạo kỳ thành công!')
    // Reset form and close modal
    setFormData({
      code: '',
      name: '',
      academicYear: '',
      semesterNumber: 1,
      startDate: '',
      endDate: '',
      startDateSurvey: '',
      endDateSurvey: ''
    })
    setShowCreateForm(false)
  }

  // Mock data for semesters



  const semesters = [
    {
      id: 1,
      code: 'HK1 2024-2025',
      status: 'Đang mở',
      startDate: '2024-09-01',
      endDate: '2025-01-15',
      subjects: 12,
      students: 234,
      statusColor: 'text-red-600 bg-red-50'
    },
    {
      id: 2,
      code: 'HK2 2023-2024',
      status: 'Đã đóng',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      subjects: 15,
      students: 198,
      statusColor: 'text-green-600 bg-green-50'
    },
    {
      id: 3,
      code: 'HK1 2023-2024',
      status: 'Đã đóng',
      startDate: '2023-09-01',
      endDate: '2024-01-10',
      subjects: 14,
      students: 187,
      statusColor: 'text-green-600 bg-green-50'
    }
  ]

  const stats = [
    { label: 'Kỳ đang mở', value: '1', icon: '📅' },
    { label: 'Tổng môn học', value: '41', icon: '📚' },
    { label: 'Tổng sinh viên', value: '619', icon: '👥' }
  ]

  // Render Create Semester Modal
  const renderCreateModal = () => (
    showCreateForm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Tạo Kỳ Đăng Ký Mới</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mã kỳ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã kỳ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="VD: HK1 2024-2025"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Tên kỳ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên kỳ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="VD: Học kỳ 1 năm học 2024-2025"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Năm học */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Năm học <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    placeholder="VD: 2024-2025"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Số kỳ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số kỳ <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="semesterNumber"
                    value={formData.semesterNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={1}>Kỳ 1</option>
                    <option value={2}>Kỳ 2</option>
                    <option value={3}>Kỳ hè</option>
                  </select>
                </div>

                {/* Ngày bắt đầu */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày bắt đầu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Ngày kết thúc */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày kết thúc <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Ngày bắt đầu khảo sát */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày bắt đầu khảo sát <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDateSurvey"
                    value={formData.startDateSurvey}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Ngày kết thúc khảo sát */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày kết thúc khảo sát <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="endDateSurvey"
                    value={formData.endDateSurvey}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tạo kỳ mới
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-600">Quản Lý Kỳ Đăng Ký</h1>
        <p className="text-gray-500 mt-2  ">Tạo và quản lý các kỳ đăng ký chương trình mentoring</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('semesters')}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'semesters'
            ? 'bg-[#0ea5e9] text-white'
            : 'text-gray-600 hover:bg-white border border-black-300'
            }`}
        >
          📋 Khóa Sát & Thống Kê
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'users'
            ? 'bg-[#0ea5e9] text-white'
            : 'text-gray-600 hover:bg-white border border-black-300'
            }`}
        >
          👥 Quản Lý Người Dùng
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'semesters' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{stat.icon}</div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Semesters List */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Danh Sách Kỳ Đăng Ký</h2>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-[#0ea5e9] hover:bg-blue-400 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <span>Tạo Kỳ Mới</span>
              </button>
            </div>

            <div className="divide-y divide-gray-200">
              {semesters.map((semester) => (
                <div key={semester.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{semester.code}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${semester.statusColor}`}>
                          {semester.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <span className="mr-1">📅</span>
                          Bắt đầu: {semester.startDate}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">⏰</span>
                          Kết thúc: {semester.endDate}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">📚</span>
                          {semester.subjects} môn học
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">👥</span>
                          {semester.students} sinh viên đăng ký
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 text-sm bg-[#0ea5e9] hover:bg-blue-400 text-white rounded-lg  transition-colors">
                        Quản lý môn học →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quản Lý Người Dùng</h2>
          <p className="text-gray-600">Tính năng đang phát triển...</p>
        </div>
      )}

      {/* Create Form Modal */}
      {renderCreateModal()}
    </div>
  )
}

export default AdminDashboard