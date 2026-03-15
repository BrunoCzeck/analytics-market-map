# Driva - Market Intelligence Dashboard

A Brazil market intelligence dashboard with an interactive map showing layered business data. Built to support strategic decisions about market expansion, competitive analysis, and demand estimation across all 27 Brazilian states.

## Overview

Driva provides a full-screen interactive map of Brazil with toggleable data layers:

- **Filiais Ativas** - Active branch locations (green markers)
- **Potencial de Mercado** - Market potential heatmap per state (color-coded by score)
- **Demanda Estimada** - Estimated demand bubbles proportional to volume
- **Zonas de Expansão** - Priority expansion zones (dashed purple outlines)
- **Concorrência** - Known competitor locations (red markers)

Clicking any state marker opens a detail panel with metrics, a market potential score, and a comparative bar chart of the top 8 states.

---

## Architecture

```
┌─────────────────────────────────────────┐
│               Browser                   │
│  React + Vite (port 3000)               │
│  ┌─────────────────────────────────┐    │
│  │  Dashboard (react-leaflet map)  │    │
│  │  LayerPanel  │  FilterBar       │    │
│  │  RegionPanel │  StatsBar        │    │
│  └──────────────┬──────────────────┘    │
└─────────────────┼───────────────────────┘
                  │ HTTP /api/v1/*
                  ▼
┌─────────────────────────────────────────┐
│          BFF - Node.js + Fastify        │
│          (port 3001)                    │
│                                         │
│  Interfaces (HTTP routes)               │
│    /branches  /states  /competitors     │
│    /market/potential  /market/demand    │
│    /market/expansion-zones  /overview   │
│                                         │
│  Application (Use Cases)                │
│    GetBranches  GetStates  GetCompetitors│
│                                         │
│  Domain (Entities + Repository Interfaces)│
│    Branch  State  Competitor            │
│                                         │
│  Infrastructure (In-Memory Repositories)│
│    Mock data for all 27 states + branches│
└─────────────────────────────────────────┘
```

---

## Project Structure

```
driva/
├── docker-compose.yml
├── README.md
├── bff/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── server.ts
│       ├── domain/
│       │   ├── entities/
│       │   │   ├── Branch.ts
│       │   │   ├── State.ts
│       │   │   └── Competitor.ts
│       │   └── repositories/
│       │       ├── IBranchRepository.ts
│       │       ├── IStateRepository.ts
│       │       └── ICompetitorRepository.ts
│       ├── infrastructure/
│       │   ├── mock-data/
│       │   │   ├── branches.ts
│       │   │   ├── states.ts
│       │   │   └── competitors.ts
│       │   └── repositories/
│       │       ├── InMemoryBranchRepository.ts
│       │       ├── InMemoryStateRepository.ts
│       │       └── InMemoryCompetitorRepository.ts
│       ├── application/
│       │   └── use-cases/
│       │       ├── GetBranches.ts
│       │       ├── GetStates.ts
│       │       └── GetCompetitors.ts
│       └── interfaces/
│           └── http/
│               └── routes/
│                   ├── branches.ts
│                   ├── states.ts
│                   ├── competitors.ts
│                   └── market.ts
└── ui/
    ├── Dockerfile
    ├── nginx.conf
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── types/
        │   └── index.ts
        ├── services/
        │   └── api.ts
        ├── contexts/
        │   ├── LayerContext.tsx
        │   └── FilterContext.tsx
        ├── hooks/
        │   └── useMapData.ts
        ├── components/
        │   ├── Map/
        │   │   ├── BrazilMap.tsx
        │   │   ├── MapLegend.tsx
        │   │   └── StatsBar.tsx
        │   ├── LayerPanel/
        │   │   └── LayerPanel.tsx
        │   ├── Filters/
        │   │   └── FilterBar.tsx
        │   └── RegionPanel/
        │       └── RegionPanel.tsx
        └── pages/
            └── Dashboard/
                └── Dashboard.tsx
```

