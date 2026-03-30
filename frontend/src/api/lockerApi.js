const API_URL = "http://localhost:5000";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getLockers = async (storeId) => {
  const res = await fetch(`${API_URL}/api/lockers/view/${storeId}`, {
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
