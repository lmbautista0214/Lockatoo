import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const inputStyle = (error) =>
    `w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none transition
     ${
       error
         ? "border-red-500 focus:border-red-500"
         : "border-gray-300 focus:border-orange-500"
     }`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue = name === "email" ? value.trim().toLowerCase() : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validate = () => {
    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5efe6] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-500 p-4 rounded-xl shadow-md">🔒</div>
        </div>

        <h1 className="text-2xl font-bold text-center text-orange-500">
          Welcome Back!
        </h1>

        <p className="text-center text-gray-500 text-sm mt-2">
          Sign in to access your Lockatoo account
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={inputStyle(errors.email)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputStyle(errors.password)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <p
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-orange-500 cursor-pointer text-right"
          >
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-orange-400 to-orange-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-orange-500 font-medium cursor-pointer pl-2"
          >
            Register here
          </span>
        </p>

        <p
          onClick={() => navigate("/")}
          className="text-center text-sm text-gray-400 mt-2 cursor-pointer hover:text-orange-500"
        >
          ← Back to home
        </p>
      </div>
    </div>
  );
};
