import { useState } from "../../../../../";

const _DatabaseSyncScreen = () => {
	const [isSyncing, setIsSyncing] = useState(false);
	const [syncStatus, setSyncStatus] = useState<string | null>(null);

	const _handleSync = async () => {
		setIsSyncing(true);
		setSyncStatus(null);
		try {
			// TODO: Replace with actual API call to sync databases
			await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
			setSyncStatus("Database sync completed successfully.");
		} catch (_error) {
			setSyncStatus("Error syncing databases. Please try again.");
		} finally {
			setIsSyncing(false);
		}
	};

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Database Sync</h1>

			<button
				onClick={handleSync}
				disabled={isSyncing}
				className={`px-4 py-2 rounded text-white ${
					isSyncing
						? "bg-gray-400 cursor-not-allowed"
						: "bg-blue-600 hover:bg-blue-700"
				}`}
				type="button"
			>
				{isSyncing ? "Syncing..." : "Start Database Sync"}
			</button>

			{syncStatus && (
				<p
					className={`mt-4 text-lg ${syncStatus.includes("Error") ? "text-red-600" : "text-green-600"}`}
				>
					{syncStatus}
				</p>
			)}
		</div>
	);
};

export default DatabaseSyncScreen;
