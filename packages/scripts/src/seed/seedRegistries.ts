// packages/scripts/src/seed/seedRegistries.ts
import { faker } from "@faker-js/faker";

// Define types locally to avoid circular dependency
interface Registry {
	id: string;
	name: string;
	url: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}

export function generateRegistries(count: number): Registry[] {
	const registries: Registry[] = [];

	const registryNames = [
		"American Kennel Club",
		"United Kennel Club",
		"Canadian Kennel Club",
		"The Kennel Club (UK)",
		"Federation Cynologique Internationale",
	];

	for (let i = 0; i < Math.min(count, registryNames.length); i++) {
		registries.push({
			id: faker.string.uuid(),
			name: registryNames[i] || `Registry ${i + 1}`,
			url: faker.internet.url(),
			description: faker.lorem.sentence(),
			createdAt: faker.date.past(),
			updatedAt: new Date(),
		});
	}

	return registries;
}
