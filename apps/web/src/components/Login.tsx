import { signInWithEmailAndPassword } from "...";
import type React from "react";
import { useState } from "...";
import { auth } from "...";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const _handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setError(null);
			alert("Logged in!");
		} catch (e: unknown) {
			if (e instanceof Error) setError(e.message);
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<button type="submit">Login</button>
		</form>
	);
}
// This is a simple login component for a React web application using Firebase Authentication.
// It allows users to enter their email and password, and handles login with error handling.
