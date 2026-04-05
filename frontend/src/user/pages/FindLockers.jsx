import { useEffect, useState } from "react";
import { NearbyMap } from "../components/Find-Lockers/NearbyMap";
import { HeaderNav } from "../../components/HeaderNav";
import { SearchLocation } from "../components/Find-Lockers/SearchLocation";
import { LocationCardGrid } from "../components/Find-Lockers/LocationCard";
import { BookingForm } from "../components/BookingForm/BookingForm";
import axios from "axios";

export const FindLockers = () => {
  const [locations, setLocations] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  // filter states
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    async function fetchNearby() {
      try {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setUserCoords({ lat, lng });

          const API_URL = import.meta.env.VITE_API_URL;
          const res = await axios.get(
            `${API_URL}/api/locations/nearby?lat=${lat}&lng=${lng}&distance=50000000000`,
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

  // derive cities from locations
  const cities = Array.from(
    new Set(locations.map((loc) => loc.locationAddress?.city).filter(Boolean)),
  );

  // filtering logic
  const filteredLocations = locations.filter((loc) => {
    const matchesSearch =
      !search ||
      loc.locationName.toLowerCase().includes(search.toLowerCase()) ||
      loc.locationAddress?.street?.toLowerCase().includes(search.toLowerCase());

    const matchesCity = !city || loc.locationAddress?.city === city;

    return matchesSearch && matchesCity;
  });

  // if pin selected, show only that card
  const activeLocations = selectedLocationId
    ? locations.filter((loc) => loc._id === selectedLocationId)
    : filteredLocations;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] to-[#FFE5D9]">
      <HeaderNav />

      <main className="relative z-0 max-w-6xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-[#2A2A2A] mb-3">Find Lockers</h1>
        <span>Browse available locker locations near you</span>

        {/* Map */}
        <div className="mb-5">
          <NearbyMap
            locations={activeLocations}
            userCoords={userCoords}
            onSelectLocation={(id) => {
              if (!id) {
                setSelectedLocationId(null);
              } else {
                setSelectedLocationId(id);
              }
            }}
          />
        </div>

        {/* Search Filters */}
        <div className="mb-5">
          <SearchLocation
            search={search}
            setSearch={setSearch}
            city={city}
            setCity={setCity}
            cities={cities}
          />
        </div>

        {/* Cards */}
        <LocationCardGrid
          locations={activeLocations}
          selectedLocationId={selectedLocationId}
        />
      </main>
    </div>
  );
};
