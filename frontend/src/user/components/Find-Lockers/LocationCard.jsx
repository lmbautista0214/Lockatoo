import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Grid wrapper
export const LocationCardGrid = ({ locations, selectedLocationId }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {locations.map((location) => (
        <LocationCard
          key={location._id}
          location={location}
          selected={selectedLocationId === location._id}
        />
      ))}
    </div>
  );
};

// Individual card
export function LocationCard({ location, selected }) {
  const navigate = useNavigate();
  const [availableCount, setAvailableCount] = useState(null);

  useEffect(() => {
    const fetchAvailableLockers = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await axios.post(
          `${API_URL}/api/lockers/available`,
          {
            locationId: location._id,
            start_datetime: new Date().toISOString(),
            end_datetime: new Date(
              Date.now() + 24 * 60 * 60 * 1000,
            ).toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setAvailableCount(res.data.count);
      } catch (err) {
        console.error("Error fetching available lockers:", err);
        setAvailableCount(null);
      }
    };

    if (location?._id) fetchAvailableLockers();
  }, [location?._id]);

  return (
    <div
      id={`location-${location._id}`}
      className={`relative z-0 flex flex-col h-full rounded-xl border transition-all hover:shadow-lg ${
        selected ? "ring-2 ring-[#FDB022] bg-[#FFF7E6]" : ""
      }`}
      style={{
        backgroundColor: "#FFFFFF",
        color: "#2A2A2A",
        borderColor: "rgba(253,176,34,0.2)",
      }}
    >
      {/* Top section: header + address */}
      <div className="px-6 pt-6 pb-4 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="flex items-center gap-2 text-base font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {location.locationName}
            </h4>

            {location.locationAddress && (
              <p className="mt-2 text-sm text-gray-600">
                {location.locationAddress.street},{" "}
                {location.locationAddress.city},{" "}
                {location.locationAddress.province}
              </p>
            )}
          </div>

          <span
            className="relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap
             bg-white/80 backdrop-blur-md border shadow-md"
            style={{ borderColor: "rgba(253,176,34,0.3)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 text-[#FDB022]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>

            <span className="text-[#2A2A2A]">
              {availableCount !== null ? availableCount : "--"}
            </span>
            <span className="text-gray-500 font-medium">lockers</span>
          </span>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-auto">
        {location.operatingHours?.open && location.operatingHours?.close && (
          <div className="px-6 pb-4 flex items-center gap-2 text-sm text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
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
              {location.operatingHours.open} – {location.operatingHours.close}
            </span>
          </div>
        )}

        <div className="px-6 pb-4">
          {location.image ? (
            <img
              src={location.image}
              alt={location.locationName}
              className="w-full h-56 object-cover rounded-md border"
              style={{ borderColor: "rgba(253,176,34,0.2)" }}
            />
          ) : (
            <div
              className="w-full h-56 flex items-center justify-center rounded-md border text-sm text-gray-500 bg-[#FFFBF5]"
              style={{ borderColor: "rgba(253,176,34,0.2)" }}
            >
              No Image Available
            </div>
          )}
        </div>

        <div className="px-6 pb-6 flex gap-3">
          {/* Book Now */}
          <button
            onClick={() => navigate(`/bookings/${location._id}`)}
            className={`group relative flex-1 overflow-hidden rounded-xl h-11 px-6
            text-sm font-semibold text-white
            bg-gradient-to-r from-[#FDB022] via-[#f59e0b] to-[#fbbf24]
            shadow-md transition-all duration-300 ease-out
            hover:shadow-xl hover:-translate-y-[2px]
            active:translate-y-0 active:shadow-md
            ${availableCount === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <span
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300
                 bg-gradient-to-r from-[#FDB022] via-[#f59e0b] to-[#fbbf24] blur-md"
            />
            <span className="relative flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 3h12l-1 18H7L6 3z" />
                <path d="M9 3V1h6v2" />
              </svg>
              <span className="tracking-wide">Book Now</span>
            </span>
          </button>

          {/* Directions */}
          <button
            onClick={() =>
              window.open(
                `https://www.google.com/maps?q=${location.locationCoordinates.lat},${location.locationCoordinates.lng}`,
                "_blank",
              )
            }
            className={`group relative overflow-hidden rounded-xl h-11 px-5
            bg-white/70 backdrop-blur-md
            border border-[rgba(253,176,34,0.3)]
            text-[#2A2A2A]
            shadow-sm transition-all duration-200 ease-out
            hover:shadow-md hover:-translate-y-[1px]
            hover:bg-[#FDB022] hover:text-white
            active:translate-y-0 active:shadow-sm
            ${!location.locationCoordinates ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
              <span className="text-sm font-medium">Directions</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
