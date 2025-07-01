
# 🏗️ WhoDoggy? Architecture Overview

This document outlines the structure and interaction of the WhoDoggy? monorepo, which includes mobile, web, and backend applications, along with shared packages and utilities.

📁 Monorepo Structure
graphql
Copy code
WhoDoggy/
├── apps/
│   ├── mobile/           # React Native app (Expo)
│   ├── web/              # React web app (Tailwind CSS)
│   └── backend/          # Node.js + Express API
├── packages/
│   ├── ui/               # Shared UI components
│   ├── utils/            # Shared utility functions
│   └── api-client/       # Shared API logic
├── shared/               # Firebase config, types/interfaces
├── scripts/              # Automation scripts
├── mock-databases/       # JSON files for 22 mock registries
├── legal/                # Legal and ethical documentation
├── LESP/                 # Legal, Ethical, Social, and Professional planning
├── docs/                 # Additional documentation
└── README.md
🧩 Folder Descriptions
apps/
Contains the three main applications:

mobile/: Built with React Native + Expo. Features QR code scanning and Firebase Authentication.

web/: Built with React + Tailwind CSS. Provides manual microchip code entry and dog info lookup.

backend/: Node.js + Express server querying mock databases and handling API requests.

packages/
Reusable code shared across the apps:

ui/: Common UI components like buttons, modals, and other design elements.

utils/: Utility functions for formatting, validation, and other helpers.

api-client/: Shared logic for API calls to the backend.

shared/
Firebase configuration files and shared TypeScript types/interfaces used across projects.

scripts/
Automation scripts for generating mock data, seeding databases, and deployment tasks.

mock-databases/
JSON files simulating 22 external dog microchip registries for development and testing.

legal/, LESP/, docs/
Documentation related to legal compliance, ethical considerations, social and professional responsibilities, and academic reporting.

🔄 Interaction Flow
Mobile and Web apps authenticate users via Firebase Authentication.

Users submit dog microchip codes from the apps to the backend API.

The backend queries the mock-databases/ (or uses caching) to find matching dog records.

Results are returned to the frontend apps and displayed to users.

🧠 Notes
The entire monorepo is written in TypeScript for consistent type safety.

Firebase Authentication is implemented consistently across mobile and web platforms.

The backend is modular and structured for easy testing, with mock APIs supporting development.
