import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-linear-to-br from-[#df905f] to-[#ff4501]  text-white text-center px-4 pt-24 pb-40 overflow-hidden">
      {/* subtle premium overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="inline-block px-4 py-2 rounded-full bg-white/20 text-sm mb-6 backdrop-blur-md">
          ✨ Your Personal Storage Solution
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Welcome to <br /> Lockatoo
        </h1>

        <p className="mt-5 text-base sm:text-lg max-w-xl mx-auto opacity-90">
          Store your belongings safely and conveniently. Find lockers near you,
          book instantly, and access 24/7.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="cursor-pointer px-8 py-3 rounded-full bg-white text-[#f97316] font-semibold 
            shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Get Started Free
          </button>

          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-8 py-3 rounded-full border border-white/40 text-white font-semibold 
            backdrop-blur-md bg-white/10 
            hover:bg-white hover:text-[#f97316] hover:border-white 
            hover:-translate-y-1 shadow-md hover:shadow-xl 
            transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C300,120 1100,0 1440,60 L1440,120 L0,120 Z"
            fill="#f5efe6"
          />
        </svg>
      </div>
    </section>
  );
};
