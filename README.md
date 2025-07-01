# 🐾 WhoDoggy?

**WhoDoggy?** is a cross-platform mobile and web app designed to scan QR codes on dog collars, retrieve identity data from multiple mock microchip databases, and provide users with vital pet information — all while respecting privacy, accessibility, and ethical design principles.

---

## 📱 Platforms

- **Mobile App**: React Native with Expo + NativeWind
- **Web App**: React with Tailwind CSS
- **Backend**: Node.js (Express) with TypeScript
- **Database**: PostgreSQL (mock data)
- **Authentication**: Firebase Authentication
- **Storage & Firestore**: Firebase (mock/test data)

---

## 🔍 Features

- Scan dog microchip QR codes (mobile only)
- Authenticate users via Firebase (shared logic across mobile + web)
- Fetch identity data from 22 mock microchip databases
- View dog details (e.g., name, breed, contact info)
- Accessibility-friendly UI and QR scanner
- LESP safeguards to avoid misuse (e.g., guide dogs)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash

git clone https://github.com/your-username/whodoggy.git
cd whodoggy

### 📦 Install Dependencies

```bash
# root folder
npm install

# mobile app
cd mobile && npm install

# web app
cd ../web && npm install

# backend
cd ../backend && npm install

🔧 Firebase Config
Ensure Firebase config is set up in the following files:

shared/firebase.ts # Universal config
apps/mobile/firebaseConfig.ts # Mobile import
apps/web/firebaseConfig.ts # Web import

WhoDoggy/
├── apps/
│   ├── mobile/             # React Native (Expo) app
│   │   ├── screens/        # Screens including Login, Scanner
│   │   ├── components/     # Reusable UI components
│   │   ├── services/       # Firebase, API, QR logic
│   │   ├── hooks/          # Custom React hooks
│   │   └── contexts/       # Global state (e.g., AuthContext)
│   ├── web/                # React web app
│   │   ├── src/components/ # Login + shared UI
│   │   ├── src/pages/      # Route-based views
│   │   ├── src/hooks/      # Custom hooks
│   │   ├── src/contexts/   # Context providers
│   │   ├── src/types/      # TypeScript interfaces
│   │   └── src/config/     # Firebase, API config
│   └── backend/            # Express API server
│       ├── controllers/    # Route logic
│       ├── routes/         # API endpoints
│       ├── middleware/     # Auth, error handling
│       ├── mock-apis/      # Simulated registries
│       ├── jobs/           # Background tasks
│       └── tests/          # Unit/integration tests
├── packages/
│   ├── ui/                 # Shared UI components
│   ├── utils/              # Shared utility functions
│   └── api-client/         # Shared API logic
├── shared/                 # Firebase config, types/interfaces
├── scripts/                # Mock data generators + upload tools
├── mock-databases/         # JSON files for 22 mock registries
├── legal/                  # Legal and ethical documentation
├── LESP/                   # Legal, Ethical, Social, and Professional planning
├── docs/                   # Extra documentation
└── README.md               # This file

🧰 Tooling
Monorepo: Managed manually or with Turborepo
TypeScript: Across all apps and packages
Firebase: Auth, analytics, and hosting
Tailwind CSS: Web styling
NativeWind: Mobile styling
PostgreSQL: Backend database
Prisma: ORM for backend

# WhoDoggy Backend

Backend server for WhoDoggy, built with Node.js and Express, provides API endpoints for searching and deleting pet data by microchip IDs.
---

## 📘 Environment Configuration

Environment variables manage sensitive info like database credentials and API keys. Use the dotenv package.

### 🔧 Setting Up Environment Variables

cp .env.example .env

🧪 Testing
Each app/package can include its own test suite:
npm run test

⚖️ LESP Commitment
WhoDoggy is built with Legal, Ethical, Social, and Professional (LESP) principles:

Use of mock data for ethical safeguards

Accessibility-first design (avoiding misuse like scanning guide dogs)

Clear ownership and consent practices for data

Strict use of mock data (for academic and ethical safeguards)

## Documentation & Policies

- [Accessibility](./docs/ACCESSIBILITY.md)
- [Privacy Policy](./docs/privacy-policy.md)
- [LESP](./docs/LESP.md)
- [Code of Conduct](./docs/CODE_OF_CONDUCT.md)
- [Data Deletion Policy](./docs/data-deletion-policy.md)
- [Terms of Use](./legal/TERMS_OF_USE.md)


## Related Documents

- [Privacy Policy](./privacy-policy.md)
- [Data Deletion Policy](./data-deletion-policy.md)
- [LESP Principles](./LESP.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)


📅 Project Timeline
Start: April 2025

Target Deadline: 15th September 2025

🧑‍💻 Author
Anthony Price
BSc (Hons) Computing
The Open University

📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

