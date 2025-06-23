# Docker Setup for Todo Application

This document provides instructions for running the Todo application using Docker and Docker Compose.

## Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

## Project Structure

```
todo-app-fullstack/
├── client/                 # React frontend
│   ├── Dockerfile         # Production Dockerfile for client
│   ├── Dockerfile.dev     # Development Dockerfile for client
│   └── nginx.conf         # Nginx configuration for production
├── server/                # Node.js backend
│   └── Dockerfile         # Dockerfile for server
├── docker-compose.yml     # Production Docker Compose
├── docker-compose.dev.yml # Development Docker Compose
└── .dockerignore          # Docker ignore file
```

## Running the Application

### Production Mode

To run the application in production mode:

```bash
# Build and start the containers
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

The application will be available at:
- Frontend: http://localhost (port 80)
- Backend API: http://localhost:5000

### Development Mode

To run the application in development mode with hot reloading:

```bash
# Build and start the development containers
docker-compose -f docker-compose.dev.yml up --build

# Or run in detached mode
docker-compose -f docker-compose.dev.yml up -d --build
```

The application will be available at:
- Frontend: http://localhost:3000 (with hot reloading)
- Backend API: http://localhost:5000 (with nodemon)

## Docker Commands

### Basic Commands

```bash
# Stop all containers
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View running containers
docker-compose ps

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs server
docker-compose logs client

# Rebuild containers
docker-compose build

# Rebuild specific service
docker-compose build server
```

### Development Commands

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# View development logs
docker-compose -f docker-compose.dev.yml logs
```

### Cleanup Commands

```bash
# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune

# Remove all unused volumes
docker volume prune

# Remove everything (use with caution)
docker system prune -a
```

## Services

### Server (Backend)
- **Port**: 5000
- **Technology**: Node.js with Express
- **Features**: REST API for todo management
- **Environment**: Production uses `npm start`, Development uses `npm run dev` with nodemon

### Client (Frontend)
- **Port**: 80 (production), 3000 (development)
- **Technology**: React
- **Production**: Built and served with Nginx
- **Development**: Served with React development server
- **Features**: Hot reloading in development mode

## Environment Variables

The application uses the following environment variables:

### Server
- `NODE_ENV`: Set to 'production' or 'development'
- `PORT`: Server port (default: 5000)

### Client (Development)
- `CHOKIDAR_USEPOLLING`: Enables file watching in Docker (set to true)

## Networking

Both services are connected via a custom Docker network (`todo-network`) which allows:
- Internal communication between services
- Service discovery by service name
- Isolation from other Docker applications

## Volumes

### Production
- No persistent volumes (stateless application)

### Development
- Source code is mounted as volumes for hot reloading
- Node modules are preserved in anonymous volumes

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :5000
   lsof -i :80
   
   # Kill the process or change ports in docker-compose.yml
   ```

2. **Permission issues on Linux**
   ```bash
   # Fix ownership issues
   sudo chown -R $USER:$USER .
   ```

3. **Container won't start**
   ```bash
   # Check logs
   docker-compose logs [service-name]
   
   # Rebuild containers
   docker-compose build --no-cache
   ```

4. **Hot reloading not working in development**
   - Ensure `CHOKIDAR_USEPOLLING=true` is set
   - Check that volumes are properly mounted

### Debugging

```bash
# Execute commands inside running containers
docker-compose exec server sh
docker-compose exec client sh

# Check container status
docker-compose ps

# Inspect container details
docker inspect todo-server
docker inspect todo-client
```

## Performance Tips

1. **Use .dockerignore**: Exclude unnecessary files to speed up builds
2. **Multi-stage builds**: Production Dockerfile uses multi-stage builds for smaller images
3. **Layer caching**: Dependencies are installed before copying source code
4. **Development volumes**: Source code changes don't require rebuilds

## Security Considerations

1. **Non-root user**: Consider adding non-root user in Dockerfiles
2. **Environment variables**: Use Docker secrets for sensitive data in production
3. **Network isolation**: Services communicate through internal network
4. **Image scanning**: Regularly scan images for vulnerabilities

```bash
# Scan images for vulnerabilities
docker scan todo-server
docker scan todo-client
