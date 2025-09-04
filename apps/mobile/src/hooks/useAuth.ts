import {
	auth,
	onAuthStateChanged,
	type User,
	useEffect,
	useState,
} from "../../../../"; // adjust path as needed

export function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const _unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return { user, loading };
}
