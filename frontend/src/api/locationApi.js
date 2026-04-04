import { getLockers } from "./lockerApi";

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

  return locations.filter(
    (loc) => loc.status === "ACTIVE"
  );
};

export const fetchAdminDashboardData = async () => {
  try {
    const locations = await getLocations();

    const result = [];

    for (const loc of locations) {
      const data = await getLockers(loc._id);
      const lockers = data.lockers || data || [];

      result.push({
        ...loc,
        lockers,
      });
    }

    return result;
  } catch (err) {
    console.error("Admin dashboard fetch error:", err);
    return [];
  }
};