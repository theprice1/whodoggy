import { adminDb } from "./firebaseAdmin";

const dogs = [
  { id: "123ABC", name: "Rex", breed: "Labrador", age: 5 },
  { id: "456DEF", name: "Bella", breed: "Beagle", age: 3 },
  { id: "789GHI", name: "Charlie", breed: "Poodle", age: 4 },
  // Add more mock dog records here
];

async function seedDogs() {
  const batch = adminDb.batch();
  const dogsCol = adminDb.collection("dogs");

  for (const dog of dogs) {
    const ref = dogsCol.doc(dog.id);
    batch.set(ref, dog);
  }

  await batch.commit();
  console.log("Seeded Firebase dogs successfully!");
}

seedDogs().catch(console.error);
