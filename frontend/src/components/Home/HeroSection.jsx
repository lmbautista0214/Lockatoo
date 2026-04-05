import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <div className="hero-container">
        <div className="hero-badge">✨ Your baggage solution</div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Welcome to <br /> Lockatoo
        </h1>

        <p className="mt-5 text-base sm:text-lg max-w-xl mx-auto opacity-90">
          Store your belongings safely and conveniently. 
          <br/> Find lockers near you and book instantly!
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="btn-home-primary"
          >
            Get started free
          </button>

          <button
            onClick={() => navigate("/login")}
            className="btn-home-secondary"
          >
            Sign in
          </button>
        </div>
      </div>

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
