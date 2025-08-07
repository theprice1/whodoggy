# API Specifications for WhoDoggy

This folder holds API contract definitions and specifications.

## Key Files

- `registry-api.yaml` — OpenAPI 3.0 specification defining endpoints for querying microchip registries.

## Usage and Maintenance

- The OpenAPI spec is the source of truth for API design.
- It is used to generate mock APIs, client SDKs, and automated tests.
- Keep this file in sync with backend implementations to avoid mismatches.
- The OpenAPI toolchain in `tools/openapi/` relies on this spec.

---
