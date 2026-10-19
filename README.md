# SunAngle

A small full-stack web app that looks up a city's coordinates and returns a
recommended solar panel tilt angle.

Enter a city → the backend geocodes it → the frontend displays the
recommended angle and the city's latitude/longitude.

> **Status:** learning project / work in progress. The angle calculation is a
> simplified placeholder — see [Limitations](#limitations).

## Tech stack

| Layer    | Technology                              |
| -------- | --------------------------------------- |
| Frontend | React 19, Vite                          |
| Backend  | Node.js, Express 5                      |
| Testing  | Vitest + Supertest (backend)            |
| Geocoding| [Nominatim](https://nominatim.org/) (OpenStreetMap) |

## Getting started

### Prerequisites

- Node.js 18+
- npm

### 1. Start the backend

```bash
cd backend
npm install
npm start        # runs on http://localhost:3000
```

### 2. Start the frontend

In a second terminal:

```
cd frontend
npm install
npm run dev      # runs on http://localhost:5173
```

Open the URL Vite prints. The Vite dev
server proxies `/api/*` requests to the backend, so no CORS setup is needed.

### Running tests

```
cd backend
npm test
```

## API

### `GET /api/location?city=<name>`

Geocodes a city name via Nominatim and returns its coordinates.

```
{
  "city": "Lisbon",
  "latitude": "38.7077507",
  "longitude": "-9.1365919"
}
```

Returns `404` if the city is not found. Returns `400` if `city` is missing.

### `GET /api/angle?lat=<latitude>`

Returns the recommended panel angle for a latitude.

```
{ "angle": "38.71" }
```

Returns `400` if `lat` is missing or empty.

## How it works

1. The user submits a city name in the React form.
2. The frontend calls `/api/location`, which forwards the query to the
Nominatim search API and returns the first match's coordinates.
3. The frontend then calls `/api/angle` with the returned latitude.
4. The result is rendered as a card with the angle and coordinates.

## Limitations

This project is intentionally small and the angle logic is **not** real solar
math — it returns the absolute value of the latitude. A production
implementation would account for the sun's declination and a seasonal
adjustment. Other known gaps:

- The angle endpoint does not reject non-numeric input (e.g. `lat=abc`).
- The Nominatim call has no `try/catch` around network/JSON errors.
- The frontend does not guard against out-of-order responses on rapid searches.

These are documented as-is rather than fixed, to keep the learning scope
focused.
