import React, { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
};

const ManageUsersScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API call to fetch users
    const fetchUsers = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
      setUsers([
        { id: "1", name: "Alice", email: "alice@example.com", role: "Admin", isActive: true },
        { id: "2", name: "Bob", email: "bob@example.com", role: "User", isActive: true },
        { id: "3", name: "Carol", email: "carol@example.com", role: "User", isActive: false },
      ]);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const toggleUserActive = (id: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user)),
    );
    // TODO: Call API to update user status
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Role</th>
              <th className="text-left py-2">Active</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name, email, role, isActive }) => (
              <tr key={id} className="border-b border-gray-200">
                <td className="py-2">{name}</td>
                <td className="py-2">{email}</td>
                <td className="py-2">{role}</td>
                <td className="py-2">{isActive ? "Yes" : "No"}</td>
                <td className="py-2">
                  <button
                    onClick={() => toggleUserActive(id)}
                    className={`px-3 py-1 rounded text-white ${
                      isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                    }`}
                    aria-label={`Toggle active status for ${name}`}
                  >
                    {isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsersScreen;
