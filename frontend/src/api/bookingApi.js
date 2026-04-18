const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

export const fetchUserBookings = async () => {
  try {
    const res = await fetch(`${API_URL}/api/booking/view/user`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    });

    const data = await res.json();
    return data.bookings || [];
  } catch (err) {
    console.error("Fetch User Bookings Error:", err);
    return [];
  }
};

export const fetchBookingStats = async () => {
  const bookings = await fetchUserBookings();

  return {
    total: bookings.length,
    active: bookings.filter(
      (b) => b.bookingStatus === "reserved" || b.bookingStatus === "active",
    ).length,
  };
};

export const fetchActiveBookingsList = async () => {
  const bookings = await fetchUserBookings();

  return bookings.filter((b) =>
    ["reserved", "active"].includes(b.bookingStatus),
  );
};

export const getDashboardStats = async () => {
  const res = await fetch(`${API_URL}/api/booking/dashboard`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return await res.json();
};

export const getRecentBookings = async () => {
  const res = await fetch(`${API_URL}/api/booking/recent`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recent bookings");
  }

  return await res.json();
};

export const getBookingsByLocation = async () => {
  const res = await fetch(`${API_URL}/api/booking/bookings-by-location`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};
