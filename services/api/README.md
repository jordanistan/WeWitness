# WeWitness API Service

This service handles video uploads, metadata storage, and incident management.

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm
- Docker

### Installation

1. Install dependencies:

   ```bash
    npm install
    ```

### Running the Service

- **Development (with hot-reloading):**

  ```bash
    npm run dev
    ```

- **Production:**

  First, build the TypeScript source:

  ```bash
    npm run build
    ```

    Then, run the compiled JavaScript:

    ```bash
    npm start
    ```

- **Docker:**

  Build the Docker image:

  ```bash
    docker build -t wewitness-api .
    ```

    Run the container:

    ```bash
    docker run -p 3000:3000 wewitness-api
    ```

## API Endpoints

- `GET /`: Health check endpoint.
- `POST /upload`: Placeholder for uploading encrypted video chunks.
