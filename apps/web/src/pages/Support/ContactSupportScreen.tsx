import React, { useState } from 'react';

const ContactSupportScreen = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can hook this into an actual API call
    setSubmitted(true);
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Support</h1>

      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-md">
          Your message has been sent. Our support team will respond soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Your Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              title="Your Email"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Subject</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Enter the subject"
              title="Subject"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded-md"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Enter your message"
              title="Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactSupportScreen;
