import React, { useState } from "react";

const _AccessibilityOptionsScreen = () => {
	const [highContrast, setHighContrast] = useState(false);
	const [largeText, setLargeText] = useState(false);

	// TODO: Persist accessibility preferences (e.g., localStorage, user profile)

	return (
		<div className="max-w-xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Accessibility Options</h1>

			<div className="mb-4">
				<label className="inline-flex items-center">
					<input
						type="checkbox"
						checked={highContrast}
						onChange={() => setHighContrast(!highContrast)}
						className="mr-2"
					/>
					Enable High Contrast Mode
				</label>
			</div>

			<div className="mb-4">
				<label className="inline-flex items-center">
					<input
						type="checkbox"
						checked={largeText}
						onChange={() => setLargeText(!largeText)}
						className="mr-2"
					/>
					Enable Large Text
				</label>
			</div>

			<p className="text-sm text-gray-600">
				Adjust these settings to improve readability and accessibility based on
				your preferences.
			</p>
		</div>
	);
};

export default AccessibilityOptionsScreen;
