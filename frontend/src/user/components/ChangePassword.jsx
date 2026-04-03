import { useState } from "react";

export const ChangePassword = () => {
  const updateEndpoint =
    import.meta.env.VITE_API_URL + "/api/user/update-password/";
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(updateEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Backend error:", data);
        setError(data.message);
        return;
      }
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  if (error) {
    return <div>Error displaying data. </div>;
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Current Password</label>
          <input
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            type="password"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">New Password</label>
          <input
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            type="password"
            className="form-input"
          />
        </div>

        <button type="submit" className="btn-main w-full">
          Update Password
        </button>
      </form>
    </div>
  );
};
