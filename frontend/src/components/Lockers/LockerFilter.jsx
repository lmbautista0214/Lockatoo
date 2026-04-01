import { useState } from "react";

export const LockerFilter = ({ storeId, handleStoreChange, stores }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    handleStoreChange({ target: { value } });
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-3 relative">
      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
        Store Location:
      </span>

      <div className="relative w-52">
        <div
          onClick={() => setOpen(!open)}
          className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm 
          text-sm cursor-pointer flex justify-between items-center
          hover:border-orange-300 hover:shadow-md
          focus-within:ring-2 focus-within:ring-orange-500 transition"
        >
          <span className={storeId ? "text-gray-800" : "text-gray-400"}>
            {storeId || "Select Store"}
          </span>

          <span
            className={`text-gray-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>

        {open && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
            {stores.map((store) => (
              <div
                key={store}
                onClick={() => handleSelect(store)}
                className={`px-4 py-2.5 text-sm cursor-pointer transition
                  ${
                    storeId === store
                      ? "bg-orange-50 text-orange-600 font-medium"
                      : "hover:bg-gray-50"
                  }`}
              >
                {store}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
