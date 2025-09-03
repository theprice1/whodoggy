import type React from "react";
import { useState } from "...";

const _SignInScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const _handleSignIn = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Add authentication logic here
		alert(`Signing in with email: ${email}`);
	};

	return (
		<div className="max-w-md mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Sign In</h1>
			<form onSubmit={handleSignIn} className="flex flex-col">
				<label htmlFor="email" className="mb-1 font-semibold">
					Email
				</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="border border-gray-300 rounded p-2 mb-4"
					placeholder="you@example.com"
					aria-label="Email address"
				/>

				<label htmlFor="password" className="mb-1 font-semibold">
					Password
				</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="border border-gray-300 rounded p-2 mb-6"
					placeholder="Enter your password"
					aria-label="Password"
				/>

				<button
					type="submit"
					className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
					aria-label="Sign in button"
				>
					Sign In
				</button>
			</form>
		</div>
	);
};

export default SignInScreen;
