# 🛠️ WhoDoggy? Scripts

This folder contains automation and utility scripts used during development and testing of the WhoDoggy? project. These scripts help generate mock data, upload it to Firestore, and optionally deploy backend services.

---

## 📜 Scripts Overview

| Script                 | Description                                                    | Example Usage                                    |
| ---------------------- | -------------------------------------------------------------- | ------------------------------------------------ |
| `generateMockData.ts`  | Generates realistic mock dog and owner data for testing.       | `ts-node generateMockData.ts --count 100`        |
| `uploadToFirestore.ts` | Uploads generated mock JSON files to Firebase Firestore.       | `ts-node uploadToFirestore.ts --collection dogs` |
| `deploy.sh`            | Bash script to deploy backend and services (Linux/macOS only). | `./deploy.sh`                                    |

---

## ⚙️ Prerequisites

- Node.js (v18+ recommended)
- [ts-node](https://typestrong.org/ts-node/) installed globally or via dev dependencies
- Firebase CLI (`npm install -g firebase-tools`)
- Correct `.env` configuration

---

## 🔐 Environment Variables

These scripts rely on environment variables. Create a local `.env` file by copying the example:

```bash
cp .env.example .env
Required variables:

FIREBASE_SERVICE_ACCOUNT_PATH – Path to your Firebase service account JSON file

POSTGRES_URI – PostgreSQL connection string

Any other keys needed for backend access or authentication

🧪 Usage
✅ Generating Mock Data
bash
Copy code
ts-node generateMockData.ts --count 500
Options:

--count – Number of mock records to generate (default: 100)

☁️ Uploading Data to Firestore
bash
Copy code
ts-node uploadToFirestore.ts --collection dogs
Options:

--collection – Firestore collection to upload data to (e.g., dogs, owners, registries)

🚀 Deployment (Linux/macOS only)
bash
Copy code
./deploy.sh
⚠️ deploy.sh is written for bash. Windows users may need to adapt it for PowerShell or use WSL.

💡 Recommendations
Scripts use async/await with structured error handling.

Console logs provide clear progress and failure messages.

Customize parameters with CLI flags to suit testing needs.

Avoid committing .env or sensitive credentials to version control.

Add PowerShell alternatives for Windows support if needed.

Use npm run aliases (in package.json) to simplify script usage.

🔧 Adding New Scripts
When adding a new script:

Use consistent formatting (TypeScript + async/await)

Support CLI arguments using a parser like yargs

Add helpful logs for success/failure

Document it here in this README

🧯 Troubleshooting
Ensure .env is created and filled out correctly.

Check that ts-node and dependencies are installed.

Verify Firebase service account permissions if using upload scripts.

Read console logs for specific error output.

📬 Contact
For questions, support, or collaboration:

Anthony Price
BSc (Hons) Computing — The Open University
📧 support@whodoggy.com
```
