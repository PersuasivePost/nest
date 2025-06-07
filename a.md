# NestJS Learning & Experimentation Project

This project is a **learning playground** for exploring and experimenting with [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications.  
Here, I try out various features of NestJS, including authentication, validation, database integration, and end-to-end testing.

## Features & What I Learned

- **NestJS Fundamentals:**
  Explored modules, controllers, services, dependency injection, and decorators.

- **Authentication**

  - Implemented JWT-based authentication using Passport.
  - Custom guards and user decorators for route protection.
  - Signup and signin endpoints with hashed passwords (argon2).

- **Validation**

  - Used `class-validator` and `ValidationPipe` for DTO validation.
  - Automatic request validation and error handling.

- **Database Integration**

  - Integrated [Prisma ORM](https://www.prisma.io/) with PostgreSQL.
  - Defined models for `User` and `Bookmark` in `schema.prisma`.
  - Used Prisma service for database access and transactions.

- **User Module**

  - Get current user (`/users/me`).
  - Edit user profile.

- **Bookmark Module**

  - CRUD operations for bookmarks.
  - Bookmarks are always user-specific and protected by JWT.

- **Testing**

  - End-to-end (e2e) tests with [PactumJS](https://pactumjs.github.io/) and Jest.
  - Dockerized test database for isolated test runs.
  - Test scripts for signup, signin, user, and bookmark flows.

- **Dockerized Development**

  - `docker-compose.yml` for local and test Postgres databases.
  - Scripts for starting/stopping DBs and running migrations.

## 🧪 Tech Stack

1. NestJS (TypeScript)
2. Prisma ORM (PostgreSQL)
3. Passport & JWT (Authentication)
4. PactumJS (e2e testing)
5. Docker Compose (Databases)
6. Jest (Testing)
7. class-validator (Validation)

## 📚 References

1. [NestJS Documentation](https://docs.nestjs.com/)
2. [Prisma Documentation](https://www.prisma.io/docs)
3. [PactumJS Docs](https://pactumjs.github.io/)
4. [YouTube Tutorial Reference](https://youtu.be/GHTA143_b-s?si=8GCNnMxkdPi9hXR6)
