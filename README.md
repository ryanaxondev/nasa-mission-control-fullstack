# 🚀 NASA Mission Control — Full-Stack Dashboard

### by ryanaxondev | Axon Architecture 🧠⚡

A full-stack, sci-fi inspired **mission control system** built with **React + Node.js + Express**, designed with **clean architecture principles**, modular structure, and production-grade patterns.

> ⚠️ Educational project — Not affiliated with NASA, SpaceX, or any space agency.

---

## 🌌 Project Vision

This project simulates a futuristic **space mission control center** that allows users to:

- Schedule interplanetary launches
- Explore habitable exoplanets
- Track upcoming missions
- View historical launch data

The system is designed using **modern full-stack engineering practices**, focusing on:

- Clean architecture
- Separation of concerns
- Predictable data flow
- Scalable structure
- Maintainable codebase

---

## 🧠 Axon Architecture Philosophy

This repository follows **Axon Architecture**, a personal engineering philosophy built around:

- Mental clarity in code structure
- Logical layering
- Explicit data contracts
- Predictable side effects
- Production-grade development discipline

Core principles:

- UI ≠ Business Logic
- Backend ≠ Data Dump
- Contracts > Assumptions
- Predictability > Cleverness

---

## 🏗️ Repository Structure

```
root
├── client → React frontend (Mission Control UI)
├── server → Node.js + Express backend (Mission API)
└── README.md
```

---

## 🖥️ Frontend — Mission Control Dashboard

📘 Detailed Frontend Documentation → [client/README.md](client/README.md)

**Tech Stack**

- Node.js
- Express
- RESTful API design
- CSV planetary data processing
- Modular MVC-inspired structure
- Jest (Integration Testing)
- Supertest (HTTP request simulation)

**Key Features**

- 🚀 Mission scheduling system
- 🪐 Dynamic planet selector
- 📅 Upcoming launches management
- 📜 Launch history visualization
- 🎨 Sci-Fi themed animated UI
- 🔊 Interactive sound effects
- ⚡ Optimized rendering via hooks

**Architecture Highlights**

- Custom Hooks:
  - `usePlanets`
  - `useLaunches`

- Dedicated API Layer:
  - `requests.js`

- Strong separation between:
  - UI components
  - business logic
  - data access

---

## 🌐 Backend — Mission API Server

**Tech Stack**

- Node.js
- Express
- RESTful API design
- CSV planetary data processing
- Modular MVC-inspired structure

**Core Responsibilities**

- 🪐 Process and serve habitable exoplanet data
- 🚀 Manage mission scheduling
- 📡 Provide structured REST API
- 🔐 Validate mission inputs
- 🧠 Maintain predictable data flow

**Main API Endpoints**

### 🪐 Get Planets

```
GET /v1/planets
```

### 🚀 Get Launches

```
GET /v1/launches
```

### 🚀 Submit Launch

```
POST /v1/launches
```

```json
{
  "mission": "Mission Name",
  "rocket": "Rocket Name",
  "target": "Planet Name",
  "launchDate": "ISO Date"
}
```

### ❌ Abort Launch (Soft Delete)

Performs a **soft abort** operation:

- Does not remove launch from storage
- Marks launch as:
  - `upcoming: false`
  - `success: false`
- Returns:
  - `200` on successful abort
  - `404` if launch does not exist

Designed to preserve historical mission data integrity.

---

## 🧪 Backend Testing Strategy

The backend uses **integration testing** to validate full request lifecycles.

### Testing Stack

- Jest
- Supertest

### Testing Principles

- Tests import `app.js` (not `server.js`)
- No real port binding during tests
- Full request pipeline is validated:
  - Middleware
  - Router
  - Controller
  - Model logic
- API contracts are enforced through response validation
- Date normalization is tested using timestamp comparison

### Current Coverage

- GET /v1/planets
- GET /v1/launches
- POST /v1/launches
- DELETE /v1/launches/:id (soft abort logic)
- 404 handling for non-existing launches

All integration tests passing.

---

## 🔁 Data Flow Architecture

```
CSV Dataset → Backend Model → REST API → React Hooks → UI Components
```

This ensures:

- Single source of truth
- Predictable data flow
- Easy debugging
- Future scalability

---

## 🧠 Engineering Highlights

- API contract synchronization
- Backend data normalization
- UI state isolation using hooks
- Safe async request handling
- Component-level memoization
- Clear architecture layering

---

## 🧩 Development Workflow

This project follows a strict feature-complete workflow:

1. Implement feature fully
2. Validate behavior manually
3. Write integration tests
4. Ensure all tests pass
5. Commit as a complete logical unit with detailed commit body

No partial feature commits.
Each commit represents a stable architectural milestone.

## ⚙️ Running the Project Locally

### 1️⃣ Install Dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

---

### 2️⃣ Environment Configuration

Create `.env` file:

#### client/.env

```
REACT_APP_API_URL=http://localhost:8000/v1
```

#### server/.env

```
PORT=8000
```

---

### 3️⃣ Start Backend

```bash
cd server
npm run watch
```

Server runs at:

```
http://localhost:8000
```

---

### 4️⃣ Start Frontend

```bash
cd client
npm start
```

App runs at:

```
http://localhost:3000
```

---

### 🧪 Run All Tests From Root

```bash
npm test
```

---

## 🧪 Learning & Educational Goals

This project demonstrates:

- Full-stack architecture design
- Real-world API contracts
- Advanced React hooks usage
- Backend data processing pipelines
- Clean project structuring
- Production-ready patterns

---

## 🔮 Future Roadmap

### Architecture Enhancements

- TypeScript migration
- Shared API contract schema
- OpenAPI (Swagger) integration
- Runtime validation layers

### System Features

- Authentication & user roles
- Mission approval workflows
- Real-time updates (WebSockets)
- Analytics dashboard
- Mission telemetry visualization

---

## 👨‍🚀 Author

**Ryan Axon**
GitHub: [https://github.com/ryanaxondev](https://github.com/ryanaxondev)

**Axon Architecture — Engineering with Clarity & Power**

---

## 📄 License

Educational use only
Not intended for commercial or aerospace deployment
