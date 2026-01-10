# WeWitness Worker Service

This service handles background jobs, such as video processing, evidence package exports, and data retention policy enforcement.

## Tech Stack

- **Node.js**
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

  This service is orchestrated by the root `docker-compose.yml` file.
