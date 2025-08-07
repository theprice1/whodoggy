# WhoDoggy Monorepo Structure

## Apps

- **mobile/**: React Native app with Expo for iOS/Android.
- **web/**: React web app.

## Packages

- **backend/**: Node.js backend API server.
- **shared/**: Shared utilities and types for frontend and backend.
- **api-client/**: HTTP client library for API interaction.
- **scripts/**: CLI and utility scripts.

## Tools

- Utility scripts and helpers used in builds, CI, or maintenance.

## Docs

- Documentation files related to the project.

---

### Notes

- `.env` files located in root for environment configuration.
- Uses pnpm workspace for package management.
- Linting and formatting configured via Biome.
- Expo configs in `apps/mobile`.
