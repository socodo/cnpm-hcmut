import logo from '../../assets/img/bk_logo.png'

const LoginPage = () => {
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

            <form className='space-y-2'>
              {/* Username */}
              <div>
                <label htmlFor="username" className='block text-[11px] font-semibold text-gray-700 mb-1'>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
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
                  className='w-full px-2 py-1 text-xs border border-gray-300 bg-yellow-50 focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
              </div>

              {/* Checkbox */}
              <div className='flex items-center gap-2 pt-1'>
                <input
                  type="checkbox"
                  id="warn"
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
                  className='px-3 py-1 text-xs bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition'
                >
                  Login
                </button>
                <button
                  type="button"
                  className='px-3 py-1 text-xs bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition'
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