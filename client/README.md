# 🚀 NASA Mission Control Dashboard (Frontend)

A sci-fi inspired mission control dashboard built with **React** and **Arwes UI framework**.
This application allows users to schedule interplanetary launches, view upcoming missions, and explore historical launch data.

> ⚠️ This is an educational project and is not affiliated with NASA or SpaceX.

---

## 🌌 Project Overview

This frontend application provides a user interface for managing space missions.
It communicates with a backend API responsible for mission scheduling, launch tracking, and planetary data.

The UI is designed to simulate a futuristic mission control experience using sound effects, animations, and themed components.

---

## 🧩 Features

### ✅ Current Features

#### 🚀 Schedule Launch

- Submit new mission launches
- Select destination planets
- Input mission and rocket details
- Launch status animations and sound effects

---

#### 📅 Upcoming Launches

- View scheduled future missions
- Abort launches
- Real-time UI updates after mission cancellation

---

#### 📜 Launch History

- View completed or aborted missions
- Flight number tracking
- Mission outcome visualization

---

#### 🎨 Sci-Fi UI Experience

- Arwes themed components
- Sound feedback for:
  - Successful launches
  - Abort actions
  - Failures

- Animated page transitions

---

#### 🔄 Efficient State Management

- Custom React Hooks:
  - `usePlanets`
  - `useLaunches`

- Optimized rendering using:
  - `useCallback`
  - `useEffect`

---

## 🏗️ Frontend Architecture

```
Pages
├── Launch
├── Upcoming
├── History
└── App Layout

Hooks
├── usePlanets
└── useLaunches

API Layer
└── requests.js

UI Components
├── Header
├── Footer
├── Centered
└── Clickable
```

---

## ⚙️ Tech Stack

- React 17
- React Router DOM
- Arwes UI Framework
- Create React App
- Fetch API
- Custom Hooks

---

## 📡 Backend API Integration

The frontend expects a REST API with the following endpoints:

### 🪐 Get Planets

```
GET /v1/planets
```

#### Expected Response

```json
[{ "keplerName": "Kepler-442 b" }]
```

---

### 🚀 Get Launches

```
GET /v1/launches
```

Returns all launches sorted by flight number.

---

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

---

### ❌ Abort Launch

```
DELETE /v1/launches/:id
```

---

## 🧠 State Management Strategy

### usePlanets

- Fetches planetary destination data
- Loads once on application startup

### useLaunches

- Fetches launch data
- Handles submission, abortion, loading states, and sound triggers

---

## 🖥️ Running the Project

```bash
npm install
npm start
```

Runs at `http://localhost:3000`

---

## 🏗️ Production Build

```bash
npm run build
```

Build output integrates with backend static serving:

```
../server/public
```

---

## 🔮 Future Improvements

- React 18 migration
- Accessibility improvements
- Global loading state
- TypeScript migration
- Testing layers
- Real-time updates

---

## 📚 Learning Purpose

Demonstrates React architecture, hook-based state management, and API-driven UI development.

---

## 📄 License

Educational use only
