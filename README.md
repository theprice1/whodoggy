# WhoDoggy Monorepo

Welcome to the WhoDoggy project — a comprehensive microchip scanning and identification platform for dogs.

## Overview

This monorepo contains all codebases, tools, documentation, and configurations for the WhoDoggy app ecosystem, including:

- **apps/mobile** — React Native mobile app with QR scanning capabilities.
- **apps/web** — React web app.
- **packages/backend** — Node.js backend API with PostgreSQL and Firebase integration.
- **packages/shared** — Shared utilities and TypeScript types.
- **packages/api-client** — TypeScript API client generated from OpenAPI specs.
- **packages/scripts** — Utility scripts used in build and deployment.
- **tools** — Developer tooling such as OpenAPI code generators.
- **docs** — Documentation including architecture, policies, and API specs.

## Tooling

- Package manager: pnpm workspaces
- Language: TypeScript (ESM)
- Linters: Biome (primary), ESLint (React Native only)
- Testing: Vitest and Supertest
- CI/CD: Expo Application Services (EAS) for mobile builds

## Getting Started

See individual package READMEs for detailed setup instructions.

## Contributing

Please review the `docs/code-of-conduct.md` and `CONTRIBUTING.md` before contributing.

---
