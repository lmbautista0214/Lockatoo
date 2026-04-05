const API_URL = import.meta.env.VITE_API_URL;

export const getCurrentUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
    credentials: "include",
  });

  const data = await res.json();
  return data; 
};
