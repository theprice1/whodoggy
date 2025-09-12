import type React from "react";
import { useState } from "react";

interface SearchResult {
	name: string;
	breed: string;
	owner?: string;
	[key: string]: any;
}

const SearchScreen: React.FC = () => {
	const [chipId, setChipId] = useState("");
	const [result, setResult] = useState<SearchResult | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSearch = async () => {
		if (!chipId) {
			alert("Please enter a microchip ID");
			return;
		}

		setLoading(true);
		setResult(null);

		try {
			const response = await fetch("http://localhost:3000/api/search", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ microchipId: chipId }),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.error || `HTTP error! status: ${response.status}`,
				);
			}

			const data: SearchResult = await response.json();
			setResult(data);
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : "An unexpected error occurred";
			alert(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-4 max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-4">Search Microchip</h1>

			<input
				type="text"
				placeholder="Enter microchip ID"
				value={chipId}
				onChange={(e) => setChipId(e.target.value)}
				className="border p-2 w-full mb-4"
			/>

			<button
				type="button"
				onClick={handleSearch}
				className="bg-blue-500 text-white px-4 py-2 rounded"
				disabled={loading}
			>
				{loading ? "Searching..." : "Search"}
			</button>

			{result && (
				<div className="mt-4 p-4 border rounded bg-gray-50">
					<p>
						<strong>Name:</strong> {result.name}
					</p>
					<p>
						<strong>Breed:</strong> {result.breed}
					</p>
					{result.owner && (
						<p>
							<strong>Owner:</strong> {result.owner}
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchScreen;
