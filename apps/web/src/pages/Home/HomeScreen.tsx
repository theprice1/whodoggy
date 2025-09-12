// apps/web/src/pages/Home/HomeScreen.tsx

import { Link } from "react-router-dom";
import type React from "react";

const HomeScreen: React.FC = () => {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-6">
			<h1 className="text-4xl font-bold mb-6 text-blue-600">
				Welcome to WhoDoggy?
			</h1>
			<p className="mb-8 max-w-xl text-center">
				Easily scan or search dog microchips to identify your furry friend.
			</p>
			<div className="flex gap-4">
				<Link
					to="/search"
					className="btn btn-primary"
					aria-label="Search Microchip"
				>
					Search Microchip
				</Link>
				{/* For web, QR scanning might not be supported, so disable or hide */}
				<button
					className="btn btn-secondary opacity-50 cursor-not-allowed"
					disabled
					aria-label="Scan Microchip (Mobile Only)"
					title="Scan Microchip feature available on mobile app only"
					type="button"
				>
					Scan Microchip (Mobile Only)
				</button>
			</div>
		</main>
	);
};

export default HomeScreen;
