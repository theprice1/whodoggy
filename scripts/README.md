# WhoDoggy? Scripts

This folder contains automation and utility scripts used during development and testing of the WhoDoggy? project. These scripts help generate mock data, upload it to Firestore, and deploy the backend.

---

## Scripts Overview

| Script                  | Description                                                    | Usage Example                            |
|-------------------------|----------------------------------------------------------------|-----------------------------------------|
| `generateMockData.ts`   | Generates realistic mock dog and owner data for testing.       | `ts-node generateMockData.ts --count 100` |
| `uploadToFirestore.ts`  | Uploads generated mock data JSON files to Firebase Firestore.  | `ts-node uploadToFirestore.ts --collection dogs` |
| `deploy.sh`             | Bash script to deploy backend and other services (Linux/Mac).  | `./deploy.sh`                           |

---

## Prerequisites

- Node.js and npm installed
- `ts-node` installed globally or use via npm scripts
- Firebase CLI installed for deployment (`deploy.sh`)
- Environment variables configured (see `.env.example`)

---

## Environment Variables

These scripts require environment variables for configuration. Copy `.env.example` to `.env` and fill in the values:

- `FIREBASE_SERVICE_ACCOUNT_PATH`: Path to Firebase service account JSON file
- `POSTGRES_URI`: Connection string for PostgreSQL database (if applicable)
- Other keys as needed for API access or configuration

---

## Usage

### Generating Mock Data

```bash
ts-node generateMockData.ts --count 500
Options:

--count: Number of mock records to generate (default: 100)

Uploading Data to Firestore
bash
Copy code
ts-node uploadToFirestore.ts --collection dogs
Options:

--collection: Firestore collection to upload data to (e.g., dogs, owners)

Deployment
bash
Copy code
./deploy.sh
Note: deploy.sh is a bash script and works on Linux/macOS. Windows users may need to use WSL or adapt to PowerShell.

Recommendations & Notes
Scripts use async/await with proper error handling.

Progress and error messages are logged to the console.

Customize parameters using CLI flags to fit your testing needs.

Avoid committing .env or sensitive files to version control.

Consider adding PowerShell equivalents for Windows users.

Use npm run scripts (defined in package.json) for easier script execution.

Extending Scripts
If you want to add new scripts:

Follow existing coding standards (TypeScript, async/await).

Add descriptive logging and CLI options.

Document new scripts here with usage examples.

Troubleshooting
Ensure environment variables are set and valid.

Check that ts-node and dependencies are installed.

For Firebase-related issues, verify service account permissions.

Consult logs for detailed error messages.

Contact
For questions or help, please contact: support@whodoggy.com

Generated for WhoDoggy? Project — Anthony Price

yaml
Copy code

---

Would you like me to help create example CLI argument parsing in one of your
