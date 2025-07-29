import React, { useEffect, useState } from 'react';

type LogEntry = {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
};

const LogsScreen = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API call to fetch logs
    const fetchLogs = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
      setLogs([
        {
          id: '1',
          timestamp: '2025-07-29T10:00:00Z',
          level: 'info',
          message: 'System started successfully.',
        },
        {
          id: '2',
          timestamp: '2025-07-29T10:15:45Z',
          level: 'warn',
          message: 'Slow response from microchip registry.',
        },
        {
          id: '3',
          timestamp: '2025-07-29T10:30:20Z',
          level: 'error',
          message: 'Failed to sync database.',
        },
      ]);
      setLoading(false);
    };

    fetchLogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">System Logs</h1>

      {loading ? (
        <p>Loading logs...</p>
      ) : logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-2">Timestamp</th>
              <th className="text-left py-2">Level</th>
              <th className="text-left py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(({ id, timestamp, level, message }) => (
              <tr key={id} className="border-b border-gray-200">
                <td className="py-2">{new Date(timestamp).toLocaleString()}</td>
                <td
                  className={`py-2 font-semibold ${
                    level === 'error'
                      ? 'text-red-600'
                      : level === 'warn'
                      ? 'text-yellow-600'
                      : 'text-green-600'
                  }`}
                >
                  {level.toUpperCase()}
                </td>
                <td className="py-2">{message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogsScreen;
