import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// User icon (purple circle + inverted triangle)
const userIcon = L.divIcon({
  html: `
    <div class="inline-block transform transition-transform duration-200 ease-in-out hover:scale-125 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
        <!-- Purple circle -->
        <circle cx="16" cy="12" r="8" fill="#8B5CF6" stroke="white" stroke-width="2"/>
        <!-- Inverted triangle below -->
        <polygon points="8,20 24,20 16,36" fill="#8B5CF6" stroke="white" stroke-width="2"/>
      </svg>
    </div>
  `,
  className: "",
  iconSize: [32, 40],
  iconAnchor: [16, 36],
});

// Locker icon (locker box + rod + circle pointer)
const lockerIcon = L.divIcon({
  html: `
    <div class="inline-block transform transition-transform duration-200 ease-in-out hover:scale-125 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54">
        <!-- Locker icon box -->
        <rect x="10" y="2" width="24" height="16" rx="2" ry="2" fill="#EA580C" stroke="white" stroke-width="2"/>
        <line x1="22" y1="2" x2="22" y2="18" stroke="white" stroke-width="1.5"/>
        <line x1="10" y1="10" x2="34" y2="10" stroke="white" stroke-width="1.5"/>
        
        <!-- Vertical rod -->
        <rect x="21" y="18" width="2" height="22" fill="#EA580C"/>
        
        <!-- Small circle at bottom -->
        <circle cx="22" cy="46" r="8" fill="#EA580C" stroke="white" stroke-width="2"/>
      </svg>
    </div>
  `,
  className: "",
  iconSize: [44, 54],
  iconAnchor: [22, 46],
});

export const NearbyMap = ({ locations, userCoords, onSelectLocation }) => {
  const center = userCoords
    ? [userCoords.lat, userCoords.lng]
    : [15.186, 120.56]; // fallback center

  return (
    <div className="relative h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-[#FFFBF5] to-[#FFE5D9] border border-[rgba(253,176,34,0.2)]">
      {userCoords ? (
        <MapContainer
          center={center}
          zoom={12}
          zoomControl={false}
          attributionControl={false}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User marker (purple circle + triangle) */}
          <Marker position={[userCoords.lat, userCoords.lng]} icon={userIcon} />

          {/* Locker markers (locker icon + rod + circle pointer) */}
          {locations.map((loc) => (
            <Marker
              key={loc._id}
              position={[
                loc.locationCoordinates.lat,
                loc.locationCoordinates.lng,
              ]}
              icon={lockerIcon}
              eventHandlers={{
                click: () => {
                  if (onSelectLocation) onSelectLocation(loc._id);
                },
                popupclose: () => {
                  if (onSelectLocation) onSelectLocation(null);
                },
              }}
            >
              <Popup>
                <div className="w-56 text-sm">
                  {/* Title */}
                  <h3 className="font-semibold text-[#2A2A2A] text-base mb-1">
                    {loc.locationName}
                  </h3>

                  {/* Address */}
                  {loc.locationAddress?.street && (
                    <p className="text-gray-600 text-xs mb-1">
                      {loc.locationAddress.street}
                    </p>
                  )}
                  {loc.locationAddress?.city && (
                    <p className="text-gray-600 text-xs mb-2">
                      {loc.locationAddress.city}, {loc.locationAddress.province}
                    </p>
                  )}

                  {/* Image */}
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

                  {/* Operating Hours */}
                  {loc.operatingHours?.open && loc.operatingHours?.close && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-[#FDB022]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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

                  {/* Buttons */}
                  <div className="flex gap-2">
                    {/* Book Now button */}
                    <button
                      onClick={() => {}}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full text-xs font-semibold h-9 px-3
       bg-[#FDB022] text-[#2A2A2A]
       transition-transform duration-200 ease-in-out
       hover:scale-105 hover:bg-[#e09a1d] active:scale-95"
                    >
                      Book Now
                    </button>

                    {/* Open in Maps button */}
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps?q=${loc.locationCoordinates.lat},${loc.locationCoordinates.lng}`,
                          "_blank",
                        )
                      }
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full text-xs font-semibold h-9 px-3 border
       bg-[#FFF7E6] text-[#2A2A2A] border-[rgba(253,176,34,0.3)]
       transition-transform duration-200 ease-in-out
       hover:scale-105 hover:bg-[#FDB022] hover:text-white active:scale-95"
                    >
                      Open in Maps
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        // Overlay design when no coords yet
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lucide lucide-map-pin w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="#FDB022"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <h3 className="text-xl font-semibold text-[#2A2A2A] mb-2">
              Interactive Map
            </h3>
            <p className="text-[#6B6B6B] max-w-md mx-auto">
              Google Maps integration would display all locker locations here.
              <br />
              Click on markers to view details and book lockers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
