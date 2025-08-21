import { adminDb } from "@whodoggy/shared/firebase/firebaseAdmin";

const dogs = [
  { id: "001", name: "Rex", breed: "Labrador", microchipId: "123ABC" },
  { id: "002", name: "Bella", breed: "Collie", microchipId: "456DEF" },
];

async function seedDogs() {
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
