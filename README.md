# 📚 Tutor Support System - Group 4

> A comprehensive tutor-student management and communication system built with modern technologies.

---

## 📑 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [🛠️ Technology Stack](#️-technology-stack)
- [📂 Project Structure](#-project-structure)
- [✅ Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Development Commands](#️-development-commands)
- [🌿 Git Workflow](#-git-workflow)
  - [🔑 Main Branches](#-main-branches)
  - [🛠️ Workflow Steps](#️-workflow-steps)
  - [🔧 Handling Conflicts](#-handling-conflicts)
- [📋 Contributing Guidelines](#-contributing-guidelines)
- [🔮 Development Roadmap](#-development-roadmap)
- [📞 Contact & Support](#-contact--support)
- [📜 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🎯 Project Overview

The Tutor Support System is a web application designed to:
- 📝 Manage tutor and student information
- 💬 Facilitate communication and collaboration
- 📊 Track learning progress and performance
- 🔐 Provide authentication and user authorization

**Current Status:** Frontend completed, Backend in development.

---

## 🛠️ Technology Stack

### Frontend
- ⚛️ **React 19** - Modern UI library
- ⚡ **Vite 7** - Fast build tool
- 🎨 **MUI v7** - Material Design components
- 🎭 **Emotion** - CSS-in-JS styling
- 🧹 **ESLint 9** - Code quality assurance

### Backend *(in development)*
- 🟢 **Node.js + Express** - Server runtime
- 🗄️ **Database** - MongoDB/PostgreSQL
- 🔒 **Authentication** - JWT tokens
- 📡 **REST API** - RESTful architecture

---

## 📂 Project Structure

```
Tutor-Support-System-GR4/
├── 📁 client/                   # React Frontend Application
│   ├── 📁 public/               # Static assets
│   ├── 📁 src/
│   │   ├── 📁 api/              # API clients & config
│   │   ├── 📁 assets/           # Images, icons
│   │   ├── 📁 components/       # UI components
│   │   ├── 📁 hooks/            # Custom React hooks
│   │   ├── 📁 pages/            # Page components
│   │   ├── 📁 redux/            # State management
│   │   ├── 📁 services/         # Business logic
│   │   ├── 📁 utils/            # Utilities
│   │   ├── 📄 App.jsx           # Root component
│   │   ├── 📄 main.jsx          # Entry point
│   │   └── 📄 theme.js          # Theme config
│   └── 📄 package.json
├── 📁 sever/                    # Backend (empty)
└── 📄 README.md
```

---

## ✅ Prerequisites

- 🟢 **Node.js** v18+ ([Download](https://nodejs.org/))
- 📦 **npm** v9+ (or yarn/pnpm)
- 🔧 **Git** ([Download](https://git-scm.com/))
- 💻 **VS Code** + ESLint extension *(recommended)*

---

## 🚀 Quick Start

### 1️⃣ Clone repository

```powershell
git clone https://github.com/your-username/TUTOR-SUPPORT-SYSTEM-GR4.git
cd TUTOR-SUPPORT-SYSTEM-GR4
```

### 2️⃣ Install & Run Frontend

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

## 🌿 Git Workflow

### 🔑 Main Branches
- **`main`** → Production branch, always stable
- **`feature/*`** → Feature branches from `main`

### 🛠️ Workflow Steps

#### 1. Update main branch
```bash
git checkout main
git pull origin main
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
- **Target:** `main`
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

## 📋 Contributing Guidelines

### 🚫 Don't:
- Commit directly to `main`
- Force push to `main`
- Merge without PR review

### ✅ Do:
- Create issues before coding
- Follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:` - New features
  - `fix:` - Bug fixes
  - `docs:` - Documentation updates
  - `style:` - Code formatting
  - `refactor:` - Code refactoring
  - `test:` - Add tests
  - `chore:` - Maintenance tasks

### 📝 Contribution Process:
1. 🎯 Create or pick an issue
2. 🌿 Follow Git workflow
3. 👥 Create PR and request review
4. ✅ Merge after approval

---

## 🔮 Development Roadmap

### Phase 1: ✅ Frontend Foundation
- [x] Setup React + Vite
- [x] MUI integration
- [x] Project structure
- [x] Development workflow

### Phase 2: 🚧 Backend Development
- [ ] Setup Express server
- [ ] Database design & models
- [ ] Authentication system
- [ ] REST API endpoints

### Phase 3: 🔄 Integration
- [ ] Frontend-Backend connection
- [ ] State management (Redux)
- [ ] Error handling
- [ ] Testing

### Phase 4: 🚀 Deployment
- [ ] Production build
- [ ] CI/CD pipeline
- [ ] Monitoring & logging
- [ ] Performance optimization

---

