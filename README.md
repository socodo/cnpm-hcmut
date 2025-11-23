# 🎓 Tutor Support System - Group 4

> 🚀 **Modern web application for connecting tutors and students**  


---

FE REACT && TAILWINDCSS

---------------------------
┌─────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 1: ĐẦU KỲ (Tháng 7)                        │
└─────────────────────────────────────────────────────────┘
1. Admin tạo SEMESTER mới (status: UPCOMING)
2. Sinh viên điền form khảo sát
   → Tạo MENTORING_REQUESTS

┌─────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 2: CHUẨN BỊ (Tháng 8)                       │
└─────────────────────────────────────────────────────────┘
3. Admin xem MENTORING_REQUESTS
   → Quyết định mở môn nào
   → Tạo SUBJECTS và gán tutorIds
4. Cập nhật SEMESTER status: OPEN_REGISTRATION
5. Sinh viên đăng ký môn
   → Tạo REGISTRATIONS
6. Admin duyệt đăng ký

┌─────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 3: BẮT ĐẦU HỌC (Tháng 9)                    │
└─────────────────────────────────────────────────────────┘
7. Cập nhật SEMESTER status: IN_PROGRESS
8. Giảng viên tạo lịch rảnh
   → Tạo SLOTS (với date cụ thể)
9. Sinh viên xem môn → chọn giảng viên → xem lịch → book
   → Tạo BOOKINGS
10. Hệ thống gửi NOTIFICATIONS

┌─────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 4: DIỄN RA (Cả kỳ)                          │
└─────────────────────────────────────────────────────────┘
11. Check-in khi đến buổi mentor
12. Hoàn thành và để lại feedback
13. Giảng viên tiếp tục tạo SLOTS mới




---
## 🚀 Quick Start
```
###  Install & Run Frontend
```powershell
cd client
npm install
npm run dev
```
---
## ⚙️ Development Commands
### Frontend Commands
```powershell
# Install dependencies
npm install
# Run development server
npm run dev
# Build for production
npm run build
# Preview production build
npm run preview
# Check code style 
npm run lint
```
---
## 📏 ESLint Rules & Code Standards
The project uses ESLint with custom rules to maintain code quality and consistency:
### 🔧 Detailed Rules Explanation
### 🔹 **React-specific rules**
| Rule | Level | Description |
|------|-------|-------------|
| `react-refresh/only-export-components` | ⚠️ warn | Cảnh báo nếu export không phải component (giúp React Refresh hoạt động đúng) |
| `react-hooks/rules-of-hooks` | 🚫 error | Bắt buộc dùng hook đúng chỗ (chỉ trong function component, custom hook) |
| `react-hooks/exhaustive-deps` | ⚠️ warn | Cảnh báo nếu thiếu dependency trong useEffect, useCallback, useMemo |
| `react/prop-types` | ➖ off | Tắt kiểm tra PropTypes |
| `react/display-name` | ➖ off | Tắt rule bắt buộc đặt displayName cho component (cho linh hoạt) |
### 🔹 **Code quality rules**
| Rule | Level | Description |
|------|-------|-------------|
| `no-console` | ⚠️ warn | Cảnh báo khi có console.log |
| `no-lonely-if` | ⚠️ warn | Cảnh báo khi dùng if lẻ trong else → nên dùng else if |
| `no-unused-vars` | ⚠️ warn | Cảnh báo biến khai báo mà không dùng |
| `no-trailing-spaces` | ⚠️ warn | Cảnh báo khoảng trắng ở cuối dòng |
| `no-multi-spaces` | ⚠️ warn | Cảnh báo dùng nhiều hơn 1 space liên tiếp |
| `no-multiple-empty-lines` | ⚠️ warn | Cảnh báo có nhiều dòng trống liên tiếp |
| `no-unexpected-multiline` | ⚠️ warn | Ngăn lỗi do ASI (Automatic Semicolon Insertion) gây ra |
### 🔹 **Formatting rules**
| Rule | Level | Description |
|------|-------|-------------|
| `space-before-blocks` | 🚫 error | Luôn có 1 space trước dấu `{` |
| `object-curly-spacing` | ⚠️ warn | Luôn có space bên trong `{ ... }` |
| `indent` | ⚠️ warn | Thụt dòng 2 spaces |
| `semi` | ⚠️ warn | Không dùng dấu `;` |
| `quotes` | 🚫 error | Luôn dùng nháy đơn `'` |
| `array-bracket-spacing` | ⚠️ warn | Luôn có space trong `[ ... ]` |
| `linebreak-style` | ➖ off | Không ép buộc kiểu xuống dòng (LF/CRLF) |
| `keyword-spacing` | ⚠️ warn | Bắt buộc có space quanh từ khóa (`if (...)`, `for (...)`) |
| `comma-dangle` | ⚠️ warn | Cảnh báo về dấu phẩy cuối (theo mặc định rule ESLint) |
| `comma-spacing` | ⚠️ warn | Cảnh báo nếu thiếu space sau dấu phẩy |
| `arrow-spacing` | ⚠️ warn | Cảnh báo thiếu space quanh `=>` |
### 📋 Key Standards
#### ✅ **Required:**
- **Single quotes** for strings
- **2-space indentation**
- **No semicolons** (ASI style)
- **Space before blocks** `if () {`
- **Proper React hooks usage**
#### ⚠️ **Warnings:**
- Console statements (remove in production)
- Unused variables
- Multiple empty lines
- Inconsistent spacing
#### 🚫 **Errors:**
- React hooks violations
- Single quote violations
- Missing spaces before blocks
### 🛠️ Usage
```powershell
# Check all files
npm run lint
# Auto-fix fixable issues
npm run lint -- --fix
# Check specific file
npx eslint src/components/MyComponent.jsx
```
---
## 🌿 Git Workflow
### 🔑 Main Branches
- **`main`** → Production branch, always stable
- **`feature/*`** → Feature branches from `main`
```
┌─── Git Flow Diagram ───┐
                        
  (dev)     ●────●───●───●───●───●─────●─────●─────●───●
             │    │                    ╱               / 
             |    │                   ╱               /
             |    │                  ╱  (merge)      /
 (feature/A) │    ●───●──●────●─────●               /
             │                ↑                    / (merge) 
             │                PR                  /
             │             (review)              /
             │                                  /  
 (feature/B) ●───●───●───●───●─●───●─●───●─●───●
                                           ↑
                                           PR
                                        (review)
                         
### 🛠️ Workflow Steps
#### 1. Update main branch
```bash
git checkout dev
git pull origin dev
```
#### 2. Create new feature branch
```bash
git checkout -b feature/ISSUE-xxx-feature-name
```
#### 3. Commit and push code
```bash
git add .
git commit -m "feat: add login form (#123)"
git push origin feature/ISSUE-xxx-feature-name
```
#### 4. Create Pull Request
- **Source:** `feature/*`
- **Target:** `dev`
- **Requirement:** Review before merge ✅
---
### 🔧 Handling Conflicts
When conflicts occur during merge/rebase:
1) **Ensure you're on the correct branch:**
```bash
git checkout feature/ISSUE-xxx-feature-name
```
2) **Resolve conflicts** (look for `<<<<<<<`, `=======`, `>>>>>>>`) and stage:
```bash
git add -A
```
3) **Amend commit and force push:**
```bash
git commit --amend --no-edit
git push origin feature/ISSUE-xxx-feature-name -f
```
---

### 🚫 Don't:
- Commit directly to `main`
- Force push to `main`
- Merge without PR review

FE REACT && TAILWINDCSS