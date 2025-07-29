import React, { useState } from 'react';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // TODO: Add sign-up logic (e.g., Firebase Auth)
    alert(`Signing up with email: ${email}`);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSignUp} className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="you@example.com"
          aria-label="Email address"
        />

        <label htmlFor="password" className="mb-1 font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter your password"
          aria-label="Password"
        />

        <label htmlFor="confirmPassword" className="mb-1 font-semibold">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 mb-6"
          placeholder="Confirm your password"
          aria-label="Confirm password"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          aria-label="Sign up button"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpScreen;
