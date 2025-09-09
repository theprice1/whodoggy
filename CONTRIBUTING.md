# Contributing to WhoDoggy

## Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Build shared packages: `pnpm run build:shared`
4. Start development: `pnpm run dev`

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting (ESLint + Prettier)
- Write tests for new features
- Update documentation as needed

## Commit Guidelines

- Use conventional commit format
- Include relevant tests
- Ensure all checks pass

## Pull Request Process

1. Create feature branch from `main`
2. Make your changes
3. Add/update tests
4. Ensure all checks pass
5. Submit pull request

## Development Commands

```bash
# Type checking
pnpm run type-check

# Testing
pnpm test

# Linting
pnpm run lint

# Building
pnpm run build
```
