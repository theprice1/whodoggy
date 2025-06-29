import React from 'react';
export default function DeveloperDocs() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Project File Structure</h1>
      <p>This app follows a monorepo structure:</p>
      <pre className="text-sm bg-gray-100 p-2 mt-2 rounded">
        {`
- backend/
  - controllers/
  - routes/
  - mockDatabases/
- mobile/
  - app/screens/
  - components/
- web/
  - src/pages/
  - src/components/
- shared/
  - types.ts
        `}
      </pre>
    </div>
  );
}
// This page provides an overview of the project file structure for developers.
// It is designed to help new developers understand where to find different parts of the codebase.