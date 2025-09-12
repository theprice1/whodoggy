import { prisma } from "./prismaClient.js";

async function main() {
	console.log("Seeding UK/Northern Ireland microchip registries...");

	// Real UK/Northern Ireland DEFRA-approved microchip databases
	const registriesData = [
		{
			name: "AnimalData",
			country: "UK",
			contact: "info@animaldata.org.uk",
		},
		{
			name: "Animal Microchips",
			country: "UK",
			contact: "support@animalmicrochips.co.uk",
		},
		{
			name: "Animal Tracker",
			country: "UK",
			contact: "contact@animaltracker.co.uk",
		},
		{
			name: "Chipworks",
			country: "UK",
			contact: "info@chipworks.co.uk",
		},
		{
			name: "HomeAgain",
			country: "UK",
			contact: "support@homeagain.co.uk",
		},
		{
			name: "Identibase",
			country: "UK",
			contact: "contact@identibase.co.uk",
		},
		{
			name: "Lost Paws",
			country: "UK",
			contact: "help@lostpaws.co.uk",
		},
		{
			name: "MicroChip Central",
			country: "UK",
			contact: "info@microchipcentral.com",
		},
		{
			name: "MicroDogID",
			country: "UK",
			contact: "contact@microdogid.org",
		},
		{
			name: "My Animal Trace",
			country: "UK",
			contact: "support@myanimaltrace.com",
		},
		{
			name: "MyPet",
			country: "UK",
			contact: "hello@mypethq.io",
		},
		{
			name: "National Veterinary Data Service",
			country: "UK",
			contact: "info@nvds.co.uk",
		},
		{
			name: "Pet Chip Register",
			country: "UK",
			contact: "contact@petchipregister.co.uk",
		},
		{
			name: "Pet Database",
			country: "UK",
			contact: "support@petdatabase.com",
		},
		{
			name: "Pet Identity UK",
			country: "UK",
			contact: "info@petidentityuk.info",
		},
		{
			name: "Petlog",
			country: "UK",
			contact: "support@petlog.org.uk",
		},
		{
			name: "PetScanner",
			country: "UK",
			contact: "contact@petscanner.com",
		},
		{
			name: "ProtectedPet",
			country: "UK",
			contact: "info@protectedpet.com",
		},
		{
			name: "SmartTrace",
			country: "UK",
			contact: "support@smarttrace.org.uk",
		},
		{
			name: "Track Your Paws",
			country: "UK",
			contact: "contact@trackyourpaws.co.uk",
		},
		{
			name: "UK PETtrac MicroChip Database",
			country: "UK",
			contact: "info@pettrac.co.uk",
		},
		{
			name: "We Trace Pets",
			country: "UK",
			contact: "support@wetracepets.com",
		},
	];

	const registries = [];
	for (const data of registriesData) {
		const registry = await prisma.registry.upsert({
			where: { name: data.name },
			update: data,
			create: data,
		});
		registries.push(registry);
	}

	console.log(`Created ${registries.length} registries`);
	console.log("Seeding dogs across UK registries...");

	// Generate diverse dog breeds for realistic data
	const breeds = [
		"Labrador Retriever",
		"Golden Retriever",
		"German Shepherd",
		"Bulldog",
		"Poodle",
		"Beagle",
		"Rottweiler",
		"Yorkshire Terrier",
		"Dachshund",
		"Boxer",
		"Siberian Husky",
		"Great Dane",
		"Chihuahua",
		"Shih Tzu",
		"Boston Terrier",
		"Border Collie",
		"Australian Shepherd",
		"Cocker Spaniel",
		"French Bulldog",
		"Jack Russell Terrier",
	];

	for (let i = 1; i <= 500; i++) {
		const selectedRegistry =
			registries[Math.floor(Math.random() * registries.length)];

		if (!selectedRegistry) {
			throw new Error("Registry not found while seeding dogs");
		}

		const selectedBreed = breeds[Math.floor(Math.random() * breeds.length)];
		const dogAge = Math.floor(Math.random() * 15) + 1;
		const isEvenNumber = i % 2 === 0;

		await prisma.dog.create({
			data: {
				microchipId: `MC-${100000 + i}`,
				name: `Dog${i}`,
				breed: selectedBreed,
				age: dogAge,
				gender: isEvenNumber ? "Male" : "Female",
				ownerName: `Owner${i}`,
				ownerEmail: `owner${i}@example.com`,
				ownerPhone: `+1000000${i.toString().padStart(4, "0")}`,
				address: `${i} Dog Street, PetCity`,
				registryId: selectedRegistry.id,
			},
		});

		// Log progress every 100 dogs
		if (i % 100 === 0) {
			console.log(`Seeded ${i} dogs...`);
		}
	}

	console.log("Seeding completed successfully!");
	console.log(
		"WhoDoggy database ready with UK/Northern Ireland microchip registries",
	);
}

main()
	.catch((error) => {
		console.error("Seeding failed:", error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
