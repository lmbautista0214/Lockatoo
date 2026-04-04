import { useState } from "react";

export const LockerFilter = ({ storeId, handleStoreChange, stores }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    handleStoreChange({ target: { value } });
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-3 relative z-50">
      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
        Store Location:
      </span>

      <div className="relative w-52">
        <div
          tabIndex={0}
          onClick={() => setOpen(!open)}
          className={`
            px-4 py-2.5 rounded-2xl bg-white border shadow-sm
            text-sm cursor-pointer flex justify-between items-center
            transition-all duration-200
            ${
              storeId
                ? "border-3 border-orange-500 bg-white"
                : "border-gray-200 hover:border-orange-400"
            }
            focus:outline-none
          `}
        >
          <span className={storeId ? "text-gray-800" : "text-gray-400"}>
            {storeId
              ? stores.find((s) => s._id === storeId)?.locationName
              : "Select Store"}
          </span>

          <span
            className={`text-gray-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>

        {open && (
          <div
            className="
              absolute top-full mt-2 w-full 
              bg-white border border-gray-200 
              rounded-2xl shadow-2xl z-50 overflow-hidden
            "
          >
            {stores.map((store) => (
              <div
                key={store._id}
                onClick={() => handleSelect(store._id)}
                className={`
                  px-4 py-2.5 text-sm cursor-pointer transition-all duration-200
                  ${
                    storeId === store._id
                      ? "bg-orange-500 text-white font-semibold"
                      : "hover:bg-orange-500 hover:text-white"
                  }
                `}
              >
                {store.locationName}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
