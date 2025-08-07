# DevOpsFarm.in Validator

A TypeScript-based Express.js application with MongoDB integration for user validation and authentication.

## Project Overview

This is a robust backend application built with TypeScript and Express.js, featuring:
- User authentication and validation
- MongoDB integration
- Swagger API documentation
- JWT-based authentication
- Express middleware for request handling

## Prerequisites

- Node.js (v14 or higher)
- TypeScript
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

1. Development mode:
   ```bash
   npm run dev
   ```

2. Production mode:
   ```bash
   npm run build
   npm run start:prod
   ```

## Project Structure

```
src/
├── app.ts              # Express application configuration
├── server.ts           # Server entry point
├── config/             # Configuration files
├── controllers/        # Request handlers
├── models/            # MongoDB models
├── routes/            # API routes
├── services/          # Business logic services
├── Middleware/        # Custom middleware
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
└── swagger/           # Swagger documentation
```

## Key Dependencies

- **Express**: Web framework
- **TypeScript**: Type-safe JavaScript
- **Mongoose**: MongoDB ODM
- **JWT**: JSON Web Tokens for authentication
- **Swagger**: API documentation
- **Passport**: Authentication middleware
- **Winston**: Logging
- **Express-Validator**: Request validation

## Features

- User authentication and registration
- JWT-based token authentication
- Swagger API documentation
- MongoDB integration
- TypeScript type safety
- Middleware-based request handling
- Environment variable configuration

## API Documentation

Access the Swagger UI at: `http://localhost:5000/api-docs`

## License

ISC License

run server :- ts-node src/server.ts
Server running on port 5000
MongoDB Connected
