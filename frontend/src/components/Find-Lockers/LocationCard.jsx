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
  return (
    <div
      id={`location-${location._id}`}
      className={`flex flex-col rounded-xl border cursor-pointer transition-all hover:shadow-lg ${
        selected ? "ring-2 ring-[#FDB022] bg-[#FFF7E6]" : ""
      }`}
      style={{
        backgroundColor: "#FFFFFF",
        color: "#2A2A2A",
        borderColor: "rgba(253,176,34,0.2)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-6 pb-4">
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
            <p className="mt-2 text-sm" style={{ color: "#6B6B6B" }}>
              {location.locationAddress.street}, {location.locationAddress.city}
              , {location.locationAddress.province}
            </p>
          )}
        </div>

        {/* Available Lockers Badge */}
        <span
          className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap"
          style={{
            backgroundColor: "#FDB022",
            color: "#2A2A2A",
          }}
        >
          {location.availableLockers || "N/A"} Available
        </span>
      </div>

      {/* Image or Placeholder */}
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

      {/* Content */}
      <div
        className="px-6 pb-6 flex flex-col gap-5 text-sm"
        style={{ color: "#6B6B6B" }}
      >
        {/* Operating Hours */}
        {location.operatingHours?.open && location.operatingHours?.close && (
          <div className="flex items-center gap-2">
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

        {/* Total Lockers */}
        <div className="flex items-center gap-2">
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
            <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
            <path d="M12 22V12"></path>
            <polyline points="3.29 7 12 12 20.71 7"></polyline>
            <path d="m7.5 4.27 9 5.15"></path>
          </svg>
          <span>{location.totalLockers || "N/A"} Total Lockers</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium h-11 px-6
               bg-[#FDB022] text-[#2A2A2A]
               transition-transform duration-200 ease-in-out
               hover:scale-105 hover:bg-[#e09a1d] active:scale-95"
          >
            Book Now
          </button>

          <button
            onClick={() =>
              window.open(
                `https://www.google.com/maps?q=${location.locationCoordinates.lat},${location.locationCoordinates.lng}`,
                "_blank",
              )
            }
            className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium h-11 px-6 border
               bg-[#FFFBF5] text-[#2A2A2A] border-[rgba(253,176,34,0.2)]
               transition-transform duration-200 ease-in-out
               hover:scale-105 hover:bg-[#FDB022] hover:text-white active:scale-95"
          >
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
              <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
