import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export const SearchLocation = ({
  search,
  setSearch,
  city,
  setCity,
  cities,
}) => {
  const options = ["All Cities", ...cities];
  const selectedCity = city || "All Cities";

  return (
    <div className="pt-6 [&:last-child]:pb-6 relative z-[10000]">
      <div className="bg-white/70 backdrop-blur-md border border-[#FDB022]/20 rounded-xl p-4 shadow-sm md:p-5 transition-shadow hover:shadow-md">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 flex h-10 w-full min-w-0 rounded-lg border px-3 text-base outline-none
                         transition-all duration-200
                         shadow-sm hover:shadow-md
                         focus:border-[#FDB022] focus:ring-2 focus:ring-[#FDB022]/50"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "rgba(253,176,34,0.2)",
                color: "#2A2A2A",
              }}
            />
          </div>

          <Listbox
            value={selectedCity}
            onChange={(val) => setCity(val === "All Cities" ? "" : val)}
          >
            <div className="relative">
              <Listbox.Button
                className="flex h-10 w-full items-center justify-between gap-2 rounded-lg border px-3 text-sm outline-none
                           transition-all duration-200
                           shadow-sm hover:shadow-md
                           focus:border-[#FDB022] focus:ring-2 focus:ring-[#FDB022]/50 bg-white"
                style={{
                  borderColor: "rgba(253,176,34,0.2)",
                  color: "#2A2A2A",
                }}
              >
                {selectedCity}
                <ChevronUpDownIcon className="w-4 h-4 opacity-50" />
              </Listbox.Button>

              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg border border-[#FDB022]/20 bg-white shadow-lg z-[10001]">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    value={option}
                    className={({ active, selected }) =>
                      `cursor-pointer px-3 py-2 text-sm flex items-center justify-between
                       transition-all duration-150
                       ${active ? "bg-[#FFF8EF] text-[#FDB022]" : "text-gray-700"}
                       ${selected ? "font-medium text-[#FDB022]" : ""}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span>{option}</span>
                        {selected && (
                          <CheckIcon className="w-4 h-4 text-[#FDB022]" />
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};
