import { db } from "...";
import { collection, getDocs } from "...";

export async function fetchMockDogs() {
	const _snapshot = await getDocs(collection(db, "dogs"));
	return snapshot.docs.map((doc) => doc.data());
}
