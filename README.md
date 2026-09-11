# OOADCRAFT — Interactive OOAD Learning Platform

> **Tagline**: Learn. Design. Validate. Build.

OOADCRAFT is an interactive learning platform for Object-Oriented Analysis and Design (OOAD) designed for college students and software engineering learners.

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Lucide React + Recharts + React Router v6
- **Backend**: Spring Boot 3.2.3 + Java 17 + Spring Security + Spring Data JPA + JWT + MySQL Driver
- **Database**: MySQL 8.0+ (`jdbc:mysql://localhost:3306/ooadcraftdb?createDatabaseIfNotExist=true`)

## Quick Start

### 1. Backend Setup
```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to access OOADCRAFT.
