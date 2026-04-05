const API_URL = import.meta.env.VITE_API_URL;

export const getLocations = async () => {
  const res = await fetch(`${API_URL}/api/locations`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }

  const data = await res.json();

  const locations = Array.isArray(data.data)
    ? data.data
    : Array.isArray(data)
      ? data
      : [];

  return locations.filter((loc) => loc.status === "ACTIVE");
};

export const fetchAdminStats = async () => {
  const res = await fetch(`${API_URL}/api/locations/stats`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch admin stats");
  }

  return res.json();
};