---

## Running Locally

### Prerequisites

- Node.js 20+
- npm 9+

### BFF

```bash
cd bff
npm install
npm run dev
# BFF available at http://localhost:3001
```

### UI

```bash
cd ui
npm install
npm run dev
# UI available at http://localhost:3000
```

The Vite dev server proxies `/api/*` requests to `http://localhost:3001`, so both services must be running simultaneously.

---

## Running with Docker

```bash
docker compose up --build
```

- UI: http://localhost:3000
- BFF: http://localhost:3001

To run only the BFF:

```bash
docker compose up --build bff
```

---

## Deploying to Vercel (UI)

1. Install the Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy the UI, pointing to your deployed BFF URL:

```bash
cd ui
vercel --prod
```

3. Set the environment variable in the Vercel dashboard (or via CLI):

```bash
vercel env add VITE_API_URL
# Enter: https://your-bff-domain.com/api/v1
```

4. Redeploy after setting the env var:

```bash
vercel --prod
```

Note: The BFF can be deployed to any Node.js-compatible platform (Railway, Render, Fly.io, AWS, etc.). Make sure to configure CORS to allow the Vercel domain.

---

## API Endpoints

Base URL: `http://localhost:3001`

### Health

| Method | Path      | Description        |
|--------|-----------|--------------------|
| GET    | /health   | Health check       |

### Branches

| Method | Path                  | Query Params        | Description                    |
|--------|-----------------------|---------------------|--------------------------------|
| GET    | /api/v1/branches      | state?, since?      | List all branches (filterable) |
| GET    | /api/v1/branches/:id  | -                   | Get branch by ID               |

### States

| Method | Path                  | Query Params   | Description                     |
|--------|-----------------------|----------------|---------------------------------|
| GET    | /api/v1/states        | region?        | List all states (filterable)    |
| GET    | /api/v1/states/:uf    | -              | Get state by UF code (e.g. SP)  |

### Competitors

| Method | Path                  | Query Params   | Description                        |
|--------|-----------------------|----------------|------------------------------------|
| GET    | /api/v1/competitors   | state?         | List competitors (filterable)      |

### Market

| Method | Path                              | Query Params   | Description                          |
|--------|-----------------------------------|----------------|--------------------------------------|
| GET    | /api/v1/market/potential          | region?        | Market potential scores per state    |
| GET    | /api/v1/market/demand             | region?        | Estimated demand per state           |
| GET    | /api/v1/market/expansion-zones    | region?        | States flagged as expansion zones    |
| GET    | /api/v1/market/overview           | -              | Aggregated national overview stats   |

### Example Responses

```json
// GET /api/v1/market/overview
{
  "data": {
    "totalStates": 27,
    "statesWithBranches": 8,
    "expansionZones": 13,
    "avgMarketPotential": 52,
    "totalEstimatedDemand": 1908000,
    "byRegion": [
      { "region": "Sudeste", "states": 4, "avgScore": 83, "totalDemand": 925000 },
      ...
    ]
  }
}
```

---

## Technology Stack

### BFF
- **Runtime**: Node.js 20
- **Framework**: Fastify 4
- **Language**: TypeScript 5
- **Architecture**: Domain-Driven Design (DDD) with layered architecture
  - Domain: entities + repository interfaces
  - Infrastructure: in-memory repository implementations + mock data
  - Application: use-case classes
  - Interfaces: HTTP route handlers

### UI
- **Framework**: React 18
- **Build tool**: Vite 5
- **Language**: TypeScript 5
- **Map**: Leaflet + react-leaflet (CartoDB dark tile layer)
- **Charts**: Recharts
- **HTTP client**: Axios
- **State**: React Context (LayerContext, FilterContext)

### Infrastructure
- **Containerization**: Docker (multi-stage builds)
- **Orchestration**: Docker Compose
- **Web server (production UI)**: Nginx with SPA fallback and API proxy
