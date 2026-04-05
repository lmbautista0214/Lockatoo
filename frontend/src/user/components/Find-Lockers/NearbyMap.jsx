import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// User icon
const userIcon = L.divIcon({
  html: `
    <div class="inline-block transform transition-transform duration-200 ease-in-out hover:scale-125 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
        <circle cx="16" cy="12" r="8" fill="#8B5CF6" stroke="white" stroke-width="2"/>
        <polygon points="8,20 24,20 16,36" fill="#8B5CF6" stroke="white" stroke-width="2"/>
      </svg>
    </div>
  `,
  className: "",
  iconSize: [32, 40],
  iconAnchor: [16, 36],
});

// Locker icon
const lockerIcon = L.divIcon({
  html: `
    <div class="inline-block transform transition-transform duration-200 ease-in-out hover:scale-125 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54">
        <rect x="10" y="2" width="24" height="16" rx="2" ry="2" fill="#EA580C" stroke="white" stroke-width="2"/>
        <line x1="22" y1="2" x2="22" y2="18" stroke="white" stroke-width="1.5"/>
        <line x1="10" y1="10" x2="34" y2="10" stroke="white" stroke-width="1.5"/>
        <rect x="21" y="18" width="2" height="22" fill="#EA580C"/>
        <circle cx="22" cy="46" r="8" fill="#EA580C" stroke="white" stroke-width="2"/>
      </svg>
    </div>
  `,
  className: "",
  iconSize: [44, 54],
  iconAnchor: [22, 46],
});

export const NearbyMap = ({ locations, userCoords, onSelectLocation }) => {
  const navigate = useNavigate();

  // Center map: userCoords if available, else default location
  const center = userCoords
    ? [userCoords.lat, userCoords.lng]
    : [15.186, 120.56];

  return (
    <div className="relative z-0 h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-[#FFFBF5] to-[#FFE5D9] border border-[rgba(253,176,34,0.2)]">
      <MapContainer
        center={center}
        zoom={12}
        zoomControl={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* User Marker only if coords exist */}
        {userCoords && (
          <Marker position={[userCoords.lat, userCoords.lng]} icon={userIcon} />
        )}

        {/* Locker Markers */}
        {locations.map((loc) => (
          <Marker
            key={loc._id}
            position={[
              loc.locationCoordinates.lat,
              loc.locationCoordinates.lng,
            ]}
            icon={lockerIcon}
            eventHandlers={{
              click: () => onSelectLocation?.(loc._id),
              popupclose: () => onSelectLocation?.(null),
            }}
          >
            <Popup>
              <div className="w-60 text-sm">
                <h3 className="font-semibold text-[#2A2A2A] text-base mb-1">
                  {loc.locationName}
                </h3>

                {loc.locationAddress?.street && (
                  <p className="text-gray-600 text-xs">
                    {loc.locationAddress.street}
                  </p>
                )}
                {loc.locationAddress?.city && (
                  <p className="text-gray-600 text-xs mb-2">
                    {loc.locationAddress.city}, {loc.locationAddress.province}
                  </p>
                )}

                {loc.image ? (
                  <img
                    src={loc.image}
                    alt={loc.locationName}
                    className="w-full h-28 object-cover rounded-md mb-2 border border-gray-200"
                  />
                ) : (
                  <p className="text-xs text-gray-500 mb-2">
                    No image available
                  </p>
                )}

                {loc.operatingHours?.open && loc.operatingHours?.close && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-[#FDB022]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>
                      {loc.operatingHours.open} – {loc.operatingHours.close}
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/bookings/${loc._id}`)}
                    className="group flex-1 h-9 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 text-white bg-gradient-to-r from-[#FDB022] via-[#f59e0b] to-[#fbbf24] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-[1px] active:translate-y-0 active:shadow-sm cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 3h12l-1 18H7L6 3z" />
                      <path d="M9 3V1h6v2" />
                    </svg>
                    <span>Book</span>
                  </button>

                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${loc.locationCoordinates.lat},${loc.locationCoordinates.lng}`,
                        "_blank",
                      )
                    }
                    className="group flex-1 h-9 rounded-lg text-xs font-medium flex items-center justify-center gap-1 bg-white/70 backdrop-blur-md border border-[rgba(253,176,34,0.3)] text-[#2A2A2A] shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-[1px] hover:bg-[#FDB022] hover:text-white active:translate-y-0 active:shadow-sm cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                    </svg>
                    <span>Directions</span>
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
