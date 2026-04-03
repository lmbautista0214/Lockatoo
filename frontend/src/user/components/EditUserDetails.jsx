import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";

export const EditUserDetails = () => {
  //   const { id } = useParams;
  //sample id for now to see if data is fetched --- to be updated on Friday once routes/links are created
  let id = "69cddebab4ddda018f8d4c2f";
  const { data, loading, error } = useFetch(
    import.meta.env.VITE_API_URL + "/api/user/view/" + id,
  );

  const updateEndpoint = import.meta.env.VITE_API_URL + "/api/user/edit/" + id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });

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
    <>
      <h1>Edit details</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          onChange={handleChange}
          placeholder={data.name}
          defaultValue={data.name}
        />

        <label>Email:</label>
        <input
          name="email"
          onChange={handleChange}
          defaultValue={data.email}
          placeholder={data.email}
        />

        <label>Contact number:</label>
        <input
          name="contactNumber"
          onChange={handleChange}
          defaultValue={data.contactNumber}
          placeholder={data.contactNumber}
        />

        <button>Update</button>
      </form>
    </>
  );
};
