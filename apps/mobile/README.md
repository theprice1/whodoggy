# 📱 WhoDoggy Mobile App

The mobile version of WhoDoggy is built using **React Native with Expo**. It allows users to scan QR codes on dog collars and retrieve microchip-linked identity data.

## Features

- QR scanning (camera-based)
- Firebase Authentication
- Accessibility-focused design
- Mock data lookup via backend API

## Technologies

- React Native + Expo
- NativeWind (Tailwind for React Native)
- React Navigation
- Firebase Auth

## Running the App

````bash
cd apps/mobile
pnpm install
pnpm start
Structure
screens/ – App screens (e.g. Login, Scanner, Result)

components/ – Shared UI elements

services/ – API and Firebase logic

hooks/ – Custom logic

contexts/ – Global state (e.g., AuthContext)

yaml
Copy code

---

## ✅ 3. `apps/web/README.md`

```md
# 💻 WhoDoggy Web App

The web app is a **React + Tailwind CSS** frontend that allows manual searching of microchip records, suitable for desktop environments.

## Features

- Firebase authentication
- Manual microchip search
- Responsive and accessible design

## Technologies

- React
- Tailwind CSS
- React Router
- Firebase Auth

## Running the App

```bash
cd apps/web
pnpm install
pnpm dev
Structure
src/pages/ – Route-based views

src/components/ – UI components

src/hooks/ – Custom hooks

src/contexts/ – Auth context and global state

src/config/ – Firebase, API setup

yaml
Copy code

---

## ✅ 4. `packages/backend/README.md`

```md
# 🔧 WhoDoggy Backend API

This is the backend for WhoDoggy, built with **Node.js + Express + TypeScript**. It exposes a REST API to serve mock dog and registry data stored in a PostgreSQL database.

## Features

- Microchip lookup endpoint (`/api/search`)
- Optional CRUD for mock dog data (`/api/dogs`, etc.)
- Connects to PostgreSQL using Prisma ORM
- Validates input and handles errors
- Auth integration with Firebase Admin

## Running Locally

```bash
cd packages/backend
pnpm install
pnpm dev
Structure
routes/ – API route files

controllers/ – Logic per endpoint

services/ – Prisma and database calls

middleware/ – Input validation, auth

mock-apis/ – Simulated 22 registries

tests/ – Test cases and tools

yaml
Copy code

---

## ✅ 5. `packages/shared/README.md`

```md
# 📦 Shared Package

This workspace contains shared TypeScript resources used across WhoDoggy apps.

## Contents

- `types/` – Core TypeScript types:
  - `Dog`, `Owner`, `Registry`, `Microchip`
- `constants/` – Enum values, registry names, validation patterns
- `firebase.ts` – Centralised Firebase config (used by web/mobile)

Shared code is auto-imported via TypeScript project references in each app

````
