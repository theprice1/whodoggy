// Update the import path if the module is local and not published
import { adminDb } from "@whodoggy/shared";

const dogs = [
  { id: "001", name: "Rex", breed: "Labrador", microchipId: "123ABC" },
  { id: "002", name: "Bella", breed: "Collie", microchipId: "456DEF" },
];

export async function seedDogs() {
  const batch = adminDb.batch();
  const dogsCol = adminDb.collection("dogs");
  for (const dog of dogs) {
    const ref = dogsCol.doc(dog.id);
    batch.set(ref, dog);
  }
  await batch.commit();
  console.log("Seeded dogs collection!");
}

seedDogs().catch(console.error);
