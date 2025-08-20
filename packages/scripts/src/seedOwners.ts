import { adminDb } from './firebaseAdmin';

const owners = [
  { id: 'OWN001', name: 'Alice Smith', email: 'alice@example.com' },
  { id: 'OWN002', name: 'Bob Johnson', email: 'bob@example.com' },
  { id: 'OWN003', name: 'Carol Lee', email: 'carol@example.com' },
  // Add more mock owners here
];

async function seedOwners() {
  const batch = adminDb.batch();
  const ownersCol = adminDb.collection('owners');

  for (const owner of owners) {
    const ref = ownersCol.doc(owner.id);
    batch.set(ref, owner);
  }

  await batch.commit();
  console.log('Seeded Firebase owners successfully!');
}

seedOwners().catch(console.error);
