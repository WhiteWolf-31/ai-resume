# ResumeAI - AI Resume Analyzer 🚀

ResumeAI is an AI-powered resume analysis platform that helps users evaluate their resumes using Artificial Intelligence. It extracts resume information, provides ATS compatibility scores, identifies strengths and weaknesses, and gives improvement recommendations.

The project is built with a modern full-stack architecture using React.js for the frontend and Laravel for the backend.

---

## ✨ Features

### 📄 Resume Upload
- Upload resumes in PDF format
- Automatically extract resume text
- Store resume history securely

### 🤖 AI Resume Analysis
- ATS score calculation
- Resume summary generation
- Skill extraction
- Strength identification
- Weakness detection
- AI improvement suggestions

### 📊 Dashboard
- View latest ATS score
- Track uploaded resumes
- Monitor AI analysis usage
- Download AI-generated reports

### 🔐 Authentication
- User registration
- User login
- Secure API authentication using Laravel Sanctum

### ⏳ AI Credit System
- Limited AI analysis credits
- Automatic 24-hour credit reset
- Usage tracking

### 📈 Resume Comparison
- Compare previous and improved resume versions
- Track resume improvement progress

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- jsPDF


## Backend

- Laravel 10
- PHP 8.2+
- MySQL
- Laravel Sanctum
- REST API


## AI Integration

- Groq API
- Llama 3.3 Model


## Resume Processing

- Smalot PDF Parser

---

# 📂 Project Structure

```
AI-Resume
│
├── client          # React Frontend
│
├── server          # Laravel Backend
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/WhiteWolf-31/ai-resume.git
```

Move into the project:

```bash
cd ai-resume
```

---

# Frontend Setup

Go to client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# Backend Setup

Go to Laravel folder:

```bash
cd server
```

Install composer packages:

```bash
composer install
```

Create environment file:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

---

## Database Configuration

Update your `.env` file:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=resume_ai
DB_USERNAME=root
DB_PASSWORD=
```

Run migrations:

```bash
php artisan migrate
```

Create storage link:

```bash
php artisan storage:link
```

---

## Add AI API Key

Add your Groq API key:

```
GROQ_API_KEY=your_api_key_here
```

---

Run Laravel server:

```bash
php artisan serve
```

Backend will run on:

```
http://127.0.0.1:8000
```

---

# 🔑 API Features

## Authentication

```
POST /api/register

POST /api/login

POST /api/logout
```


## Resume

Upload resume:

```
POST /api/resume/upload
```

Get resume history:

```
GET /api/resume/history
```

Delete resume:

```
DELETE /api/resume/{id}
```


## AI Usage

```
GET /api/usage
```

---

# 📸 Screenshots

(Add your screenshots here)

Example:

```
![Dashboard](screenshots/dashboard.png)
```

---

# 🚀 Future Improvements

- Resume builder feature
- Multiple AI model support
- Job description matching
- LinkedIn profile analyzer
- Premium subscription plans
- Cloud file storage
- Advanced resume comparison

---

# 👨‍💻 Developer

**Omprakash Gajananan**

Junior Web Developer

Skills:
- React.js
- Next.js
- Laravel
- WordPress
- Tailwind CSS

---

# 📜 License

This project is created for educational and portfolio purposes.

---

⭐ If you like this project, consider giving it a star!
