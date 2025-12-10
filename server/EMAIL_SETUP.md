# Hướng dẫn cấu hình gửi email

## Bước 1: Tạo App Password cho Gmail

1. Truy cập Google Account: https://myaccount.google.com/
2. Chọn **Security** (Bảo mật)
3. Bật **2-Step Verification** (Xác minh 2 bước) nếu chưa bật
4. Tìm **App passwords** (Mật khẩu ứng dụng)
5. Chọn **Mail** và **Other (Custom name)**
6. Nhập tên: "Tutor Support System"
7. Click **Generate** và copy mật khẩu 16 ký tự

## Bước 2: Cập nhật file .env

Thêm vào file `server/.env`:

```env
# Email Configuration
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"  # App password 16 ký tự
```

## Bước 3: Test email service

Server sẽ tự động kiểm tra kết nối email khi khởi động.

## Lưu ý:
- Không sử dụng mật khẩu Gmail thường, phải dùng App Password
- App Password chỉ hiển thị 1 lần, hãy lưu lại
- Nếu gặp lỗi "Less secure app access", hãy bật 2-Step Verification
