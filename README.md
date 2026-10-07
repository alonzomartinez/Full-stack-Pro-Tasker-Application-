# Alonso's Pro-Tasker Full-Stack Application

## Project Purpose

Pro-Tasker is a full-stack MERN application for managing projects and tasks.

Users can create an account, log in, create projects, update or delete their projects, and create tasks inside each project. Tasks can also be updated, deleted, and given a status of To Do, In Progress, or Done.

JWT authentication is used to protect user data. Users can only access and modify projects and tasks that belong to them.

## Live Deployment

Pro-Tasker is deployed using Render.

**Frontend (Live Application):**  
https://full-stack-pro-tasker-application-1.onrender.com

**Backend (API):**  
https://full-stack-pro-tasker-application.onrender.com 

The frontend is built with React and TypeScript, while the backend uses Express and MongoDB Atlas to manage users, projects, and tasks.

Users can visit the live frontend link to register, log in, and manage their projects and tasks.

## Features

- User registration and login
- JWT authentication
- Protected frontend pages and backend routes
- Create, view, update, and delete projects
- Create, view, update, and delete tasks
- Task status options:
  - To Do
  - In Progress
  - Done
- Project and task ownership protection
- Responsive layout for desktop, tablet, and mobile screens
- Loading and error messages
- JWT stored in localStorage after login

## Technologies Used

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS
- Fetch API

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- JSON Web Token (JWT)
- dotenv
- CORS
- Nodemon

## Project Structure

The project is separated into a frontend and backend:

```text
Mern-full-stack/
├── backend/
└── frontend/
```

The frontend contains the React application and user interface.

The backend contains the Express API, MongoDB connection, authentication, models, controllers, and routes.

## Installation

Make sure you have Node.js and npm installed.

Clone the repository and open the project folder.

### Backend Installation

Move into the backend folder:

```bash
cd backend
```

Install the backend dependencies:

```bash
npm install
```

### Frontend Installation

Move into the frontend folder:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

## Environment Variables

Environment variables are stored in separate `.env` files.

These files should not be committed to GitHub.

### Backend Environment Variables

Create a `.env` file inside the `backend` folder:

```text
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_secret_key
```

Replace the MongoDB connection string and JWT secret with your own values.

### Frontend Environment Variables

Create a `.env` file inside the `frontend` folder:

```text
VITE_API_URL=http://localhost:3000
```

This tells the React frontend where to send API requests.

## Running the Application

The backend and frontend should run in separate terminals.

### Start the Backend

From the `backend` folder:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:3000
```

You should see messages showing that the server is running and MongoDB is connected.

### Start the Frontend

Open another terminal and move into the `frontend` folder:

```bash
npm run dev
```

Vite will display the local frontend address, normally:

```text
http://localhost:5173
```

Open that address in the browser to use Pro-Tasker.

## Frontend Pages

The application includes the following pages:

- Login
- Register
- Dashboard
- Create Project
- Project Details
- Edit Project
- Create Task
- Edit Task

The Dashboard, project pages, and task pages are protected routes and require the user to be logged in.

## API Endpoints

### User Routes

| Method | Endpoint | Purpose |
| ------ | -------- | ------- |
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Log in and receive a JWT |

### Project Routes

| Method | Endpoint | Purpose |
| ------ | -------- | ------- |
| POST | `/api/projects` | Create a project |
| GET | `/api/projects` | Get the logged-in user's projects |
| GET | `/api/projects/:id` | Get one project |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

### Task Routes

| Method | Endpoint | Purpose |
| ------ | -------- | ------- |
| POST | `/api/projects/:projectId/tasks` | Create a task for a project |
| GET | `/api/projects/:projectId/tasks` | Get all tasks for a project |
| PUT | `/api/tasks/:taskId` | Update a task |
| DELETE | `/api/tasks/:taskId` | Delete a task |

## Authentication

The application uses JWT authentication.

When a user successfully logs in, the backend returns a JWT. The frontend saves the token in `localStorage`.

Protected API requests send the token using the Authorization header:

```text
Authorization: Bearer TOKEN
```

The backend checks the token before allowing access to protected routes.

Ownership checks are also used so users cannot access or modify another user's projects or tasks.

## Postman Testing

The backend API was tested using Postman.

For protected requests, use:

```text
Authorization → Bearer Token
```

Paste the JWT received after logging in into the Token field.

For requests that send JSON data, use:

```text
Body → raw → JSON
```

Testing included:

- User registration
- User login
- Invalid login information
- Protected routes with and without a JWT
- Creating projects
- Viewing projects
- Updating projects
- Deleting projects
- Creating tasks
- Viewing tasks
- Updating tasks
- Deleting tasks
- Project ownership authorization
- Task ownership authorization

A different user attempting to access or modify another user's protected data received a `403 Forbidden` response.

## Frontend Testing

The frontend was also tested through the browser.

Testing included:

- Creating an account
- Logging in
- Logging out
- Protected page redirects
- Viewing the project dashboard
- Creating a project
- Viewing a project
- Editing a project
- Deleting a project
- Creating a task
- Editing a task
- Changing task status
- Deleting a task
- Confirming database changes in MongoDB
- Testing the responsive layout at smaller screen sizes

## Responsive Design

The frontend uses CSS to adjust the layout for smaller screens.

On smaller screens:

- Page headings and actions stack vertically
- Project and task action buttons stack vertically
- Forms resize to fit the screen
- Page spacing is reduced

The application also uses a blue theme with card shadows, hover effects, form focus styles, and responsive navigation.

## Security

The application includes several security features:

- Passwords are hashed using bcrypt
- JWT authentication protects private routes
- Project ownership is checked on the backend
- Task ownership is checked through the user's projects
- Environment variables are stored outside the source code
- `.env` files are ignored by Git

## Reflection

This project helped me practice connecting a React frontend to an Express and MongoDB backend. I learned how the frontend can send requests to an API using `fetch` and how React state can update the information displayed to the user.

I also learned how JWT authentication can be shared throughout a React application using Context and how protected routes can prevent users from opening pages unless they are logged in.

On the backend, I practiced using Express routes, controllers, Mongoose models, and ownership checks. Building the full application helped me understand how the frontend, backend, and database work together as one full-stack application.

## Dependencies

Install all required packages by running:

```bash
npm install
```

inside both the `backend` and `frontend` folders.

### Main Backend Packages

```text
express
mongoose
bcrypt
jsonwebtoken
dotenv
cors
nodemon
```

### Main Frontend Packages

```text
react
react-dom
react-router-dom
vite
typescript
```