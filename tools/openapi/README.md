# WhoDoggy OpenAPI Tooling

This folder contains scripts and configuration for generating TypeScript types from the OpenAPI spec.

## Scripts

- `generate-types.ts`: Generates `registry.d.ts` types from `registry-api.yaml`.
- `package.json`: Defines dependencies for OpenAPI tooling.
- `tsconfig.json`: TypeScript configuration for OpenAPI tools.

## Usage

Run:

```bash
pnpm --filter whodoggy-tools run start:openapi
