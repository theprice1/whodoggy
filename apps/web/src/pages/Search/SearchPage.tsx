// apps/web/src/pages/Search/SearchPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const SearchPage = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Search Page</h1>
    <Link to="/" className="text-blue-600 underline">Back to Home</Link>
  </div>
);

export default SearchPage;
