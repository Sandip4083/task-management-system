# TaskFlow — Task Management System

<div align="center">

![TaskFlow Banner](https://img.shields.io/badge/TaskFlow-Task%20Management%20System-7c9ef8?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMyIgeT0iNCIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE2IiByeD0iMyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjgiLz48cGF0aCBkPSJNNyA5aDYiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS44IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNNyAxM2g0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGNpcmNsZSBjeD0iMTciIGN5PSIxMyIgcj0iMy41IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuOCIvPjxwYXRoIGQ9Ik0xNS44IDEzbDEgMSAxLjgtMiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==)

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Express](https://img.shields.io/badge/Express.js-4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite&logoColor=white)](https://sqlite.org)
[![License](https://img.shields.io/badge/License-MIT-b57cf7?style=flat-square)](LICENSE)

**A full-stack, production-ready Task Management System with JWT auth, real-time stats, priority filters, and one-click Render deployment.**

[🚀 Live Demo](#-live-demo) · [📖 API Docs](#-api-endpoints) · [⚡ Quick Start](#-quick-start) · [📦 Deploy](#-deployment)

</div>

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT Strategy** — Short-lived access tokens (15min) + long-lived refresh tokens (7d)
- **Auto Token Refresh** — Axios interceptors silently refresh expired tokens
- **Password Hashing** — bcryptjs with 12 salt rounds
- **Protected Routes** — Both frontend route guards and backend middleware
- **Input Validation** — `express-validator` on all API endpoints

### 📋 Task Management
- **Full CRUD** — Create, read, update, and delete tasks
- **Priority Levels** — Low 🟢 / Medium 🟡 / High 🔴 with color-coded visual indicators
- **Status Tracking** — Toggle between `pending` and `completed` states
- **Due Dates** — Set deadlines with automatic overdue detection
- **Pagination** — Configurable page size (default 8 per page)
- **Search** — Full-text search on task title and description
- **Filters** — Filter by status and priority with chainable combinations

### 🎨 Premium UI/UX
- **Modern Dark Theme** — Deep navy palette with glassmorphism effects
- **Responsive Design** — Fully adaptive for desktop, tablet, and mobile
- **Micro-animations** — Smooth hover states, skeleton loading, modal transitions
- **Live Stats Dashboard** — Real-time card metrics with animated progress bar
- **Priority Borders** — Color-coded left border on each task card
- **Toast Notifications** — Non-intrusive feedback for all user actions
- **Password Strength** — Visual strength indicator on registration

---

## 🛠️ Tech Stack

| Layer      | Technology                        | Version  |
|------------|-----------------------------------|----------|
| Frontend   | React + Vite                      | 19 / 8   |
| Routing    | React Router DOM                  | 6        |
| Styling    | Vanilla CSS (CSS Custom Properties)| —       |
| HTTP Client| Axios                             | 1.x      |
| Toast UI   | react-hot-toast                   | 2.x      |
| Icons      | react-icons (HeroIcons)           | 5.x      |
| Backend    | Express.js + Node.js              | 4 / 18+  |
| Database   | SQLite3 (file-based)              | 5.x      |
| ORM        | Sequelize                         | 6.x      |
| Auth       | JWT (jsonwebtoken) + bcryptjs     | 9 / 2.x  |
| Validation | express-validator                 | 7.x      |
| Deploy     | Render.com                        | —        |

---

## 📁 Project Structure

```
TMS/
├── 📂 backend/
│   ├── 📂 config/
│   │   └── database.js          # Sequelize SQLite config
│   ├── 📂 controllers/
│   │   ├── authController.js    # Register, login, refresh, logout, me
│   │   └── taskController.js    # CRUD + toggle + stats
│   ├── 📂 middleware/
│   │   ├── auth.js              # JWT verification middleware
│   │   └── validate.js          # express-validator error handler
│   ├── 📂 models/
│   │   ├── index.js             # Sequelize init & associations
│   │   ├── User.js              # User model (id, username, email, password)
│   │   └── Task.js              # Task model (id, title, desc, priority, status, dueDate)
│   ├── 📂 routes/
│   │   ├── auth.js              # /api/auth routes
│   │   └── tasks.js             # /api/tasks routes
│   ├── server.js                # Express app + static file serving
│   ├── .env.example             # Environment variable template
│   └── package.json
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── ProtectedRoute.jsx   # Auth-gated route wrapper
│   │   │   ├── TaskCard.jsx         # Individual task card component
│   │   │   └── TaskModal.jsx        # Create/edit task modal
│   │   ├── 📂 context/
│   │   │   └── AuthContext.jsx      # Auth state, login/logout/register
│   │   ├── 📂 pages/
│   │   │   ├── Login.jsx            # Login page with animated visual panel
│   │   │   ├── Register.jsx         # Register with password strength meter
│   │   │   └── Dashboard.jsx        # Main app: stats, filters, task list
│   │   ├── 📂 services/
│   │   │   ├── api.js               # Axios instance + interceptors
│   │   │   └── taskService.js       # Task API calls
│   │   ├── App.jsx                  # Router + Toaster setup
│   │   ├── index.css               # Full design system (CSS variables + components)
│   │   └── main.jsx                # React entry point
│   ├── index.html                   # HTML shell + Google Fonts
│   └── package.json
├── package.json                     # Root scripts (build, deploy)
├── render.yaml                      # Render.com deploy blueprint
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** v18 or higher ([download](https://nodejs.org))
- **npm** v8+ (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/TMS.git
cd TMS
```

### 2. Set up the Backend

```bash
cd backend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# Then edit .env with your secrets (see Environment Variables section)

# Start the development server
npm run dev
```

> Backend runs at **http://localhost:5000**

### 3. Set up the Frontend

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

> Frontend runs at **http://localhost:5173**

### 4. Open in Browser

Navigate to **[http://localhost:5173](http://localhost:5173)** and register your first account!

---

## 🔐 Environment Variables

Create `backend/.env` from the provided template:

```env
# Server
PORT=5000
NODE_ENV=development

# JWT Secrets (use long random strings in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this

# Token Expiry
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

> ⚠️ **Never commit `.env` to version control.** The `.gitignore` already excludes it.

---

## 📡 API Endpoints

> All task endpoints require a valid `Authorization: Bearer <token>` header.

### 🔑 Authentication — `/api/auth`

| Method | Endpoint           | Body                              | Description            |
|--------|--------------------|-----------------------------------|------------------------|
| `POST` | `/register`        | `{ username, email, password }`   | Register new user      |
| `POST` | `/login`           | `{ email, password }`             | Login → tokens         |
| `POST` | `/refresh`         | `{ refreshToken }`                | Refresh access token   |
| `POST` | `/logout`          | `{ refreshToken }`                | Invalidate refresh token|
| `GET`  | `/me`              | —                                 | Get authenticated user |

### 📋 Tasks — `/api/tasks`

| Method   | Endpoint             | Query Params / Body                          | Description             |
|----------|----------------------|----------------------------------------------|-------------------------|
| `GET`    | `/`                  | `?page=1&limit=8&status=&priority=&search=`  | List tasks (paginated)  |
| `POST`   | `/`                  | `{ title, description?, priority, dueDate? }`| Create task             |
| `GET`    | `/:id`               | —                                            | Get single task         |
| `PUT`    | `/:id`               | `{ title, description?, priority, dueDate? }`| Update task             |
| `DELETE` | `/:id`               | —                                            | Delete task             |
| `PATCH`  | `/:id/toggle`        | —                                            | Toggle pending/completed|
| `GET`    | `/stats`             | —                                            | Get task statistics     |

### 📊 Stats Response Example

```json
{
  "success": true,
  "data": {
    "stats": {
      "total": 24,
      "completed": 18,
      "pending": 6,
      "completionRate": 75
    }
  }
}
```

### ✅ Health Check

```
GET /api/health
```

---

## 🚀 Deployment

This project is configured for **zero-config deployment on [Render.com](https://render.com)** via the included `render.yaml`.

### Deploy to Render in 3 Steps

1. **Push to GitHub** — Make sure your repo is on GitHub with the latest code.

2. **Connect on Render** — Go to [Render Dashboard](https://dashboard.render.com), click **New → Blueprint**, and connect your GitHub repository.

3. **Render auto-detects** `render.yaml` and configures the service. Environment variables (`JWT_SECRET`, `JWT_REFRESH_SECRET`) are auto-generated.

That's it! Render will:
- Install all dependencies (`npm run render-build`)
- Build the React frontend (`vite build`)
- Serve both frontend and API from a single Express server

### Manual Build (for other platforms)

```bash
# From the project root
npm run render-build
# Then start with:
node backend/server.js
```

---

## 🧑‍💻 Development Scripts

### Root (from `/TMS`)
| Command                | Description                            |
|------------------------|----------------------------------------|
| `npm run dev:backend`  | Start backend with nodemon (hot-reload)|
| `npm run dev:frontend` | Start Vite frontend dev server         |
| `npm run install:all`  | Install all backend + frontend deps    |
| `npm run build`        | Build the frontend for production      |
| `npm start`            | Start production server                |

### Backend (from `/TMS/backend`)
| Command       | Description                              |
|---------------|------------------------------------------|
| `npm run dev` | Start with nodemon (auto-restart)        |
| `npm start`   | Start production server                  |

### Frontend (from `/TMS/frontend`)
| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start Vite dev server (HMR)          |
| `npm run build` | Build optimized production bundle    |
| `npm run preview` | Preview the production build       |
| `npm run lint`  | Run ESLint checks                    |

---

## 🗄️ Database Schema

TaskFlow uses **SQLite** (file-based, zero config) via Sequelize ORM.

### Users Table

| Column      | Type     | Constraints                |
|-------------|----------|----------------------------|
| `id`        | INTEGER  | PK, Auto-increment         |
| `username`  | STRING   | Not null, unique           |
| `email`     | STRING   | Not null, unique, valid email|
| `password`  | STRING   | Not null, bcrypt hashed    |
| `createdAt` | DATE     | Auto                       |
| `updatedAt` | DATE     | Auto                       |

### Tasks Table

| Column        | Type    | Constraints                             |
|---------------|---------|-----------------------------------------|
| `id`          | INTEGER | PK, Auto-increment                      |
| `title`       | STRING  | Not null, max 200 chars                 |
| `description` | TEXT    | Optional                                |
| `priority`    | ENUM    | `low`, `medium`, `high` · Default: `medium`|
| `status`      | ENUM    | `pending`, `completed` · Default: `pending`|
| `dueDate`     | DATE    | Optional                                |
| `userId`      | INTEGER | FK → Users.id, cascade delete           |
| `createdAt`   | DATE    | Auto                                    |
| `updatedAt`   | DATE    | Auto                                    |

---

## 🎨 UI Design System

The frontend uses a **CSS Custom Properties** design system with no external CSS framework.

| Token                   | Value / Usage                                   |
|-------------------------|-------------------------------------------------|
| `--accent-primary`      | `#7c9ef8` — Blue (primary actions, links)       |
| `--accent-secondary`    | `#b57cf7` — Purple (gradients, rate card)       |
| `--accent-green`        | `#5dda9a` — Green (completed, success)          |
| `--accent-yellow`       | `#f8d06a` — Yellow (medium priority, pending)   |
| `--accent-red`          | `#f07a93` — Red (high priority, errors, overdue)|
| `--bg-overlay`          | `#0a0a14` — Page background                     |
| `--gradient-primary`    | Blue → Purple (buttons, logos)                  |

---

## 🔒 Security Notes

- Passwords are **never stored in plain text** — bcrypt with 12 rounds
- JWT access tokens expire in **15 minutes**, refresh tokens in **7 days**
- Refresh tokens are tracked server-side and can be invalidated on logout
- All API inputs are sanitized and validated with `express-validator`
- CORS is restricted to localhost:5173 in development, same-origin in production
- The `.env` file is excluded from git via `.gitignore`

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by Sandip4083 using React, Express, and SQLite

**[⬆ Back to top](#taskflow--task-management-system)**

</div>
