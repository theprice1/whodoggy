import { db, auth, analytics } from './packages/shared/firebase.ts';
import { collection, getDocs } from 'firebase/firestore';

async function testFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, 'dogs'));
    console.log('Documents in dogs collection:');
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  } catch (err) {
    console.error('Firestore read error:', err);
  }
}

testFirestore();

console.log('Current user:', auth.currentUser);

if (analytics) {
  analytics.logEvent('test_event');
}
