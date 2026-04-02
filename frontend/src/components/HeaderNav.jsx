import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

export const HeaderNav = () => {
  const [user, setUser] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    fetchUser();
  }, []);

  const toggleNav = () => setNavOpen((prev) => !prev);

  return (
    <>
      {/* Header */}
      <header className="px-4 md:px-6 py-4 flex items-center justify-between bg-white shadow-sm">
        {/* Left side: logo + brand */}
        <a href="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FDB022] to-[#FF6B35] rounded-2xl flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="whitespace-nowrap text-2xl font-bold bg-gradient-to-r from-[#FDB022] to-[#FF6B35] bg-clip-text text-transparent">
            Lockatoo
          </span>
        </a>

        {/* Right side: greeting + burger */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-[#FFF8EF] to-[#FFE5D9] px-4 py-2 rounded-2xl ">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              👋 {user?.name || "Guest"}
            </span>
          </div>

          {/* Hamburger / X toggle */}
          <button
            onClick={toggleNav}
            className="flex flex-col justify-center items-center w-8 h-8 md:w-10 md:h-10 rounded-lg focus:outline-none"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transform transition duration-300 ${
                navOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 my-1 transition duration-300 ${
                navOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 transform transition duration-300 ${
                navOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* NavBar */}
      <nav
        className={`absolute top-16 left-0 w-full bg-white shadow-md
                    transition-[max-height] duration-500 ease-in-out overflow-hidden
                    ${navOpen ? "max-h-screen" : "max-h-0"}`}
      >
        <ul className="flex flex-col items-start gap-2 px-0 py-6 text-sm sm:text-base md:text-lg font-medium text-gray-700">
          {/* Dashboard */}
          <li className="w-full">
            <NavLink
              to="/dashboard"
              className="w-full flex items-center gap-3 px-6 py-3 transition-colors duration-300 group hover:bg-[#FF6B35] hover:text-white"
            >
              <img
                src="/src/assets/icons/dashboard-black.svg"
                alt="Dashboard"
                className="w-5 h-5 group-hover:hidden"
              />
              <img
                src="/src/assets/icons/dashboard-white.svg"
                alt="Dashboard"
                className="w-5 h-5 hidden group-hover:block"
              />
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Find Lockers */}
          <li className="w-full">
            <NavLink
              to="/lockers"
              className="w-full flex items-center gap-3 px-6 py-3 transition-colors duration-300 group hover:bg-[#FF6B35] hover:text-white"
            >
              <img
                src="/src/assets/icons/location-pin-black.svg"
                alt="Find Lockers"
                className="w-5 h-5 group-hover:hidden"
              />
              <img
                src="/src/assets/icons/location-pin-white.svg"
                alt="Find Lockers"
                className="w-5 h-5 hidden group-hover:block"
              />
              <span>Find Lockers</span>
            </NavLink>
          </li>

          {/* My Bookings */}
          <li className="w-full">
            <NavLink
              to="/bookings"
              className="w-full flex items-center gap-3 px-6 py-3 transition-colors duration-300 group hover:bg-[#FF6B35] hover:text-white"
            >
              <img
                src="/src/assets/icons/booking-black.svg"
                alt="My Bookings"
                className="w-5 h-5 group-hover:hidden"
              />
              <img
                src="/src/assets/icons/booking-white.svg"
                alt="My Bookings"
                className="w-5 h-5 hidden group-hover:block"
              />
              <span>My Bookings</span>
            </NavLink>
          </li>

          {/* Booking History */}
          <li className="w-full">
            <NavLink
              to="/history"
              className="w-full flex items-center gap-3 px-6 py-3 transition-colors duration-300 group hover:bg-[#FF6B35] hover:text-white"
            >
              <img
                src="/src/assets/icons/history-black.svg"
                alt="Booking History"
                className="w-5 h-5 group-hover:hidden"
              />
              <img
                src="/src/assets/icons/history-white.svg"
                alt="Booking History"
                className="w-5 h-5 hidden group-hover:block"
              />
              <span>Booking History</span>
            </NavLink>
          </li>

          {/* Profile */}
          <li className="w-full">
            <NavLink
              to="/profile"
              className="w-full flex items-center gap-3 px-6 py-3 transition-colors duration-300 group hover:bg-[#FF6B35] hover:text-white"
            >
              <img
                src="/src/assets/icons/profile-black.svg"
                alt="Profile"
                className="w-5 h-5 group-hover:hidden"
              />
              <img
                src="/src/assets/icons/profile-white.svg"
                alt="Profile"
                className="w-5 h-5 hidden group-hover:block"
              />
              <span>Profile</span>
            </NavLink>
          </li>

          {/* Settings */}
          <li className="w-full">
            <NavLink
              to="/settings"
              className="w-full flex items-center gap-3 px-6 py-3 transition-colors duration-300 group hover:bg-[#FF6B35] hover:text-white"
            >
              <img
                src="/src/assets/icons/settings-black.svg"
                alt="Settings"
                className="w-5 h-5 group-hover:hidden"
              />
              <img
                src="/src/assets/icons/settings-white.svg"
                alt="Settings"
                className="w-5 h-5 hidden group-hover:block"
              />
              <span>Settings</span>
            </NavLink>
          </li>

          {/* Logout */}
          <li className="w-full px-6">
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </>
  );
};
