//NO NEED FOR THIS!!

import { useFetch } from "../../hooks/useFetch";

export const BookingLocation = ({value, onChange}) => {
//ADD ENDPOINT
const locationEndpoint = import.meta.env.VITE_API_URL + "/api/locations/"
    const { data, loading, error } = useFetch("");

  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>Error displaying data. </div>;
  }
    return (
<>
          <div>
            <select
              name='lockerLocation'
              value={value}
              onChange={onChange}
            >
              <option value=''>Select location</option>
              {sampleLocations.map((option) => (
                <option key={option.id} value={option.location}>
                  {option.location}
                </option>
              ))}
            </select>
          </div>
          </>
    );
};
