
# Event Booking System API

This is a Node.js/Express API for managing events and bookings, powered by PostgreSQL and Sequelize ORM. The project is containerized using Docker for easy development and deployment.

---

## 📦 Tech Stack

- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- Docker & Docker Compose
- JWT Authentication

---

## ⚙️ Project Structure

```
event-booking-api/
├── Dockerfile
├── docker-compose.yml
├── .env
├── package.json
├── src/
│   ├── models/
│   ├── modules/
│   ├── middleware/
│   ├── server.js
│   └── swagger.js
```

---

## 🚀 Getting Started

### 1. Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8080
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

---

### 3. Docker Setup

To build and run the containers:

```bash
docker-compose up --build
```

This will:

- Start a PostgreSQL database on port `5432`
- Build and run the API on the port you specify in `.env` (default: 8080)

---

### 4. API Endpoints

Some example endpoints (based on a typical event booking app):

| Method | Endpoint               | Description             |
|--------|------------------------|-------------------------|
| GET    | `/events`              | List all events         |
| POST   | `/events`              | Create a new event      |
| POST   | `/register`            | Register a user         |
| POST   | `/login`               | Login and receive token |
| POST   | `/bookings`            | Book an event           |

---

### 5. Sequelize Models

Define your models inside `src/models/` and set up associations if needed. Example models:

- User
- Event
- Booking

Don't forget to run migrations or `sequelize.sync()` in `index.js`.

---

## 🐳 docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    container_name: event-booking-db
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: event_booking_db
    volumes:
      - db-data:/var/lib/postgresql/data

  api:
    build: .
    container_name: event-booking-api
    ports:
      - "${PORT}:${PORT}"
    env_file:
      - .env
    depends_on:
      - db
    command: npm run dev
    volumes:
      - .:/app
      - /app/node_modules

volumes:
  db-data:
```

---

## ✅ Tips

- Use `docker-compose down -v` to reset volumes.
- Use `psql` or a DB GUI (like pgAdmin or TablePlus) to inspect your DB.
- Logs: `docker-compose logs -f api` or `docker-compose logs -f db`

---

## 📜 License

MIT
