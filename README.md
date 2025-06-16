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

shared/firebase.ts         # Universal config
mobile/firebaseConfig.ts   # Mobile import
web/firebaseConfig.ts      # Web import

WhoDoggy/
├── mobile/             # React Native (Expo) app
│   └── screens/        # Screens incl. Login
├── web/                # React web app
│   └── src/components/ # Login + future UI
├── backend/            # Express API server
├── shared/             # Shared Firebase + types/interfaces
├── scripts/            # Mock data generators + upload tools
├── mock-databases/     # JSON files for 22 mock registries
├── legal/              # Legal and ethical documentation
├── LESP/               # Legal, Ethical, Social, and Professional planning
├── docs/               # Extra documentation
└── README.md           # This file

⚖️ LESP Commitment
WhoDoggy is built from the ground up with Legal, Ethical, Social, and Professional (LESP) principles in mind. It includes:

Strict use of mock data (for academic and ethical safeguards)

Accessibility-first design (e.g., avoiding misuse for guide dogs)

Clear ownership and consent practices for data handling

📅 Project Timeline
Start: April 2025

Target Deadline: 15th September 2025

Current Milestone: Core features implemented & tested with mock data

🧑‍💻 Author
Anthony Price
BSc (Hons) Computing
The Open University

📜 License
This project is developed for academic purposes only and is not licensed for commercial deployment or use.

## 📝 Commit History

- Firebase setup: Shared config, web + mobile login screens, and updated README  
- Add project report sections 3.4 to 6 including SDLC review, solution description, and reflection  
- Remove file tree generation scripts and reset README.md  
