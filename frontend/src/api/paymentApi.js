const API_URL = import.meta.env.VITE_API_URL;

export const getDashboardStatsPayment = async () => {
  const res = await fetch(`${API_URL}/api/payment/dashboard`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return await res.json();
};