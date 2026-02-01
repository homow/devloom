# 🎓 Devloom – Full‑Stack Programming Education Platform

A modern, modular, scalable platform built with **Express + MongoDB** on the backend and **React + Vite** on the frontend.

Devloom is designed to be a clean, maintainable foundation for building a real programming education ecosystem — including courses, users, progress tracking, and more.

---

# 🏗️ Project Structure

```
devloom/
│── server/     → Backend (Express + TypeScript + MongoDB)
│── client/     → Frontend (React + Vite + TypeScript)
```

---

# 🔥 Backend – Devloom API

A fully modular, type‑safe API built with **TypeScript**, designed for clarity and long‑term maintainability.

## 🚀 Features

- Course CRUD system
- User system (JWT-ready)
- Zod-based validation
- Multer file uploads
- Environment-based configuration
- Clean architecture with modular folders
- MongoDB models with Mongoose

---

## 📦 Backend Packages (Important Only)

| Package          | Version | Description                        |
|------------------|---------|------------------------------------|
| **typescript**   | ^5.9.3  | Type-safe backend development      |
| **express**      | ^5.2.1  | Core HTTP framework                |
| **mongoose**     | ^9.1.1  | MongoDB ODM for schema modeling    |
| **jsonwebtoken** | ^9.0.3  | JWT authentication handling        |
| **bcrypt**       | ^6.0.0  | Secure password hashing            |
| **dotenv**       | ^17.2.3 | Environment variable loader        |
| **multer**       | ^2.0.2  | File upload middleware             |
| **cors**         | ^2.8.5  | Cross-origin resource sharing      |
| **zod**          | ^4.3.4  | Schema validation + type inference |
| **tsx**          | ^4.21.0 | Fast TS execution with watch mode  |

---

## 🏁 Backend Quick Start

```bash
cd server
npm install
npm run dev
```

Create `.env`:

```env
BASE_URL="/api/v1"
MONGODB_NAME="devloom"
MONGO_URI="mongodb://localhost:27017/devloom"
PORT="3000
JWT_SECRET="your_secret_key"
```

---

# 🎨 Frontend – Devloom Client

A fast, modern frontend built with **React + TypeScript**, powered by **Vite** for an ultra‑smooth developer experience.

The client is fully TypeScript‑based, ensuring type‑safety, maintainability, and clean integration with the Devloom API.

---

## 📦 Frontend Packages (Important Only)

| Package                         | Version | Description                           |
|---------------------------------|---------|---------------------------------------|
| **react**                       | ^19.2.0 | Core UI library                       |
| **react-dom**                   | ^19.2.0 | DOM renderer for React                |
| **vite**                        | ^7.2.4  | Ultra-fast frontend bundler           |
| **@vitejs/plugin-react**        | ^5.1.1  | React + Fast Refresh support for Vite |
| **typescript**                  | ^5.9.x  | TypeScript support for the frontend   |
| **eslint**                      | ^9.39.1 | Linting for code quality              |
| **eslint-plugin-react-hooks**   | ^7.0.1  | Rules for React hooks                 |
| **eslint-plugin-react-refresh** | ^0.4.24 | Ensures safe Fast Refresh usage       |

---

## 🏁 Frontend Quick Start

```bash
cd client
npm install
npm run dev
```

---

# 🌐 Full‑Stack Development

To run both:

```bash
cd server && npm run dev
cd client && npm run dev
```

Backend runs on: **http://localhost:3000**  
Frontend runs on: **http://localhost:5173**

---

# 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/homow">
        <img src="https://github.com/homow.png" width="80" height="80" style="border-radius:50%;" alt="Homayoun"/><br/>
        <sub><b>Homayoun</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/bitazarei">
        <img src="https://github.com/bitazarei.png" width="80" height="80" style="border-radius:50%;" alt="Bita"/><br/>
        <sub><b>Bita</b></sub>
      </a>
    </td>
  </tr>
</table>
