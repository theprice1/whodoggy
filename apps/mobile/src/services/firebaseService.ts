import { db } from '@whodoggy/shared/firebase/firebaseClient';
import { collection, getDocs } from 'firebase/firestore';

export async function fetchMockDogs() {
  const snapshot = await getDocs(collection(db, 'dogs'));
  return snapshot.docs.map(doc => doc.data());
}
