# Event Management Platform

A full-stack Event Management application built with the MERN stack (MongoDB, Express, React, Node.js). This platform allows users to discover, register for, and manage events seamlessly.

## 🚀 Features

-   **User Authentication**: Secure Login and Registration using JWT.
-   **Event Discovery**: Browse upcoming events with filtering options (Category, Location, Date).
-   **Dashboard**:
    -   View registered events.
    -   Track upcoming and past events.
    -   Cancel registrations.
-   **Responsive Design**: Fully responsive UI built with modern CSS and React.
-   **RESTful API**: Robust backend API handling events, users, and registrations.

## 🛠️ Tech Stack

-   **Frontend**: React.js, Vite, React Router, Axios, Lucide React (Icons)
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (Mongoose)
-   **Authentication**: JSON Web Tokens (JWT), Bcrypt.js
-   **Deployment**: Render (configured via `render.yaml`)

## ⚙️ Installation & Setup

### Prerequisites

-   Node.js installed
-   MongoDB Atlas connection string

### 1. Clone the Repository

```bash
git clone https://github.com/surya7989/Event-Management.git
cd Event-Management
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

Open a new terminal window:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory (optional for local dev, Render handles this automatically):

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

## 🌍 Deployment

This project is configured for easy deployment on **Render**.

1.  Push your code to GitHub.
2.  Log in to [Render](https://render.com).
3.  Create a new **Blueprint** and connect your repository.
4.  Render will automatically detect the `render.yaml` file and deploy both the frontend and backend services.
5.  Add your environment variables (`MONGODB_URI`, `JWT_SECRET`) in the Render dashboard.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.