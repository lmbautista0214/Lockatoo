const API_URL = import.meta.env.VITE_API_URL;

export const getCurrentUser = async () => {
  const res = await fetch(`${API_URL}/api/user/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch user");

  return await res.json();
};
