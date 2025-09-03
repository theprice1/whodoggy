import React from "react";
import { Link } from "...";

const _SettingsScreen = () => {
	return (
		<div className="max-w-xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Settings</h1>

			<ul className="space-y-4">
				<li>
					<Link
						to="/settings/profile"
						className="text-blue-600 hover:underline"
						aria-label="Go to Profile settings"
					>
						Profile
					</Link>
				</li>
				<li>
					<Link
						to="/settings/accessibility"
						className="text-blue-600 hover:underline"
						aria-label="Go to Accessibility options"
					>
						Accessibility Options
					</Link>
				</li>
				<li>
					<Link
						to="/settings/privacy-policy"
						className="text-blue-600 hover:underline"
						aria-label="Go to Privacy Policy"
					>
						Privacy Policy
					</Link>
				</li>
				<li>
					<Link
						to="/settings/terms-of-use"
						className="text-blue-600 hover:underline"
						aria-label="Go to Terms of Use"
					>
						Terms of Use
					</Link>
				</li>
				<li>
					<Link
						to="/settings/about"
						className="text-blue-600 hover:underline"
						aria-label="Go to About page"
					>
						About
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default SettingsScreen;
