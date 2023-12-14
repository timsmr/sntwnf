#  Secret Santa game 🎅🏿

## Folders review
* backend - FastAPI version of backend (not working yet)
* backend_django - Django version of backend
* frontend - React App
* nginx - nginx setup configuration

## Usage

1. Make sure you have docker-compose installed. Easy way just to install Docker Desktop if you are Windows/MacOS user.

2. Put your django secret key in **docker-compose.yml** at 24th line.

3. Run this command in the root
    ```bash
    docker-compose up -d --build
    ```
That's it! Feel free to use it. 

The backend API will be available at 8000 port

The nginx server will be available at 80 port

