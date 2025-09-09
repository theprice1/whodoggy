# WhoDoggy - Microchip Registry Application

A comprehensive microchip registry application for reuniting lost pets with their owners by scanning microchips and searching across 22 different databases.

## Project Structure

```
WhoDoggy/
├── apps/
│   ├── mobile/          # React Native mobile app
│   └── web/             # React web application
├── packages/
│   ├── api-client/      # API client library
│   ├── backend/         # Express.js backend server
│   ├── scripts/         # Build and deployment scripts
│   └── shared/          # Shared types and utilities
└── tools/               # Development tools
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm package manager

### Installation
```bash
# Install dependencies
pnpm install

# Build shared packages
pnpm run build:shared

# Start development servers
pnpm run dev
```

### Development Commands

```bash
# Run all tests
pnpm test

# Type checking
pnpm run type-check

# Linting
pnpm run lint

# Build all packages
pnpm run build
```

## Features

- Microchip scanning and database lookup
- Search across 22 different pet registry databases
- Web and mobile applications
- Real-time lost pet alerts
- Owner contact management

## Technology Stack

- **Frontend**: React, React Native, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **Testing**: Vitest, Jest
- **Build**: Vite, Metro, TypeScript

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## License

See [LICENSE](LICENSE) file for details.
