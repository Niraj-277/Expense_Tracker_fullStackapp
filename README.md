# Full-Stack Expense Tracker
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Niraj-277/Expense_Tracker_fullStackapp)

A full-stack MERN (MongoDB, Express, React, Node.js) application designed for personal expense tracking. It features secure user authentication and full CRUD (Create, Read, Update, Delete) functionality for managing expenses.

## Features

- **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
- **CRUD Operations**: Create, read, update, and delete expense records.
- **Expense Dashboard**: A central dashboard to view all expenses, see a running total, and manage individual entries.
- **Categorization**: Assign expenses to categories like Food, Rent, Travel, or General.
- **Protected Routes**: Backend API routes are protected, ensuring that users can only access their own data.
- **Responsive UI**: A clean and functional user interface for managing expenses.

## Tech Stack

- **Frontend**:
  - React (with Vite)
  - React Router DOM for client-side routing
  - Inline CSS for styling

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose ODM)
  - `jsonwebtoken` for token-based authentication
  - `bcrypt` for password hashing
  - `cors` for enabling cross-origin requests
  - `dotenv` for environment variable management

## Project Structure

The project is organized into two main directories:

- `backend/`: Contains the Express.js server, API routes, controllers, middleware, and database models.
- `expense-tracker-client/`: Contains the React frontend application built with Vite.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18 or later)
- npm (Node Package Manager)
- A running MongoDB instance (local or a cloud service like MongoDB Atlas)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env` file in the `backend` directory and add the following variables:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the client directory:**
    ```bash
    cd expense-tracker-client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env.local` file in the `expense-tracker-client` directory and add the URL of your backend API:

    ```env
    VITE_API_URL=http://localhost:5000/api/v1
    ```

4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## API Endpoints

All expense routes require a valid JWT in the `Authorization: Bearer <token>` header.

| Method | Endpoint                    | Description                           |
| :----- | :-------------------------- | :------------------------------------ |
| `POST` | `/api/v1/register`          | Register a new user.                  |
| `POST` | `/api/v1/login`             | Log in and receive a JWT.             |
| `POST` | `/api/v1/expense`           | Create a new expense.                 |
| `GET`  | `/api/v1/getexpense`        | Get all expenses for the logged-in user. |
| `PUT`  | `/api/v1/updateexpense/:id` | Update an existing expense by its ID. |
| `DELETE`| `/api/v1/deleteexpense/:id`| Delete an expense by its ID.          |
