import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LogoutButton } from "../../components/LogoutButton";

const AdminHeaderNav = () => {
  const [navOpen, setNavOpen] = useState(false);
  const headerRef = useRef(null);
  const [navTop, setNavTop] = useState(0);

  useEffect(() => {
    const headerHeight = headerRef.current?.offsetHeight || 0;
    setNavTop(headerHeight);
  }, []);

  const toggleNav = () => setNavOpen((prev) => !prev);

  const navItems = [
    { name: "Dashboard", to: "/admin/dashboard", icon: "dashboard" },
    { name: "Manage Bookings", to: "/admin/bookings", icon: "booking" },
    { name: "Manage Lockers", to: "/lockers", icon: "location-pin" },
    { name: "Manage Rates", to: "/pricing", icon: "price-tag" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-[1000] px-4 md:px-6 py-4 flex items-center justify-between
                   bg-gradient-to-r from-[#FFF8EF] to-[#FFE5D9] shadow-sm"
      >
        <a
          href="/admin/dashboard"
          className="flex items-center gap-3 transform transition hover:scale-105"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-[#ff7e5f] to-[#ffb88c] rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700"
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
          <span className="text-2xl font-bold bg-gradient-to-r from-[#ff7e5f] to-[#ff9966] bg-clip-text text-transparent">
            Admin Panel
          </span>
        </a>

        <button
          onClick={toggleNav}
          className="cursor-pointer flex flex-col justify-center items-center w-10 h-10 rounded-lg focus:outline-none"
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
      </header>

      <nav
        style={{ top: navTop }}
        className={`fixed left-0 w-full bg-gradient-to-r from-[#FFF8EF] to-[#FFE5D9] shadow-md z-[1000] transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          navOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-start gap-2 px-0 py-6 text-sm sm:text-base md:text-lg font-medium text-gray">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <NavLink
                to={item.to}
                className="w-full flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 hover:bg-[#FF6B35] hover:text-white group"
              >
                {/* FIXED ICON PATH */}
                <img
                  src={`/icons/${item.icon}-black.svg`}
                  alt={item.name}
                  className="w-5 h-5 group-hover:hidden"
                />
                <img
                  src={`/icons/${item.icon}-white.svg`}
                  alt={item.name}
                  className="w-5 h-5 hidden group-hover:block"
                />
                <span className="transition-all duration-300 group-hover:scale-110 group-hover:ml-2">
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}

          <li className="w-full px-6 mt-4">
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminHeaderNav;
