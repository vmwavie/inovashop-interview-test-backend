# Inovashop Interview Test Backend

A Nodejs applications that controll to-do list

## Project setup

To set up the project, follow these steps:

1. Clone the repository:

```bash
  git clone https://github.com/vmwavie/inovashop-interview-test-backend.git
```

2. Navigate to the project directory:

```bash
cd inovashop-interview-test-frontend.
```

3. Install the dependencies:

```bash
npm install
```

4. Setup .env vars with you keys, to newrelic lincese key [get on](https://newrelic.com/). To run in docker, edit indocker-compose.yml services>agent>environment.

## Project structure

- `src`: The main source code directory, containing TypeScript files for the backend application.
  - `config`: Configuration files and constants.
  - `controllers`: Request handlers for different routes.
  - `db`: Database connection and related files.
  - `messages`: Message definitions for various parts of the application.
  - `middleware`: Custom middleware functions.
  - `migrations`: Database migration files.
  - `models`: Sequelize model definitions.
  - `routes`: API route definitions.
  - `seeders`: Database seed files.
  - `services`: Business logic and data access layer.
  - `types`: Custom type definitions.
  - `util`: Utility functions and helper classes.
  - `validation`: Request validation schemas.
- `Dockerfile`: Used to build a Docker image for the application.
- `docker-compose.yml`: Defines services and configurations for the Docker Compose environment.
- `newrelic-infra.dockerfile`: Dockerfile for New Relic infrastructure agent.
- `newrelic-infra.yml`: Configuration file for New Relic infrastructure monitoring.
- `tsconfig.json`: TypeScript compiler configuration file.
- `package.json`: NPM package configuration and script definitions.

## Available scripts

To run various tasks, use the following npm scripts:

- `npm run build-ts`: Compiles TypeScript files.
- `npm run build`: Builds the project (compiles TypeScript and runs linter).
- `npm run lint`: Runs ESLint to check your code for potential errors and stylistic issues.
- `npm run format`: Formats the code using Prettier.
- `npm start`: Starts the production server.
- `npm run dev`: Starts the development server with hot-reloading.
- `npm run watch-ts`: Watches for changes in TypeScript files and recompiles.
- `npm run watch`: Alias for `watch-ts`.
- `docker compose up`: Builds and runs the application using Docker Compose.
