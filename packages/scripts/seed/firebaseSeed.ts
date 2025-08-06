import { adminDb } from '@whodoggy/shared/firebase/firebaseAdmin';

const dogs = [
  { id: '123ABC', name: 'Rex', breed: 'Labrador', ... },
  ...
];

async function seed() {
  const batch = adminDb.batch();
  const dogsCol = adminDb.collection('dogs');
  for (const dog of dogs) {
    const ref = dogsCol.doc(dog.id);
    batch.set(ref, dog);
  }
  await batch.commit();
  console.log('Seeded Firebase dogs!');
}

seed().catch(console.error);
