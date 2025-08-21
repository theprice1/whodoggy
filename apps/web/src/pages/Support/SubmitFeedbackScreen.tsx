import type React from "react";
import { useState } from "react";

const SubmitFeedbackScreen = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can replace this with an API call to submit feedback
    console.log("Feedback submitted:", { email, feedback });
    setSubmitted(true);
    setFeedback("");
    setEmail("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Submit Feedback</h1>

      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg">
          Thank you for your feedback! We appreciate your input.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Your Email (optional)
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-md p-2"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="feedback" className="block font-medium mb-1">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              className="w-full border rounded-md p-2 min-h-[120px]"
              placeholder="Tell us what you think..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
           type="button">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default SubmitFeedbackScreen;

