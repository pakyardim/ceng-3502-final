> This project was created as the final project for the course **CENG-3502 (Web Programming)**.  
> It is intended for **educational use only**.

# ✈️ FlyTicket – Airline Booking Web Application

FlyTicket is a full-stack web application developed for an airline company. It allows users to search and book flights, while administrators can manage flight listings through a dedicated interface.

## 🚀 Features

### ✨ User Features

- View all available flights
- Search for specific flights based on criteria
- Book tickets

### 🔧 Admin Features

- Create new flights
- View tickets

---

## 🛠️ Technologies Used

### Frontend (Vite + React)

- **React** – UI Library
- **Vite** – Lightning-fast development server and bundler
- **TanStack Query** – Data fetching and caching
- **ShadCN UI** – UI components built on top of Radix UI
- **Axios** – HTTP client for API communication
- **Tailwind CSS** – Utility-first CSS framework

### Backend (Node.js + Express)

- **Express.js** – Web framework for Node.js
- **MySQL** – Relational database for storing flight and booking data

---

## 🗂️ Project Structure

/FlyTicket
│
├── client # Frontend (Vite + React)
└── API # Backend (Node.js + Express)

---

## ▶️ How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/pakyardim/ceng-3502-final.git
cd flyticket
```

### 2. Backend Setup

```bash
cd api
npm install
npm start
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

## 🔑 Admin Login Credentials

```bash
Username: admin
Password: admin123
```

## Required environmental variables

### API

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=db
DB_PORT=3306

JWT_SECRET=jwt_secret
```

### Client

```bash
VITE_API_URL=http://localhost:5000/api
```
