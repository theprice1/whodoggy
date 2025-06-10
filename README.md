
🐾 WhoDoggy?

**WhoDoggy?** is a cross-platform mobile and web app designed to scan QR codes on dog collars, retrieve identity data from multiple mock microchip databases, and provide users with vital pet information — all while respecting privacy, accessibility, and ethical design principles.

---

## 📱 Platforms

- **Mobile App**: React Native with Expo
- **Web App**: React with Tailwind CSS
- **Backend**: Node.js (Express) with TypeScript
- **Database**: PostgreSQL (mock data)
- **Auth**: Firebase Authentication

---

## 🔍 Features

- Scan dog microchip QR codes (mobile only)
- Authenticate users with Firebase
- Fetch identity data from 22 mock microchip databases
- View dog details (e.g., name, breed, contact info)
- Designed for accessibility and ethical use
- Supports legal and professional safeguards

---

## 🚀 Getting Started

### 📦 Install dependencies

```bash
# root folder
npm install
# mobile app
cd mobile && npm install
# web app
cd ../web && npm install
# backend
cd ../backend && npm install
▶️ Run the apps
bash
Always show details

Copy code
# Mobile (Expo)
cd mobile
npx expo start

# Web
cd ../web
npm run dev

# Backend
cd ../backend
npm run dev
📂 Project Structure
graphql
Always show details

Copy code
WhoDoggy/
├── mobile/             # React Native (Expo) app
├── web/                # React web app
├── backend/            # Express API server
├── shared/             # Shared types/interfaces
├── mock-databases/     # JSON files for 22 mock registries
├── legal/              # Legal and ethical documentation
├── LESP/               # Legal, Ethical, Social, and Professional planning
├── README.md           # This file
└── docs/               # Extra documentation
⚖️ LESP Commitment
WhoDoggy is built from the ground up with Legal, Ethical, Social, and Professional (LESP) principles in mind. It includes safeguards for sensitive data and features designed for accessibility (e.g., avoiding misuse for guide dogs).

📅 Project Timeline
Start: April 2025

Target Deadline: 15th September 2025

Current Milestone: Core features implemented & tested with mock data

🧑‍💻 Author
Anthony Price
BSc (Hons) Computing, Open University

📜 License
This project is for academic purposes and is not yet licensed for commercial use.
"""
