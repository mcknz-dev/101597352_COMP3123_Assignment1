# COMP3123 Assignment 1 — Employee Management API

## Description
A RESTful API built with Node.js, Express, MongoDB, and Mongoose. It supports user registration and login with JWT authentication, plus employee CRUD operations. Employees are associated with their owner, and authenticated users can access only their own employee records.

## Technologies
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Helmet
- express-rate-limit
- express-validator
- Morgan
- Postman

## Setup

1. Clone or download this repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   PORT=8081
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Ensure the MongoDB database name is `comp3123_assignment1`.
5. Start the server:

   ```bash
   node server.js
   ```

The API runs at `http://localhost:8081`.

## Endpoints

### Health
- `GET /health` — checks whether the API is responding.

### User
- `POST /api/v1/user/signup` — register a user.
- `POST /api/v1/user/login` — authenticate a user and receive a JWT.

### Employee
All employee endpoints require a JWT Bearer token.

- `GET /api/v1/emp/employees` — list the authenticated user's employees.
- `POST /api/v1/emp/employees` — create an employee.
- `GET /api/v1/emp/employees/:eid` — retrieve an employee by ID.
- `PUT /api/v1/emp/employees/:eid` — update an employee by ID.
- `DELETE /api/v1/emp/employees?eid=:eid` — delete an employee by ID.

## Authentication
After logging in, copy the returned JWT and select **Bearer Token** under Postman's Authorization tab for employee requests. The API uses the token to identify the authenticated user and restrict access to that user's employee records.

## Security and Logging
- Passwords are hashed using bcryptjs.
- JWTs protect employee routes.
- Employee queries are scoped to the authenticated user.
- Helmet adds HTTP security headers.
- Rate limiting restricts repeated authentication attempts.
- Morgan records HTTP requests in `logs/access.log`.

## Testing
API requests were tested using Postman, including:
- User signup and login
- Employee create, read, update, and delete operations
- Invalid login credentials
- Missing authentication
- Employee ownership isolation
- Authentication rate limiting
- Health-check endpoint and request logging

## Environment Variables
Never commit `.env` or real credentials to source control. Use `.env.example` with placeholder values when sharing the project. Install dependencies with `npm install` before running the API.
