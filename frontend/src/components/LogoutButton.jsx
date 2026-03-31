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
      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all
                 disabled:pointer-events-none disabled:opacity-50
                 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                 hover:bg-primary/90 h-8 gap-1.5 px-3 has-[>svg]:px-2.5
                 bg-gradient-to-r from-[#FDB022] to-[#FF6B35]
                 hover:from-[#FF6B35] hover:to-[#FDB022]
                 text-white rounded-2xl shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="lucide lucide-log-out w-4 h-4 mr-2"
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
