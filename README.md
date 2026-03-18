# TaskFlow — Task Management System

A full-stack Task Management System built with **Express.js** (backend) and **React + Vite** (frontend).

## 🚀 Features

### Backend
- **JWT Authentication** — Access + Refresh token strategy
- **Password Encryption** — bcrypt with 12 rounds of salting
- **Task CRUD** — Create, Read, Update, Delete operations
- **Pagination** — Paginated task list with configurable page size
- **Filtering** — Filter by status (pending/completed) and priority (low/medium/high)
- **Search** — Full-text search on task title and description
- **Data Validation** — express-validator for all inputs
- **Error Handling** — Consistent error responses with proper HTTP status codes

### Frontend
- **Modern Dark UI** — Catppuccin-inspired design with smooth animations
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Token Auto-Refresh** — Transparent JWT refresh via Axios interceptors
- **Real-time Feedback** — Toast notifications for all operations
- **Skeleton Loading** — Premium loading states
- **Filter & Search** — Live search with status and priority filters

## 🛠️ Tech Stack

| Layer      | Technology            |
|------------|-----------------------|
| Frontend   | React 18 + Vite       |
| Styling    | Vanilla CSS           |
| Backend    | Express.js + Node.js  |
| Database   | SQLite3               |
| ORM        | Sequelize             |
| Auth       | JWT + bcryptjs        |

## 📦 Getting Started

### Prerequisites
- Node.js 18+ installed

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on **http://localhost:5000**

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

## 📡 API Endpoints

### Authentication
| Method | Endpoint             | Description          |
|--------|---------------------|----------------------|
| POST   | `/api/auth/register` | Register new user    |
| POST   | `/api/auth/login`    | Login user           |
| POST   | `/api/auth/refresh`  | Refresh access token |
| POST   | `/api/auth/logout`   | Logout user          |
| GET    | `/api/auth/me`       | Get current user     |

### Tasks
| Method | Endpoint                  | Description         |
|--------|--------------------------|---------------------|
| GET    | `/api/tasks`              | Get tasks (paginated) |
| POST   | `/api/tasks`              | Create task         |
| GET    | `/api/tasks/:id`          | Get single task     |
| PUT    | `/api/tasks/:id`          | Update task         |
| DELETE | `/api/tasks/:id`          | Delete task         |
| PATCH  | `/api/tasks/:id/toggle`   | Toggle task status  |
| GET    | `/api/tasks/stats`        | Get task statistics |

## 📁 Project Structure

```
TMS/
├── backend/
│   ├── config/database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validate.js
│   ├── models/
│   │   ├── index.js
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskModal.jsx
│   │   ├── context/AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── taskService.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```
