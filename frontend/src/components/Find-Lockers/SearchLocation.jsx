export const SearchLocation = ({
  search,
  setSearch,
  city,
  setCity,
  cities,
}) => {
  return (
    <div className="pt-6 [&:last-child]:pb-6">
      <div className="grid md:grid-cols-2 gap-4">
        {/* 🔍 Search input */}
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B6B6B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            type="text"
            placeholder="Search by name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base transition-[color,box-shadow] outline-none focus:border-[#FDB022] focus:ring-2 focus:ring-[#FDB022]/50"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "rgba(253,176,34,0.2)",
              color: "#2A2A2A",
            }}
          />
        </div>

        {/* 🏙️ City filter */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex h-9 w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm transition-[color,box-shadow] outline-none focus:border-[#FDB022] focus:ring-2 focus:ring-[#FDB022]/50"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "rgba(253,176,34,0.2)",
            color: "#2A2A2A",
          }}
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
