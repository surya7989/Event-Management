# Event Management Project Walkthrough & Explanation Script

Use this guide to explain your project to others (interviewers, teachers, or colleagues).

---

## 1. Project Overview
**"I have built a Full Stack Event Management Application using the MERN Stack (MongoDB, Express, React, Node.js). The application allows users to browse events, filter them by category/location/date, view details, and register for events securely."**

### Key Features:
- **Authentication**: Secure Login and Registration using JWT (JSON Web Tokens).
- **Event Discovery**: Dynamic filtering and searching of events.
- **Data Persistence**: All data is stored in MongoDB Atlas.
- **Responsive Design**: Works on Desktop and Mobile.
- **Deployment**: hosted live on Render.

---

## 2. Database Design (MongoDB Schemas)
**"I designed a relational data model using Mongoose Schemas to ensure data integrity."**

### A. User Schema (`models/User.js`)
- **Fields**: `name`, `email` (unique), `password` (hashed).
- **Purpose**: Stores user credentials. Passwords are hashed using `bcryptjs` for security before saving.

### B. Event Schema (`models/Event.js`)
- **Fields**: `name`, `description`, `date`, `location`, `category`, `capacity`, `availableSeats`, `image`.
- **Purpose**: Stores all event details.
- **Logic**: I track `availableSeats` to prevent over-booking.

### C. Registration Schema (`models/Registration.js`)
- **Fields**:
  - `user`: Reference to User ID.
  - `event`: Reference to Event ID.
  - `registrationDate`: Automatically set to now.
- **Uniqueness**: A compound index ensures a user cannot register for the same event twice.

---

## 3. Backend Code Walkthrough
**"The backend is an Express.js server that provides RESTful APIs."**

- **`server.js`**:
  - The entry point.
  - Connects to MongoDB using `mongoose`.
  - Configures **CORS** to allow the frontend to communicate securely.
  - Defines routes: `/api/auth`, `/api/events`, `/api/registrations`.

- **Controllers (`controllers/`)**:
  - **`authController.js`**: Handles `login` (generates JWT) and `register` (hashes password).
  - **`eventController.js`**: Handles fetching events with filters (using MongoDB `$regex` for search and `find` for filters).
  - **`registrationController.js`**: Handles the transaction of registering a user (decrementing seat count) and checking for duplicates.

- **Middleware (`middleware/authMiddleware.js`)**:
  - Protects private routes. It verifies the JWT token sent in the `Authorization` header and adds the user data to the request.

---

## 4. Frontend Code Walkthrough
**"The frontend is a Single Page Application (SPA) built with React and Vite."**

- **`App.jsx`**:
  - Sets up Routing using `react-router-dom`.
  - Includes Protected Routes (e.g., Dashboard) that redirect to Login if not authenticated.

- **`api/index.js`**:
  - A centralized Axios instance.
  - **Smart Logic**: Automatically switches between `localhost` (for dev) and the deployed Render URL (for production).
  - **Interceptor**: Automatically attaches the JWT token to every request so we don't have to repeat code.

- **`pages/Home.jsx`**:
  - Displays the Event Dashboard.
  - Manages complex state: `events` list, `filters` object, `loading` state, and `error` handling.
  - Updates list in real-time when filters change.

---

## 5. Live Demo Script (Step-by-Step)
**"Let me show you the live application."**

1.  **Landing Page**: "Here is the Home page. You can see a list of curated events."
2.  **Filtering**: "I can search for 'Music' or filter by location 'New York'. Notice how the list updates instantly."
3.  **Registration**:
    - Click **Sign Up**.
    - "I'll create a new user 'DemoUser'."
    - (Show successful redirection to Login/Home).
4.  **Event Details**:
    - Click on an event (e.g., "Indie Rock Night").
    - "Here we see full details and available seats."
5.  **Booking**:
    - Click **Register**.
    - "The app confirms my booking and updates the available seats in the database."
6.  **Dashboard**:
    - Go to **Dashboard**.
    - "Here I can see all my upcoming events."
    - Click **Cancel Registration** to show the reversal logic.

---

## 6. Deployment Strategy
**"I deployed the app on Render using a Microservices architecture."**
- **Backend Service**: Node.js/Express (Web Service).
- **Frontend Service**: React Static Site.
- **Connection**: They connect securely over HTTPS using environment variables (`VITE_API_URL`) and CORS whitelisting.
