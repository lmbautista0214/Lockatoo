import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5efe6] px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg border border-white/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-8">
        <h2 className="text-center text-xl tracking-widest font-bold text-orange-500">
          LockaToo
        </h2>

        <h1 className="text-3xl font-bold text-center text-gray-800 mt-2">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 text-sm mt-2">
          Enter your email to receive reset link
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />

          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition 
              ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg"
              }
            `}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-green-500">{message}</p>
        )}
        <p
          onClick={() => navigate("/login")}
          className="text-center text-sm text-gray-500 mt-6 cursor-pointer hover:text-orange-500 transition"
        >
          ← Back to Login
        </p>
      </div>
    </div>
  );
};
