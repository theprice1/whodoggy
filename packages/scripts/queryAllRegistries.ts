// scripts/queryAllRegistries.ts

// Use global fetch (Node 18+)
const microchipId = process.argv[2];
if (!microchipId) {
	console.error("❌ Please provide a microchip ID, e.g.:");
	console.error("   npx ts-node scripts/queryAllRegistries.ts 1234567890");
	process.exit(1);
}

const registryPorts = Array.from({ length: 22 }, (_, i) => 4101 + i);

async function queryRegistries(id: string) {
	for (const port of registryPorts) {
		const url = `http://127.0.0.1:${port}/search/${id}`;
		try {
			const res = await fetch(url);
			if (res.ok) {
				const data = await res.json();
				console.log(`✅ Match found in registry on port ${port}`);
				console.log(`🦴 Microchip ID: ${data.microchipId}`);
				console.log(`🐶 Name: ${data.dogName}`);
				console.log(`📛 Breed: ${data.breed}`);
				console.log(`👤 Owner: ${data.ownerName}`);
				console.log(`📞 Contact: ${data.contact}`);
				console.log(`📍 Registry: ${data.registryName}`);
				console.log(`💉 Vaccinated: ${data.vaccinated ? "Yes" : "No"}`);
				console.log(`📝 Notes: ${data.notes}`);
				console.log(`🩺 Last Checkup: ${data.lastCheckup}`);
				return; // Stop after first successful match
			}
		} catch (err: any) {
			console.log(`⚠️ Could not query port ${port}: ${err.message}`);
		}
	}

	console.log(`❌ No registry found for microchip ID: ${id}`);
}

queryRegistries(microchipId);
