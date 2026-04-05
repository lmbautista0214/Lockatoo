import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const EditUserDetails = () => {
  const { userId } = useParams();
  const { data, loading, error } = useFetch(
    import.meta.env.VITE_API_URL + "/api/user/view/" + userId,
  );

  const updateEndpoint = import.meta.env.VITE_API_URL + "/api/user/edit/" + userId;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        contactNumber: data.contactNumber || "",
      });
    }
  }, [data]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("formData", formData);
    try {
      const response = await fetch(updateEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("data", data);

      toast.success("Data updated successfully!");
    } catch (error) {
      console.log("error", error);
    }
  };

  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>Error displaying data. </div>;
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contact Number</label>
          <input
            name="contactNumber"
            onChange={handleChange}
            value={formData.contactNumber}
            className="form-input"
          />
        </div>

        <button type="submit" className="btn-main w-full">
          Update Details
        </button>
      </form>
    </div>
  );
};
