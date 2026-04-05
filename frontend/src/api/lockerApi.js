import { getLocations } from "./locationApi";

const API_URL = import.meta.env.VITE_API_URL

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getLockers = async (locationId) => {
  const res = await fetch(`${API_URL}/api/lockers/view/${locationId}`, {
    headers: getHeaders(),
  });
  return res.json();
};

export const createLockersApi = async (payload) => {
  const res = await fetch(`${API_URL}/api/lockers/add`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const updateLockerStatusApi = async (id, status) => {
  const res = await fetch(`${API_URL}/api/lockers/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  return res.json();
};

export const deleteLockerApi = async (id) => {
  const res = await fetch(`${API_URL}/api/lockers/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.json();
};

export const getLockerSizesByLocation = async (locationId) => {
  if (!locationId) return [];

  const res = await fetch(
    `${API_URL}/api/lockers/location/${locationId}/sizes`,
    {
      credentials: "include", 
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch locker sizes");
  }

  return res.json();
};

export const fetchAvailableLockersCount = async () => {
  try {
    const locations = await getLocations(); 

    let totalAvailable = 0;

    for (const loc of locations) {
      const data = await getLockers(loc._id);

      const lockers = data.lockers || data || [];

      const available = lockers.filter(
        (l) => l.status === "available"
      ).length;

      totalAvailable += available;
    }

    return totalAvailable;
  } catch (err) {
    console.error("Error fetching available lockers:", err);
    return 0;
  }
};

export const getLockerStatusStats = async () => {
  const res = await fetch(`${API_URL}/api/lockers/status-stats`, {
    credentials: "include",
  });

  return await res.json();
};