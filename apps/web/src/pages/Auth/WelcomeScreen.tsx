import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
	const navigate = (path: string) => {
		// TODO: Implement navigation
		console.log("Navigate to:", path);
	};

	const _navigate = useNavigate();

	return (
		<div className="max-w-md mx-auto p-6 text-center">
			<h1 className="text-4xl font-bold mb-6">Welcome to WhoDoggy?</h1>
			<p className="mb-8 text-lg">
				The easy way to identify your dog’s microchip and retrieve important
				information.
			</p>

			<button
				type="button"
				onClick={() => navigate("/auth/signin")}
				className="bg-blue-600 text-white py-2 px-6 rounded mr-4 hover:bg-blue-700"
				aria-label="Go to Sign In"
			>
				Sign In
			</button>

			<button
				type="button"
				onClick={() => navigate("/auth/signup")}
				className="bg-gray-200 text-gray-800 py-2 px-6 rounded hover:bg-gray-300"
				aria-label="Go to Sign Up"
			>
				Sign Up
			</button>
		</div>
	);
};

export default WelcomeScreen;
