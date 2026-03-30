import { useNavigate } from "react-router-dom";

export const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-20 px-5 flex justify-center">
      <div className="relative w-full max-w-4xl bg-linear-to-r from-orange-400 to-red-400 text-white rounded-3xl py-16 px-6 text-center shadow-xl overflow-hidden">
        <h2 className="text-2xl md:text-4xl font-bold">
          Ready to Get Started?
        </h2>

        <p className="mt-4 text-sm md:text-base opacity-90">
          Join thousands of satisfied customers using Lockatoo for their storage
          needs
        </p>

        <button
          onClick={() => navigate("/register")}
          className="mt-8 bg-white text-orange-500 px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition cursor-pointer"
        >
          Create Free Account
        </button>

        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
      </div>
    </div>
  );
};
