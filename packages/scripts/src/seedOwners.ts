import { adminDb } from '@whodoggy/shared/firebase/firebaseAdmin';

const owners = [
  { id: 'A1', name: 'Alice Brown', email: 'alice@example.com' },
  { id: 'B2', name: 'Bob Green', email: 'bob@example.com' },
];

async function seedOwners() {
  const batch = adminDb.batch();
  const ownersCol = adminDb.collection('owners');
  for (const owner of owners) {
    const ref = ownersCol.doc(owner.id);
    batch.set(ref, owner);
  }
  await batch.commit();
  console.log('Seeded owners collection!');
}

seedOwners().catch(console.error);
