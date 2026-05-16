# SWAPI Backend

Enterprise-grade backend service for the Star Wars API, built with a monorepo architecture.

## Prerequisites

- **Node.js**: `v20.x` (Strictly enforced)
- **Yarn**: `v1.22.x` (Classic)
- **Docker Engine**: `v24+` & **Docker Compose**

## Environment Configuration

Never commit secrets to version control.

```bash
cp .env.example .env
```

_Note: Populate `.env` with your local credentials. For production environments, inject variables securely via a secrets manager (e.g., Vaultwarden)._

## Setup & Deployment

Follow exact steps to bootstrap the environment:

```bash
# 1. Install specific API dependencies
cd apps/api
yarn install

# 2. Return to root, build and start containers
cd ../../
docker compose up --build -d

# 3. Apply database migrations
DATABASE_HOST=localhost yarn workspace api mig:run

# 4. Synchronize / Seed Database
curl -X POST http://localhost:3000/sync/all
```

## API Validation (cURL)

### 1. Create a Resource

```bash
curl -X POST http://localhost:3000/characters \
  -H "Content-Type: application/json" \
  -d '{
    "name": "C-3PO",
    "birthYear": "112BBY",
    "eyeColor": "yellow",
    "gender": "n/a",
    "hairColor": "n/a",
    "height": "167",
    "mass": "75",
    "skinColor": "gold"
  }'
```

### 2. Upload Media Assets

_Requires a valid entity ID from the creation response._

```bash
curl -X POST http://localhost:3000/images/characters/00cb0c5f-3d42-4348-b774-1fbeb95b8b2f \
  -H "Content-Type: multipart/form-data" \
  -F "files=@/absolute/path/to/image.jpeg"
```

### 3. Delete a Resource

```bash
curl -X DELETE http://localhost:3000/characters/00cb0c5f-3d42-4348-b774-1fbeb95b8b2f
```

## Production Migrations

If deploying to production, run migrations inside the dedicated container:

```bash
docker compose --profile migrate run --rm migrate
```
