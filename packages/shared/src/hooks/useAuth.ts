import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged, type User } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const _unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => _unsubscribe();
  }, []);

  return { user, loading };
}
