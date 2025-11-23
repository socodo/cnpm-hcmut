import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/img/bk_logo.png'
import { useAuthStore } from '@/store/useAuthStore'


const LoginPage = () => {
  const navigate = useNavigate()
  const { signin, loading, error } = useAuthStore()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [warnBeforeLogin, setWarnBeforeLogin] = useState(false)
  const [loginError, setLoginError] = useState(null) // State riêng cho error

  // Reset error khi vào trang
  useEffect(() => {
    setLoginError(null)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginError(null) // Reset error trước khi submit

    try {
      await signin({
        email: formData.email,
        password: formData.password
      })

      // Redirect về trang chủ sau khi login thành công
      navigate('/')
    } catch (err) {
      console.error('Login failed:', err)
      setLoginError(err.message || 'Login failed. Please try again.')
    }
  }

  const handleClear = () => {
    setFormData({
      email: '',
      password: ''
    })
  }

  return (
    <div className="bg-[#eee] min-h-screen flex items-start justify-center py-4">
      <div className='max-w-screen-xl w-full bg-white shadow-lg'>
        {/* Header */}
        <div className='flex items-center gap-3 bg-[#210F7A] px-4 py-2'>
          <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
          <h1 className='text-lg font-sans text-white font-bold'>Central Authentication Service</h1>
        </div>

        {/* Content */}
        <div className='flex gap-6 p-3'>
          {/* Left Side - Login Form */}
          <div className='w-80 bg-gray-50 p-4 rounded'>
            <h2 className='text-sm font-bold text-[#8B0033] mb-3'>Enter your Username and Password</h2>

            {/* Error Message - chỉ hiển thị khi có loginError */}
            {loginError && (
              <div className='mb-3 p-2 bg-red-50 border border-red-300 rounded'>
                <p className='text-xs text-red-600'>{loginError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-2'>
              {/* Email */}
              <div>
                <label htmlFor="email" className='block text-[11px] font-semibold text-gray-700 mb-1'>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full px-2 py-1 text-xs border border-gray-300 bg-yellow-50 focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className='block text-[11px] font-semibold text-gray-700 mb-1'>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className='w-full px-2 py-1 text-xs border border-gray-300 bg-yellow-50 focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
              </div>

              {/* Checkbox */}
              <div className='flex items-center gap-2 pt-1'>
                <input
                  type="checkbox"
                  id="warn"
                  checked={warnBeforeLogin}
                  onChange={(e) => setWarnBeforeLogin(e.target.checked)}
                  className='w-3 h-3'
                />
                <label htmlFor="warn" className='text-[11px] text-gray-700'>
                  Warn me before logging me into other sites.
                </label>
              </div>

              {/* Buttons */}
              <div className='flex gap-2 pt-1'>
                <button
                  type="submit"
                  disabled={loading}
                  className='px-3 py-1 text-xs bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed'
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={loading}
                  className='px-3 py-1 text-xs bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
                >
                  Clear
                </button>
              </div>
            </form>

            {/* Change Password Link */}
            <div className='mt-2'>
              <a href="#" className='text-blue-600 text-[11px] underline hover:text-blue-800'>
                Change password?
              </a>
            </div>
          </div>

          {/* Right Side - Information */}
          <div className='flex-1 space-y-3 text-sm'>
            {/* Languages */}
            <div>
              <h3 className='text-sm font-bold text-[#8B0033] mb-1'>Languages</h3>
              <div className='flex gap-3'>
                <a href="#" className='text-blue-600 text-xs underline hover:text-blue-800'>Vietnamese</a>
                <a href="#" className='text-blue-600 text-xs underline hover:text-blue-800'>English</a>
              </div>
            </div>

            {/* Please Note */}
            <div>
              <h3 className='text-sm font-bold text-[#8B0033] mb-1'>Please note</h3>
              <p className='text-[11px] text-gray-700 leading-relaxed mb-1.5'>
                The Login page enables single sign-on to multiple websites at HCMUT. This means that you only have to enter your user name and password once for websites that subscribe to the Login page.
              </p>
              <p className='text-[11px] text-gray-700 leading-relaxed mb-1.5'>
                You will need to use your HCMUT Username and password to login to this site. The &quot;HCMUT&quot; account provides access to many resources including the HCMUT Information System, e-mail, ...
              </p>
              <p className='text-[11px] text-gray-700 leading-relaxed'>
                For security reasons, please Exit your web browser when you are done accessing services that require authentication!
              </p>
            </div>

            {/* Technical Support */}
            <div>
              <h3 className='text-sm font-bold text-[#8B0033] mb-1'>Technical support</h3>
              <p className='text-[11px] text-gray-700'>
                E-mail: <a href="mailto:support@hcmut.edu.vn" className='text-blue-600 underline hover:text-blue-800'>support@hcmut.edu.vn</a>
              </p>
              <p className='text-[11px] text-gray-700'>
                Tel: (84.8) 38647256 - 7204
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage