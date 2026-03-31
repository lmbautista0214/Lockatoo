import { NavLink } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

export const NavBar = ({ isOpen }) => {
  return (
    <nav
      className={`absolute top-16 left-0 w-full bg-white shadow-md
                  transition-[max-height] duration-500 ease-in-out overflow-hidden
                  ${isOpen ? "max-h-screen" : "max-h-0"}`}
    >
      <ul className="flex flex-col items-start gap-2 px-0 py-6 text-sm sm:text-base md:text-lg font-medium text-gray-700">
        {/* Dashboard */}
        <li className="w-full">
          <NavLink
            to="/dashboard"
            className="w-full flex items-center gap-3 px-6 py-3 rounded-none transition-colors duration-300 group hover:bg-[#FF6B35] hover:text-white"
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
  );
};
