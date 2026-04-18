const API_URL = import.meta.env.VITE_API_URL;

const listPricingByLocation = async (locationId) => {
  if (!locationId) return [];

  const res = await fetch(
    `${API_URL}/api/admin/pricing/location/${locationId}`,
    {
      credentials: "include",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch pricing");

  return res.json();
};

const createPricing = async (data) => {
  const res = await fetch(`${API_URL}/api/admin/pricing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Failed to create pricing");
  }

  return responseData;
};

const updatePricing = async (id, data) => {
  const res = await fetch(`${API_URL}/api/admin/pricing/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update pricing");

  return res.json();
};

const deletePricing = async (id) => {
  const res = await fetch(`${API_URL}/api/admin/pricing/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete pricing");

  return res.json();
};

const readPricing = async (id) => {
  const res = await fetch(`${API_URL}/api/admin/pricing/${id}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to retrieve pricing");

  return res.json();
};

export {
  listPricingByLocation,
  createPricing,
  updatePricing,
  deletePricing,
  readPricing,
};
