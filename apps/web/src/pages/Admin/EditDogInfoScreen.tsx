import React, { useState, useEffect } from "react";

type DogInfo = {
  id: string;
  name: string;
  breed: string;
  age: number;
  microchipId: string;
};

const EditDogInfoScreen = () => {
  // Example dog info state (in real app, fetch from API)
  const [dogInfo, setDogInfo] = useState<DogInfo>({
    id: "",
    name: "",
    breed: "",
    age: 0,
    microchipId: "",
  });

  // Simulate fetching existing dog info
  useEffect(() => {
    // TODO: Replace with API call to fetch dog info by ID or selection
    const fetchDogInfo = async () => {
      // Simulated fetch delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDogInfo({
        id: "123",
        name: "Buddy",
        breed: "Labrador",
        age: 5,
        microchipId: "ABC123456",
      });
    };
    fetchDogInfo();
  }, []);

  const handleChange = (field: keyof DogInfo, value: string | number) => {
    setDogInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Send updated dogInfo to backend API
    alert(`Dog info saved:\n${JSON.stringify(dogInfo, null, 2)}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Dog Information</h1>

      <label className="block mb-2 font-semibold" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        type="text"
        value={dogInfo.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />

      <label className="block mb-2 font-semibold" htmlFor="breed">
        Breed
      </label>
      <input
        id="breed"
        type="text"
        value={dogInfo.breed}
        onChange={(e) => handleChange("breed", e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />

      <label className="block mb-2 font-semibold" htmlFor="age">
        Age
      </label>
      <input
        id="age"
        type="number"
        value={dogInfo.age}
        onChange={(e) => handleChange("age", Number(e.target.value))}
        className="w-full border border-gray-300 rounded p-2 mb-4"
        min={0}
      />

      <label className="block mb-2 font-semibold" htmlFor="microchipId">
        Microchip ID
      </label>
      <input
        id="microchipId"
        type="text"
        value={dogInfo.microchipId}
        onChange={(e) => handleChange("microchipId", e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-6"
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
       type="button">
        Save Changes
      </button>
    </div>
  );
};

export default EditDogInfoScreen;

