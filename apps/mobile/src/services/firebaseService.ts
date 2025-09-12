import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export async function fetchMockDogs() {
	const snapshot = await getDocs(collection(db, "dogs"));
	return snapshot.docs.map((doc) => doc.data());
}
