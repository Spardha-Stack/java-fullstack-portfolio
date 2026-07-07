# 🌐 Java Full Stack Portfolio

> A modern, production-ready Full Stack Developer Portfolio built with **React**, **Spring Boot**, and **MySQL**.

## 🚀 Overview
This portfolio demonstrates full-stack development skills using React, Spring Boot, and MySQL. Portfolio sections are served dynamically through REST APIs.

## ✨ Features
- Dynamic Profile
- Skills
- Projects
- Experience
- Education
- Certifications
- Achievements
- Contact Form
- MySQL Integration
- Email Notifications
- Swagger API Docs
- Responsive UI

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router
- React Hook Form

### Backend
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate
- Maven
- Lombok

### Database
- MySQL

## 🏗 Architecture

```text
React
 │
Axios
 │
Spring Boot
 │
Service
 │
Repository
 │
Hibernate/JPA
 │
MySQL
```

## 📂 Project Structure

```text
portfolio/
├── backend/
├── frontend/
│   ├── assets/
│   ├── backup_data/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   └── utils/
├── docs/
└── README.md
```

## 🌐 Routes

- /
- /about
- /skills
- /experience
- /education
- /projects
- /achievements
- /certificates
- /contact

## 📡 REST APIs

- GET /api/profile
- GET /api/skills
- GET /api/projects
- GET /api/projects/{id}
- GET /api/experience
- GET /api/education
- GET /api/certificates
- GET /api/achievements
- POST /api/contact

Swagger:
http://localhost:8080/swagger-ui.html

## ⚙ Local Setup

Backend

```bash
cd backend
mvn spring-boot:run
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🗄 Database

Create:

```sql
CREATE DATABASE springbootdb;
```

Use environment variables:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

Never commit passwords or secrets.

## 📧 Contact Flow

React Form → Spring Boot API → MySQL + Email → Success

## 🚀 Deployment

Frontend: Vercel

Backend: Render / Railway

Database: MySQL

## 🔮 Future Enhancements

- Admin Dashboard
- Spring Security + JWT
- Docker
- CI/CD
- Blog
- Analytics

## 👩‍💻 Author

**Spardha Shukla**

GitHub: https://github.com/Spardha-Stack

LinkedIn: https://www.linkedin.com/in/spardha-shukla-1bb9a9279/

LeetCode: https://leetcode.com/u/SPARDHA829982/

Email: spardha964864shukla@gmail.com

## ⭐ Support

If you found this project useful, please give it a ⭐ on GitHub.
