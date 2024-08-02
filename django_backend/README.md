# QuickStitch Server

Repository for the quickstitch API.

## Getting Started

Create a virtual environment:

```bash
python3.11 -m venv venv

```

Activate the environment:

Windows:

```bash
venv/Scripts/activate
```

Mac / Linux:

```bash
source venv/bin/activate
```

Install the required packages:

```bash
cd app
pip install -r requirements.txt
```
## Launching

To launch the server, you first need to retrieve the secret.json file from LastPass. That file should live under /app/.config/secret.json directory.
To launch the server:

```bash
cd app
python manage.py runserver

```

There are three possible environments that you can launch, and you can specify them like so (if none are specified, development is default):

```bash
python manage.py runserver
```

## Viewing

You can view the swagger documentation under these paths:

```bash
http://127.0.0.1:8000/redoc/
http://127.0.0.1:8000/swagger/
http://127.0.0.1:8000/api/
```

## Setup Docker

Ensure you have Docker and Docker Compose installed on your system.

- [Get Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

### Usage

To start the Docker containers, run

```bash
docker-compose up -d
```

To stop the Docker container, run:

```bash
docker-compose down
```
