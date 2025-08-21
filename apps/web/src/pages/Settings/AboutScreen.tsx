import React from "react";

const AboutScreen = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">About WhoDoggy?</h1>

      <p className="mb-4">
        WhoDoggy? is a mobile and web application designed to help dog owners and authorities
        quickly identify dogs via their microchip IDs by accessing multiple databases
        simultaneously.
      </p>

      <p className="mb-4">
        The app was developed as part of a university project focused on creating a secure,
        accessible, and user-friendly platform that respects privacy and data protection laws.
      </p>

      <p className="mb-4">For more information, visit our official website or contact support.</p>
    </div>
  );
};

export default AboutScreen;
