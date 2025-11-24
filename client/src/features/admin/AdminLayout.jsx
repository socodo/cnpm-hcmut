import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">

              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout