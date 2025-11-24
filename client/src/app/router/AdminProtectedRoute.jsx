import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { useEffect, useState } from 'react'

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, loading, fetchMe, accessToken } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Admin Route Check:', { isAuthenticated, user: user?.displayName, roles: user?.roles, accessToken: !!accessToken })

        // Nếu đã authenticated nhưng chưa có user data, fetch user info
        if (isAuthenticated && !user) {
          console.log('User authenticated but no user data, fetching...')
          await fetchMe()
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      } finally {
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [accessToken, user, isAuthenticated, fetchMe])

  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check for valid user and admin role
  console.log('Final Check - User:', user?.displayName, 'Roles:', user?.roles, 'Has ADMIN:', user?.roles?.includes('ADMIN'))

  const hasAdminRole = user?.roles && Array.isArray(user.roles) && user.roles.includes('ADMIN')

  if (!user) {
    console.log('No user data available')
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">User Data Missing</h1>
          <p className="text-gray-600 mb-6">
            Unable to load user information. Please try logging in again.
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login Again
          </button>
        </div>
      </div>
    )
  }

  if (!hasAdminRole) {
    console.log('User does not have ADMIN role')
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            You don't have permission to access the admin panel.
            Only administrators can view this page.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Current role: {user.roles?.join(', ') || 'No roles assigned'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return children
}

export default AdminProtectedRoute