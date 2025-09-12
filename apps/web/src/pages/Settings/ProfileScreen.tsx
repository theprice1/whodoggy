import { useEffect, useState } from "react";

type UserProfile = {
  name: string;
  email: string;
};

const ProfileScreen = () => {
  const [profile, setProfile] = useState<UserProfile>({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      // TODO: Replace with actual API call
      // Simulated fetch delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProfile({ name: "John Doe", email: "john.doe@example.com" });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // TODO: Save updated profile to backend
      console.log("Saving profile:", profile);
      alert(`Profile saved:\n${JSON.stringify(profile, null, 2)}`);
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading profile...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <label className="block mb-2 font-semibold" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        type="text"
        value={profile.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />

      <label className="block mb-2 font-semibold" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        value={profile.email}
        onChange={(e) => handleChange("email", e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-6"
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        type="button"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfileScreen;
