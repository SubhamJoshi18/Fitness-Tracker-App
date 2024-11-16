# Fitness Tracker Backend API

Welcome to the Fitness Tracker Backend API! This project serves as the backend for a comprehensive fitness tracking application. It provides various microservices to handle authentication, blog posts, workouts, and models. This backend API is built using Node.js, TypeScript, and MongoDB, and is containerized using Docker.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication Microservice**: Handles user authentication and authorization.
- **Blog Microservice**: Manages blog posts related to fitness.
- **Workout Microservice**: Manages workout routines and details.
- **Model Microservice**: Handles various models used in the application.
- **MongoDB Integration**: Uses MongoDB as the database for storing data.
- **Dockerized**: Each microservice is containerized using Docker for easy deployment.

## Architecture

The project is divided into multiple microservices, each responsible for a specific functionality:

- **auth_microservice**: Manages user authentication and authorization.
- **blog_microservice**: Handles CRUD operations for blog posts.
- **workout_microservice**: Manages workout routines and details.
- **model_microservice**: Handles various models used in the application.

All microservices communicate with each other over a Docker network.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/fitness-tracker-backend.git
   cd fitness-tracker-backend


2. Install dependencies for each microservice:

    cd auth_microservice && npm install
    cd ../blog_microservice && npm install
    cd ../workout_microservice && npm install   
    cd ../model_microservice && npm install

Environment Variables:


Create a .env file in the root directory of each microservice and add the following environment variables

 PORT=your_port 
 SECRET=your_secret 
 MONGO_INITDB_ROOT_USERNAME=root MONGO_INITDB_ROOT_PASSWORD=example



## Running the Application

### Using Docker Compose

1. Build and start the containers:
   ```sh
   docker-compose up --build

2. The services will be available at the following ports:

    Auth Microservice: http://localhost:3000
    Blog Microservice: http://localhost:3002
    Workout Microservice: http://localhost:3001
    Model Microservice: http://localhost:3003
    MongoDB: mongodb://localhost:27017

API Documentation
Detailed API documentation can be found here. 
Postman Fitness Tracker AI Api : (https://web.postman.co/workspace/71ee4060-ef2d-4359-a45b-bb49a6668fb8)        



Contributing
Contributions are welcome! Please read the contributing guidelines first.

License
This project is licensed under the MIT License - see the LICENSE file for details.
