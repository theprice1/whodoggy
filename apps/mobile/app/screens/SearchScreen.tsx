const token = ""; // TODO: Replace with actual token retrieval logic

const searchByMicrochip = async (chipId: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // if auth enabled
      },
      body: JSON.stringify({ microchipId: chipId }),
    });

    const result = await response.json();
    result(result);
  } catch (error) {
    console.error("Search failed", error);
  }
};
