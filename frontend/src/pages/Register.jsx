import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  const inputStyle = (error) =>
    `w-full border rounded-xl px-4 py-3 focus:outline-none transition
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
    const passwordRegex = /^(?=.*\d).{8,}$/;
    const phoneRegex = /^09\d{9}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(formData.password))
      newErrors.password = "Min 8 chars + 1 number";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.contactNumber) newErrors.contactNumber = "Contact required";
    else if (!phoneRegex.test(formData.contactNumber))
      newErrors.contactNumber = "Must start with 09";

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
        import.meta.env.VITE_API_URL + "/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) return toast.error(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Registered successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-[#fff4ed] py-10 text-center">
          <div className="w-16 h-16 mx-auto bg-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 font-bold">
            👤+
          </div>
          <h2 className="text-2xl font-bold text-orange-500">Join Lockatoo</h2>
          <p className="text-gray-500 text-sm mt-2">
            Create your account and get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={inputStyle(errors.name)}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={inputStyle(errors.email)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}

          <input
            type="text"
            name="contactNumber"
            placeholder="Phone Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className={inputStyle(errors.contactNumber)}
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-xs">{errors.contactNumber}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={inputStyle(errors.password)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={inputStyle(errors.confirmPassword)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <label
              className={`cursor-pointer rounded-xl border p-3 text-center font-medium transition ${
                formData.role === "user"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
                className="hidden"
              />
              User
            </label>

            <label
              className={`cursor-pointer rounded-xl border p-3 text-center font-medium transition ${
                formData.role === "admin"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleChange}
                className="hidden"
              />
              Admin
            </label>
          </div>

          <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold">
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-500 cursor-pointer"
            >
              Sign in here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
