# 🐾 WhoDoggy?

**WhoDoggy?** is a mobile and web application designed to scan QR codes linked to dog microchips and retrieve identity information from multiple (mock) databases. The app promotes responsible pet ownership while building in strong ethical, legal, and accessibility protections.

---

## 📱 Platforms

- **Mobile:** React Native (Expo)
- **Web:** React + Tailwind CSS
- **Backend:** Node.js (Express) with TypeScript
- **Database:** PostgreSQL (mocked for now)
- **Auth:** Firebase Authentication

---

## 📦 File Structure

WhoDoggy/
├── backend/ # Node/Express API
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── types/
│ ├── index.ts
├── mobile/ # React Native app (Expo)
│ ├── screens/
│ ├── components/
│ └── ...
├── web/ # React web app
│ ├── src/
│ ├── public/
│ └── ...
├── docs/ # Legal, ethical, and policy documents
│ ├── privacy-policy.md
│ ├── data-deletion-policy.md
│ ├── CODE_OF_CONDUCT.md
├── README.md # You're here!
└── .gitignore


---

## ✨ Features

- Scan QR codes (mobile only)
- Retrieve dog data from multiple mock databases
- Secure sign-in (Firebase Auth)
- View and manage personal settings
- Designed with LESP (Legal, Ethical, Social, Professional) principles in mind

---

## LESP Considerations in WhoDoggy?

The WhoDoggy? app has been designed with careful attention to Legal, Ethical, Social, and Professional (LESP) considerations, as well as Equality, Diversity, and Inclusion (EDI) principles. These elements are crucial to ensuring the app is trustworthy, inclusive, and compliant with data protection standards.

### Legal Compliance
- **Data Privacy:** All pet and microchip data in the current version use mock datasets to prevent any real personal data processing, ensuring compliance with UK GDPR and the Data Protection Act 2018 during development.
- **Future Data Sharing:** Plans include formal Data Sharing Agreements (DSAs) and Privacy Notices for live data access, alongside Data Protection Impact Assessments (DPIA) to secure lawful processing and user consent.

### Ethical Implementation
- **Data Use Limitation:** The app strictly confines data usage to pet identification and reunification purposes, prohibiting any profiling or marketing uses.
- **Bias Mitigation:** The system avoids assumptions based on breed, geography, or user profiles, ensuring neutral and fair treatment.

### Social Impact
- **Improved Animal Welfare:** By consolidating access to multiple microchip databases, the app speeds up owner reunification, reducing stress for pets and owners.
- **Trust and Transparency:** The project anticipates social concerns by incorporating transparent policies and potential external audits to reassure users and database providers.

### Professional Standards
- **Code Quality and Security:** The app adheres to professional IT ethics, focusing on secure coding practices, thorough documentation, and accountability.
- **Documentation:** LESP considerations and design choices are documented to maintain transparency for future development and audits.

### Equality, Diversity, and Inclusion (EDI)
- **Accessibility:** The UI is developed to meet WCAG 2.1 guidelines, ensuring usability for users with disabilities, including support for screen readers.
- **Language and Usability:** Simple language and a clean interface facilitate usage by non-native English speakers and users with varying literacy levels.
- **Device and Connectivity:** The app is optimized for mobile devices and performs well on slower internet connections, broadening accessibility.
- **Affordability Focus:** While educational, the app is designed to eventually be freely available or subsidized for shelters and councils to support animal welfare inclusively.


---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone git@github.com:theprice1/whodoggy.git
cd whodoggy
