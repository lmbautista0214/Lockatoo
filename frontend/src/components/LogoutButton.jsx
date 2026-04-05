import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium
                 h-10 px-4 gap-2 rounded-2xl shadow-md text-white
                 bg-gradient-to-r from-[#FDB022] to-[#FF6B35]
                 transition-all duration-300 ease-out
                 hover:scale-105 hover:shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400
                 cursor-pointer"
    >
      {/* Animated gradient shimmer */}
      <span
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent 
                       opacity-0 hover:opacity-100 animate-shimmer"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="lucide lucide-log-out w-5 h-5 mr-1 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
      </svg>
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
};
