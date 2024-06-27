# HashService

HashService is a Node.js-based server that generates, stores, and manages hashes using PostgreSQL and Redis databases. This service can distribute generated hashes between the database and Redis, providing an efficient mechanism for hash allocation.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker Deployment](#docker-deployment)

## Installation

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- Redis

### Steps

1. Clone the repository:

    ```sh
    git clone https://github.com/Nik-Bz-22/HashService.git
    cd HashService
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

## Usage
1. Run the PostgreSQL and Redis servers.
    ### Postgres:
    ```sh
    psql -p 5400 -h 127.0.0.1 -U "root" -d hash_db
    ```
    ### Redis:
   ```sh
    redis-cli -p 6379 -h "localhost"
    ```
3. To start the server, run:

```sh
node index.mjs
```

## API Endpoints
### Post requests
1. To get hash:
```sh
    /getFreeHash
```

### Get requests
1. To get status info:
```sh
    /
```
