<!-- markdownlint-disable MD024 -->

# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [2025-06-06] - Initial Project Setup

### Added

- Created monorepo structure with separate apps for backend, mobile, and web.
- Set up base folder structure and development environment.
- Added mock microchip database API templates to simulate external services.
- Integrated Firebase Admin SDK for authentication and database operations.
- Established PostgreSQL connection configuration.
- Added Legal, Ethical, Social, and Professional (LESP) documentation.
- Created initial `.env.example` template for environment variables.

## [2025-07-01] - Backend Development

### Added

- Implemented Express.js backend server with health check endpoint.
- Added JWT authentication support and environment variable management.
- Added mock API endpoints for microchip data retrieval.

### Fixed

- Updated `.gitignore` to exclude `.env.example` from being ignored.

## [2025-07-10] - Frontend Enhancements

### Added

- Developed mobile app with QR code scanning functionality using React Native and Expo.
- Built web app with search functionality using React, Vite, and Tailwind CSS.
- Integrated API client package for communication with backend services.

### Changed

- Improved API endpoint handling and error management.

## Related Documents

- [Privacy Policy](./privacy-policy.md)
- [Data Deletion Policy](./data-deletion-policy.md)
- [LESP Principles](./LESP.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
