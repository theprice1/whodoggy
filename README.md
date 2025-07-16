# 🐾 WhoDoggy?

**WhoDoggy?** is a cross-platform mobile and web application designed to scan QR codes on dog collars, retrieve identity data from multiple simulated microchip databases, and provide users with essential pet details — all while respecting privacy, accessibility, and ethical design principles.

---

## 📱 Platforms & Technologies

- **Mobile App**: React Native with Expo + NativeWind
- **Web App**: React with Tailwind CSS
- **Backend**: Node.js (Express) with TypeScript
- **Database**: PostgreSQL (mock data via Prisma ORM)
- **Authentication**: Firebase Authentication
- **Storage & Firestore**: Firebase (for mock/test data)

---

## 🔍 Key Features

- Scan dog microchip QR codes (mobile only)
- User authentication via Firebase (shared across web & mobile)
- Query identity data from 22 mock microchip registries
- View dog info (name, breed, owner contact details)
- Accessibility-first UI and ethical safeguards (e.g. guide dogs)
- TM470-aligned LESP documentation and design

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/whodoggy.git
cd whodoggy
2. Install dependencies (pnpm recommended)
bash
Copy code
pnpm install
You may also install dependencies individually for:

bash
Copy code
cd apps/mobile && pnpm install
cd ../web && pnpm install
cd ../../packages/backend && pnpm install
🔧 Firebase Configuration
Ensure your Firebase credentials are configured:

bash
Copy code
cp .env.example .env
Firebase setup files:

shared/firebase.ts — Shared client config

apps/mobile/firebaseConfig.ts — Mobile Firebase config

apps/web/firebaseConfig.ts — Web Firebase config

🧩 Monorepo Structure
graphql
Copy code
WhoDoggy/
├── apps/
│   ├── mobile/             # React Native app (QR scanning, UI)
│   └── web/                # React web dashboard
├── packages/
│   ├── backend/            # Express API server (PostgreSQL + Prisma)
│   └── shared/             # Shared types, constants, and Firebase config
├── scripts/                # Mock data generation and sync tools
│   ├── seed/               # Seed PostgreSQL data
│   └── test/               # Test scripts (e.g. Firebase upload)
├── tools/
│   └── openapi/            # OpenAPI code generation (if used)
├── docs/                   # TM470 documentation (planning, specs)
│   └── specs/              # Wireframes, OpenAPI specs
├── legal/                  # Legal and ethical documents
├── LESP/                   # Legal, Ethical, Social & Professional planning
└── README.md               # This file
🧪 Testing
Each app or package can run tests individually:

bash
Copy code
pnpm run test
⚖️ LESP Commitment
WhoDoggy is designed with strong Legal, Ethical, Social, and Professional principles:

Uses mock data only for ethical safeguards and compliance

Prioritizes accessibility, e.g., preventing misuse like scanning guide dogs

Documents clear ownership and consent boundaries

Includes privacy and deletion policies in docs/ and legal/

📘 Documentation
Full technical and ethical documentation available in the docs/ and legal/ folders:

Accessibility Design

LESP Principles

Privacy Policy

Code of Conduct

Data Deletion Policy

Terms of Use

🗂 Related Documents
Also included:

TM470 Planning Timeline (docs/planning.md)

Technical Architecture Diagrams (docs/specs/)

Mock Microchip Registry APIs (scripts/seed/, packages/backend/services/)

🧑‍💻 Author
Anthony Price
BSc (Hons) Computing
The Open University (TM470 Project)

📅 Project Timeline
Start: April 2025

Deadline: 15th September 2025

📜 License
This project is licensed under the MIT License.
See LICENSE for details.

yaml
Copy code

---

### ✅ Summary of Improvements

| Area | Update |
|------|--------|
| ✅ Heading consistency | Normalized section headers |
| ✅ Code blocks | Fixed formatting for shell commands |
| ✅ Folder structure | Updated based on your actual layout |
| ✅ Firebase clarity | Listed files to configure |
| ✅ Repeated links | Removed duplicate “Related Documents” section |
| ✅ Academic alignment | Ensured phrasing fits TM470 expectations |
| ✅ Author | Identified you as the author for TM470 recognition |

---

Would you like me to:

- Save this content as a new file for you?
- Generate README templates for each subfolder now using the same tone?
- Review your `docs/` content or LESP write-up next?

Let me know what you'd like to do from here.
```
