import path from "path";
import fs from "fs/promises";

const logsDir = path.resolve(__dirname, "../../logs"); // Adjust path as needed
const maxAgeMs = 7 * 24 * 60 * 60 * 1000; // 7 days

async function cleanupLogs() {
  try {
    const files = await fs.readdir(logsDir);
    const now = Date.now();

    for (const file of files) {
      const filePath = path.join(logsDir, file);
      const stats = await fs.stat(filePath);

      if (now - stats.mtimeMs > maxAgeMs) {
        await fs.unlink(filePath);
        console.log(`Deleted old log file: ${file}`);
      }
    }

    console.log("Log cleanup complete.");
  } catch (error) {
    console.error("Error during log cleanup:", error);
  }
}

cleanupLogs();
