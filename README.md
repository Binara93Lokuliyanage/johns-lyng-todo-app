# Johns Lyng Group - TODO List Technical Assessment

## Overview

This project is a full-stack TODO List application developed as part of the technical assessment process.

The application allows users to:
- View TODO items
- Create new TODO items
- Update existing TODO items
- Delete TODO items
- Mark TODO items as completed or pending
- Filter tasks by status (All / Completed / Pending)

The project was built using the latest versions of Angular and .NET Web API while following clean architecture, reusable component structure, responsive UI practices, and scalable frontend/backend separation.

---

# Tech Stack

## Frontend
- Angular 21
- TypeScript
- SCSS
- Angular Reactive Forms
- Lucide Angular Icons

## Backend
- .NET 9 Web API
- C#
- Minimal APIs
- In-memory data storage
- Swagger / OpenAPI

---

# Project Structure

## Frontend

```text
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── models/
│   │   ├── services/
│   │   ├── app.routes.ts
│   │   └── app.ts
│   └── styles/
```

## Backend

```text
backend/
├── TodoApi/
│   ├── Dtos/
│   ├── Models/
│   ├── Services/
│   └── Program.cs
```

---

# Features

## Frontend Features

- Responsive dashboard-style UI
- Sidebar navigation
- TODO filtering
- Reactive forms with validation
- Loading and error states
- Reusable SCSS structure
- Test-friendly HTML structure using `data-testid`

## Backend Features

- RESTful API structure
- DTO-based request handling
- Service layer abstraction
- Input validation
- Swagger documentation
- In-memory data management

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/todos` | Get all TODO items |
| GET | `/api/todos/{id}` | Get TODO item by ID |
| POST | `/api/todos` | Create TODO item |
| PUT | `/api/todos/{id}` | Update TODO item |
| PUT | `/api/todos/{id}/toggle` | Toggle completed status |
| DELETE | `/api/todos/{id}` | Delete TODO item |

---

# Running The Project

## Backend Setup

Navigate to the backend directory:

```bash
cd backend/TodoApi
```

Restore packages:

```bash
dotnet restore
```

Run the API:

```bash
dotnet run
```

Swagger:

```text
http://localhost:5062/swagger
```

---

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run Angular application:

```bash
ng serve
```

Frontend URL:

```text
http://localhost:4200
```

---

# Notes

- The backend uses in-memory storage as requested in the assessment.
- Data will reset when the backend application restarts.
- The project was built with focus on maintainability, scalability, reusable styling structure, and clean frontend/backend separation.

---

# Author

Binara Lokuliyanage

