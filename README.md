# SleakOps Dashboard App

## Docker Setup

### Prerequisites

- Docker
- Docker Compose

### Running with Docker

1. Clone the repository:

```bash
git clone <repository-url>
cd sleakops-dashboard-app
```

2. Start the application using Docker Compose:

```bash
docker-compose up --build
```

The application will be available at: http://localhost:3000

| Command                     | Description                       |
| --------------------------- | --------------------------------- |
| `docker-compose up`         | Start the application             |
| `docker-compose up --build` | Rebuild and start the application |
| `docker-compose down`       | Stor the application              |
| `docker-compose logs -fw`   | view logs in real-time            |

## Development Mode

The application runs in production mode.

## TroubleShooting

if you encounter any issues:

1.  Make sure no other service is using port 3000,
2.  Tryu cleaning Docker cache,

If you encounter any issues with the application, please reach out to the project maintainer.
