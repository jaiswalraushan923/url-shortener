# 🔗 URL Shortener Service

A secure and feature-rich URL shortening backend built with **Spring Boot**, allowing users to:

- ✅ Register and login
- ✂️ Shorten long URLs
- 🌍 Use shortened URLs anywhere
- 👤 View all URLs created by a user
- 📈 Track number of clicks with timestamps
- 📅 Filter analytics based on date and time
- 🐳 Deploy easily with Docker

> ✅ Deployed Live at: [https://url-shortener-6kbq.onrender.com](https://url-shortener-6kbq.onrender.com)

---

## 🚀 Features

- **JWT Authentication** with role-based access (`ROLE_USER`)
- **Short URL Generation** with redirection
- **Click Tracking** with timestamped logs
- **User Dashboard** to view their shortened URLs
- **Analytics** filtered by date and time
- **Database Switching**:  
  - `H2` in development  
  - `PostgreSQL` in production
- **Dockerized Deployment** using `Dockerfile` and hosted on **Render**

---

## 🛠️ Tech Stack

- Java 17+
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- H2 / PostgreSQL
- Docker
- Render (Deployment)

---

## 📡 API Endpoints

> 🔐 Base URL: `https://url-shortener-6kbq.onrender.com`

### 🔐 Authentication

| Method | Endpoint                                | Description               |
|--------|-----------------------------------------|---------------------------|
| POST   | `/api/auth/public/register`             | Register a new user       |
| POST   | `/api/auth/public/login`                | Login and get JWT token   |

---

### 🔗 URL Shortening & Analytics (Requires `ROLE_USER`)

| Method | Endpoint                                           | Description                                 |
|--------|----------------------------------------------------|---------------------------------------------|
| POST   | `/api/urls/shorten`                                | Shorten a long URL                          |
| GET    | `/api/urls/myurls`                                 | Get all shortened URLs by the user          |
| GET    | `/api/urls/analytics/{shortUrl}`                   | Get click events by date range              |
| GET    | `/api/urls/totalClicks`                            | Get total click count grouped by date       |

**Query Parameters for Analytics:**
- `startDate` and `endDate` for `/analytics/{shortUrl}`: format `yyyy-MM-dd'T'HH:mm:ss`
- for `/totalClicks`: format `yyyy-MM-dd`

---

### 🌍 Redirection

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/{shortUrl}`         | Redirect to original long URL |

---

## 🐳 Docker Deployment

Build and run the app with Docker:

```bash
# Build Docker image
docker build -t url-shortener .

# Run the container
docker run -p 8080:8080 url-shortener
