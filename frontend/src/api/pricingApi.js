const API_URL = import.meta.env.VITE_API_URL;

const listPricingByLocation = async (locationId) => {
  if (!locationId) return []; 

  const res = await fetch(
    `${API_URL}/api/admin/pricing/location/${locationId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pricing");
  }

  return res.json();
};

const createPricing = async (data) => {
  console.log("Sending pricing:", data);

  const res = await fetch(`${API_URL}/api/admin/pricing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    console.error("Backend error:", responseData);
    throw new Error(responseData.error || "Failed to create pricing");
  }

  return responseData;
};

const updatePricing = async (id, data) => {
    const res = await fetch(`${API_URL}/api/admin/pricing/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Failed to update pricing");
    }

    return res.json();
};

const deletePricing = async (id) => {
    const res = await fetch(`${API_URL}/api/admin/pricing/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) {
        throw new Error("Failed to delete pricing");
    }

    return res.json();
};

const readPricing = async (id) => {
    const res = await fetch(`${API_URL}/api/admin/pricing/${id}`);

    if (!res.ok) {
        throw new Error("Failed to retrieve pricing");
    }

    return res.json();
};

export {
    listPricingByLocation,
    createPricing,
    updatePricing,
    deletePricing,
    readPricing
};
