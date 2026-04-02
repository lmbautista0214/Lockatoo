import { useEffect, useState } from "react";
import NearbyMap from "../components/NearbyMap";
import { HeaderNav } from "../components/HeaderNav";
import axios from "axios";

function NearbyLocationsPage() {
  const [locations, setLocations] = useState([]);
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    async function fetchNearby() {
      try {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setUserCoords({ lat, lng }); // ✅ store user coords

          // ✅ Use Vite env variable
          const API_URL = import.meta.env.VITE_API_URL;

          const res = await axios.get(
            `${API_URL}/api/locations/nearby?lat=${lat}&lng=${lng}&distance=5000`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );

          setLocations(res.data.data);
        });
      } catch (error) {
        console.error("Error fetching nearby locations:", error);
      }
    }

    fetchNearby();
  }, []);

  return (
    <div>
      <HeaderNav />
      <h1>Nearby Locations</h1>
      <NearbyMap locations={locations} userCoords={userCoords} />
    </div>
  );
}

export default NearbyLocationsPage;
