import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icons
const userIcon = L.icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const lockerIcon = L.icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/orange-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function NearbyMap({ locations, userCoords }) {
  const center = userCoords
    ? [userCoords.lat, userCoords.lng]
    : [15.186, 120.56]; // fallback center

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User marker (blue) */}
      {userCoords && (
        <Marker position={[userCoords.lat, userCoords.lng]} icon={userIcon} />
      )}

      {/* Locker markers (orange) */}
      {locations.map((loc) => (
        <Marker
          key={loc._id}
          position={[loc.locationCoordinates.lat, loc.locationCoordinates.lng]}
          icon={lockerIcon}
        />
      ))}
    </MapContainer>
  );
}

export default NearbyMap;
