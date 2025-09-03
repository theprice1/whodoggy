// packages/api-client/src/index.ts
// Temporarily comment out the shared import to fix the build
// import { type Dog, type Owner, type Registry } from '@whodoggy/shared';

// Export API client functions with .js extensions for ES modules
export * from "./dogs.js";
export * from "./owners.js";
export * from "./registries.js";

// You can add type definitions locally for now
export interface Dog {
	id: string;
	name: string;
	breed: string;
	ownerId: string;
}

export interface Owner {
	id: string;
	name: string;
	email: string;
}

export interface Registry {
	id: string;
	name: string;
	url: string;
}
