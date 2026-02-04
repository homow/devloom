# 🎓 Devloom – Programming Education Platform API

**Devloom** is a modular, scalable API designed for building a modern programming education platform.  
Built with **TypeScript + Express + MongoDB + Zod**, focusing on clarity, structure, and long‑term maintainability.

---

## 🚀 Features

- Course management (create, update, list, deleteUser)
- User system ready for authentication (JWT-ready)
- Modular folder structure for clean architecture
- Type-safe development with TypeScript
- Schema validation using Zod
- File upload support with Multer (for course thumbnails, etc.)
- Environment-based configuration with dotenv

---

## 📦 Packages

| Package          | Version | Description                               |
|------------------|---------|-------------------------------------------|
| **typescript**   | ^5.9.3  | Type-safe language for the project        |
| **express**      | ^5.2.1  | Core framework for building the API       |
| **mongoose**     | ^9.1.1  | MongoDB ODM for database modeling         |
| **jsonwebtoken** | ^9.0.3  | JWT-based authentication                  |
| **bcrypt**       | ^6.0.0  | Password hashing                          |
| **dotenv**       | ^17.2.3 | Environment variable management           |
| **multer**       | ^2.0.2  | File upload middleware                    |
| **cors**         | ^2.8.5  | Cross-origin resource sharing             |
| **zod**          | ^4.3.4  | Type-safe schema validation               |
| **tsx**          | ^4.21.0 | Fast TypeScript execution with watch mode |

---

## 🏁 Quick Start

1. Clone the project:

   ```bash
   git clone https://github.com/homow/devloom.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```env
   BASE_URL="/api/v1"
   MONGODB_NAME="devloom"
   MONGO_URI="mongodb://localhost:27017/devloom"
   PORT="3000"
   JWT_SECRET="your_secret_key"
   ```

4. Run the project in development mode:

   ```bash
   npm run dev
   ```

---

## 🏗️ Build (Production)

To compile the TypeScript source code into JavaScript:

```bash
npm run build
```

This will generate the `dist/` folder containing the production‑ready code.

---

## 🚀 Start (Production)

After building the project, run the compiled server:

```bash
npm start
```

Or directly:

```bash
node dist/server.js
```

---

## 🔐 Security Note: Script Folder Access

The `src/scripts` directory contains development‑only utilities such as database seeders (e.g., the **super‑admin creation script**).  
These scripts are **not part of the production runtime** and must **not** be executable in deployed environments.

### ✔️ Recommended Production Setup

- **Do not grant execution permission** to the `scripts` folder on production servers
- Or **exclude the folder entirely** during deployment (CI/CD or Docker build)
- Ensure that only trusted developers can run these scripts locally

This prevents accidental or unauthorized execution of sensitive operations such as creating privileged users.

---

## 🔮 Future Plans

- Full authentication system (JWT + refresh tokens)
- Course categories, tags, and difficulty levels
- User progress tracking
- Admin panel for managing courses and users
- Search, filtering, and pagination for courses
- Optional frontend with React or Next.js
