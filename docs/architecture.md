# 🏗️ WhoDoggy? Architecture Overview

This document outlines the structure and interaction of the WhoDoggy? monorepo, which includes mobile, web, and backend applications, along with shared packages and utilities.

---

## 📁 Monorepo Structure

WhoDoggy/ ├── apps/ │ ├── mobile/ # React Native app (Expo) │ ├── web/ # React web app (Tailwind) │ └── backend/ # Node.js + Express API ├── packages/ │ ├── ui/ # Shared UI components │ ├── utils/ # Shared utility functions │ └── api-client/ # Shared API logic ├── shared/ # Firebase config, types/interfaces ├── scripts/ # Automation scripts ├── mock-databases/ # JSON files for 22 mock registries ├── legal/ # Legal and ethical documentation ├── LESP/ # Legal, Ethical, Social, and Professional planning ├── docs/ # Additional documentation └── README.md


## 🧩 Folder Descriptions

### `apps/`
Contains the three main applications:
- **mobile/**: Built with React Native + Expo. Includes QR scanning and Firebase Auth.
- **web/**: Built with React + Tailwind. Allows manual code entry and dog info lookup.
- **backend/**: Express server that queries mock databases and handles API requests.

### `packages/`
Reusable code shared across apps:
- **ui/**: Common UI components (e.g., buttons, modals).
- **utils/**: Utility functions (e.g., formatting, validation).
- **api-client/**: Shared logic for calling backend APIs.

### `shared/`
- Firebase configuration and shared TypeScript types/interfaces.

### `scripts/`
- Automation tools for generating mock data, seeding the database, and deploying apps.

### `mock-databases/`
- JSON files simulating 22 external dog microchip registries.

### `legal/`, `LESP/`, `docs/`
- Documentation for legal compliance, ethical design, and academic reporting.

---

## 🔄 Interaction Flow

1. **Mobile/Web** apps authenticate via Firebase.
2. They send microchip codes to the **backend**.
3. The backend queries the **mock-databases/** or caches.
4. Results are returned to the frontend for display.

---

## 🧠 Notes

- All apps use TypeScript for type safety.
- Firebase Auth is shared across mobile and web.
- The backend is modular and testable with mock APIs.