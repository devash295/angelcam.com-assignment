# AngelCam Project

## Development

### Prerequisites

1. **[Install Node.js](https://nodejs.org/en/)** - Required for running the frontend and deployment scripts.
2. **[Install Docker](https://docs.docker.com/get-docker/)** - Necessary for containerizing and running the backend.
3. **[Install React and TypeScript](https://reactjs.org/)** - The frontend is built using React with TypeScript.

### Frontend Development

To start frontend development, navigate to the `angelcam_frontend` directory and run the following commands:

> `npm install`

> `npm start`

This will install the necessary dependencies and start the development server.

### Backend Development

#### Prerequisites

1. **Docker** - Ensure Docker is installed and running.

The backend is a Django application containerized with Docker. The services are managed using Docker Compose.

#### Running the Backend

To run the backend services, navigate to the `django_backend` directory and run the following command:

> `docker compose build`

> `docker compose up -d`

This will build and start the Django application on port `8000`.

#### Backend URL Endpoints

Here are the available backend endpoints as defined in `api/urls.py`:

- `POST /auth/login`: Authenticates the user.
- `GET /getSharedCameras`: Retrieves shared cameras.
- `GET /getCameraStreams/<int:camera_id>`: Retrieves streams for a specific camera.
- `GET /getCameraRecordings/<int:camera_id>`: Retrieves recordings for a specific camera.
- `GET /getRecordingStream/<str:camera_id>`: Retrieves a specific recording stream.
- `POST /playRecordedStream`: Plays a recorded stream.
- `POST /pauseRecordedStream`: Pauses a recorded stream.
- `POST /speedRecordedStream`: Adjusts the playback speed of a recorded stream.

### Technology Stack

1. **Frontend**: React with TypeScript.
2. **Backend**: Django (Python), containerized with Docker.
3. **Database**: Managed by Django ORM (e.g., SQLite, PostgreSQL).
4. **Infrastructure**: Managed on AWS using Docker and Pulumi.
5. **API Services**: Django REST framework endpoints for authentication and camera management.

### Folder Structure

- **`angelcam_frontend/`**: Contains the React frontend project.
  - `src/components/`: All React components for the application.
  - `src/api/`: API service files for frontend communication.
- **`django_backend/`**: Contains the Django backend project.
  - `app/api/endpoints/`: API endpoints for authentication and camera management.
  - `app/config/`: Django project configuration files.
  - `app/middleware/`: Custom middleware, e.g., for request logging.
  - `Dockerfile`: Docker setup for the backend.
  - `docker-compose.yml`: Docker Compose configuration.

### Conclusion

This README provides a comprehensive guide to setting up and developing within the AngelCam project, covering both frontend and backend setups. Be sure to follow the prerequisites and instructions carefully to ensure a smooth development process.
