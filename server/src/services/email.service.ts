import nodemailer from 'nodemailer'

// Cấu hình transporter - sử dụng Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Email của bạn
    pass: process.env.EMAIL_PASSWORD // App password của Gmail
  }
})

// Gửi email thông tin tài khoản mới
export const sendAccountCredentials = async (
  to: string,
  displayName: string,
  email: string,
  password: string
): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Thông tin tài khoản Tutor Support System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Chào mừng đến với Tutor Support System!</h2>
        <p>Xin chào <strong>${displayName}</strong>,</p>
        <p>Tài khoản của bạn đã được tạo thành công. Dưới đây là thông tin đăng nhập:</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 10px 0;"><strong>Mật khẩu:</strong> ${password}</p>
        </div>
        
        <p style="color: #dc2626; font-weight: bold;">⚠️ Lưu ý bảo mật:</p>
        <ul style="color: #374151;">
          <li>Vui lòng đổi mật khẩu ngay sau lần đăng nhập đầu tiên</li>
          <li>Không chia sẻ thông tin tài khoản với người khác</li>
          <li>Giữ mật khẩu ở nơi an toàn</li>
        </ul>

        <h2>Hướng dẫn đổi Mật khẩu</h2>
        <ul>
          <li>Đăng nhập vào hệ thống bằng thông tin trên.</li>
          <li>Truy cập trang Profile ở biểu tượng User (góc phải bên trên màn hình)</li>
          <li>Chọn "Đổi Mật khẩu" (Change Password)</li>
          </ul>
        
        <p>Truy cập hệ thống tại: <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" style="color: #2563eb;">Tutor Support System</a></p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #6b7280; font-size: 12px;">
          Email này được gửi tự động, vui lòng không trả lời.<br>
          Nếu bạn cần hỗ trợ, vui lòng liên hệ quản trị viên.
        </p>
      </div>
    `
  }

  await transporter.sendMail(mailOptions)
}

// Kiểm tra kết nối email
export const verifyEmailConnection = async (): Promise<boolean> => {
  try {
    await transporter.verify()
    console.log('✅ Email service is ready')
    return true
  } catch (error) {
    console.error('❌ Email service error:', error)
    return false
  }
}
