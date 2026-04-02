import { useFetch } from "../hooks/useFetch";
import { useParams, Link } from "react-router";

export const UserProfile = () => {
  // const {id} = useParams();
  //sample ID for testing:
  let id = "69cc81305b6240476f4b7e60";
  //remove this sample ID when integrating
  let viewUserEndpoint = import.meta.env.VITE_API_URL + "/api/user/view/" + id

  const { data, loading, error } = useFetch(viewUserEndpoint);

  if (loading) {
    return <div>Loading data</div>;
  };

  if (error) {
    return <div>Error displaying data. </div>;
  };

  return (
    <div>
      <div>
        <Link to={`/user/edit/${data._id}`}>
          <button>Edit</button>
        </Link>
        
      </div>
      <h1>My profile</h1>
      <div>
        <b>Name:</b> {data.name}
      </div>
      <div>
        <b>Contact number:</b> {data.contactNumber}
      </div>
      <div>

        <b>Email:</b> {data.email}
      </div>
    </div>
  );
};
