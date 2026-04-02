import { useState } from "react";

export const ChangePassword = () => {
    const updateEndpoint = import.meta.env.VITE_API_URL + "/api/user/update-password/"
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
      };

    } catch (error) {
      console.log("error", error);
      setError(error);
    };
  };

    if (error) {
    return <div>Error displaying data. </div>;
  };

    return (
        <>
        <h1>Change password</h1>
        <form onSubmit={handleSubmit}>
            <label>Current password</label>
            <input
            onChange={handleChange}
            name="oldPassword"
            value={formData.oldPassword}
            type="password"
             />

            <label>New password</label>
            <input
            onChange={handleChange}
            name="newPassword"
            value={formData.newPassword}
            type="password" />

            <button>Submit</button>
        </form>
        </>
    );
};
