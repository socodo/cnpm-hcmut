# 🎓 Mentor Bright – Tutor Support System 

> 🚀 **A modern mentoring platform connecting students and university lecturers**
> Built with **MERN**

---

## 📌 Overview

**Mentor Bright** is a web-based mentoring support system designed for students at **Ho Chi Minh City University of Technology (HCMUT)**.
The platform enables students to connect with lecturers and mentors to receive academic guidance, resolve learning difficulties, and participate in structured mentoring programs throughout a semester.

This repository focuses on the **Frontend application**, built using **React** and **Tailwind CSS**.

---

## 🧠 Core Concept

The system follows a **semester-based mentoring workflow**, managed by administrators and lecturers:

* Students participate in surveys at the beginning of each semester
* Administrators analyze demands and open mentoring subjects
* Lecturers publish their available time slots
* Students register, book mentoring sessions, and provide feedback

Mentoring sessions can be conducted **online or offline**.

---

## 🔄 Mentoring Workflow

### 🟦 Phase 1: Beginning of Semester (July)

1. Admin creates a new **Semester** (`UPCOMING`)
2. Students complete survey forms
   → Generate **Mentoring Requests**

---

### 🟨 Phase 2: Preparation (August)

3. Admin reviews mentoring requests

   * Selects subjects to open
   * Assigns lecturers (tutors)
4. Semester status updated to `OPEN_REGISTRATION`
5. Students register for subjects
   → Create **Registrations**
6. Admin approves registrations

---

### 🟩 Phase 3: Learning Starts (September)

7. Semester status updated to `IN_PROGRESS`
8. Lecturers publish available schedules
   → Create **Slots**
9. Students browse subjects → select lecturer → book slot
   → Create **Bookings**
10. System sends notifications

---

### 🟪 Phase 4: During the Semester

11. Students check in for mentoring sessions
12. Sessions are completed and rated
13. Lecturers continue adding new slots

---

## 🧩 Key Features (Frontend)

* Semester & subject exploration
* Lecturer availability & booking system
* Online / offline mentoring types
* Rating & feedback after sessions
* Responsive UI with Tailwind CSS
* Clean component-based architecture

---

## 🛠️ Tech Stack

### Frontend

| Technology       | Usage                      |
| ---------------- | -------------------------- |
| **React**        | UI development             |
| **Vite**         | Fast build tool            |
| **Tailwind CSS** | Styling                    |
| **React Router** | Client-side routing        |
| **Axios**        | HTTP client                |
| **ESLint**       | Code quality & consistency |

### Backend

| Technology     | Usage                              |
| -------------- | ---------------------------------- |
| **Node.js**    | Runtime environment                |
| **Express.js** | RESTful API server                 |
| **MongoDB**    | NoSQL database                     |
| **JWT**        | Authentication & authorization     |
| **Cloudinary** | Media storage (avatars, materials) |

---

## 🚀 Quick Start

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-org/mentor-bright.git
cd mentor-bright
```

---

### 2️⃣ Run Backend Server

```bash
cd server
npm install
npm run dev
```

Backend server runs at:
👉 `http://localhost:8080`

---

### 3️⃣ Run Frontend Client

```bash
cd client
npm install
npm run dev
```

Frontend application runs at:
👉 `http://localhost:5173`

---

## ⚙️ Development Commands

### Backend Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Fr

```bash
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

This project uses **custom ESLint rules** to ensure clean and consistent code.

### 🔹 React Rules

* Proper usage of React Hooks
* React Refresh compatibility
* No PropTypes enforcement (flexibility)

### 🔹 Code Quality

* Warn on `console.log`
* Prevent unused variables
* Enforce clean spacing & formatting

### 🔹 Formatting Standards

* **Single quotes**
* **2-space indentation**
* **No semicolons**
* Space before `{`
* Consistent array & object spacing

### 🛠️ ESLint Usage

```bash
# Lint all files
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

---

## 🌿 Git Workflow

### Main Branches

* **`main`** – Stable production branch
* **`dev`** – Development branch
* **`feature/*`** – Feature implementation

### Workflow Steps

```bash
# Update dev
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/ISSUE-xxx-feature-name

# Commit changes
git add .
git commit -m "feat: add booking UI"

# Push branch
git push origin feature/ISSUE-xxx-feature-name
```

➡️ Create a **Pull Request** to `dev`
➡️ Review required before merge

---

## 🚫 Rules

* ❌ Do not commit directly to `main`
* ❌ Do not force-push to `main`
* ❌ No merge without PR review

---

## 🎯 Target Audience

* University students
* Academic mentors & lecturers
* Educational program administrators

---

## 📬 Contact

For questions or collaboration:

📧 **[anh.trannguyen@hcmut.edu.vn](mailto:anh.trannguyen@hcmut.edu.vn)**
