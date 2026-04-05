import { useEffect, useState } from "react";
import {
  updatePricing,
  createPricing
} from "../api/pricingApi";

import { getLockerSizesByLocation } from "../api/lockerApi";

const sizeMap = {
  xs: "Extra Small",
  s: "Small",
  m: "Medium",
  l: "Large",
  xl: "Extra Large",
  xxl: "Double Extra Large"
};

const rateFields = [
  { key: "pricePerHour", label: "Hourly" },
  { key: "pricePerDay", label: "Daily" },
  { key: "pricePerWeek", label: "Weekly" },
  { key: "pricePerMonth", label: "Monthly" },
  { key: "extraHourFee", label: "Extra Hour" }
];

const sizeOrder = ["xs", "s", "m", "l", "xl", "xxl"];

const LockerPricing = ({ pricing, refresh, selectedLocation, setSelectedLocation, pricingLoading }) => {

  const [locations, setLocations] = useState([]);
  const [lockerSizes, setLockerSizes] = useState([]);
  const [tempValues, setTempValues] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/locations`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch locations");
      }

      const data = await res.json();

      const locationsData = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];

      setLocations(locationsData);

      if (locationsData.length > 0 && !selectedLocation) {
        setSelectedLocation(locationsData[0]._id);
      }

    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const fetchLockerSizes = async () => {
    if (!selectedLocation) return;

    const sizes = await getLockerSizesByLocation(selectedLocation);

    const sorted = sizes.sort(
      (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
    );

    const formatted = sorted.map((size) => ({
      size: size.toLowerCase()
    }));

    setLockerSizes(formatted);
  };

  useEffect(() => {
    if (!selectedLocation) return;

    const init = async () => {
      await fetchLockerSizes();
    };

    init();
  }, [selectedLocation]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchLocations();
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    setLockerSizes([]);
  }, [selectedLocation]);

  useEffect(() => {
  setTempValues({});
}, [selectedLocation, pricing]);

  const getPricingByLocker = (lockerSize) => {
    return pricing.find(
      (p) =>
        (p.locationId === selectedLocation ||
          p.locationId?._id === selectedLocation) &&
        p.lockerSize?.toLowerCase() === lockerSize?.toLowerCase()
    );
  };

  const ensurePricingExists = async (lockerSize) => {
    const existing = pricing.find(
      (p) =>
        (p.locationId === selectedLocation ||
          p.locationId?._id === selectedLocation) &&
        p.lockerSize?.toLowerCase() === lockerSize?.toLowerCase()
    );

    if (existing) return existing;

    const newPricing = await createPricing({
      locationId: selectedLocation,
      lockerSize,
      pricePerHour: null,
      pricePerDay: null,
      pricePerWeek: null,
      pricePerMonth: null,
      extraHourFee: null
    });

    return newPricing;
  };

  const handleEnableRate = async (lockerSize, field) => {
    const p = await ensurePricingExists(lockerSize);

    setTempValues(prev => ({
      ...prev,
      [p._id + field]: 0
    }));

    await updatePricing(p._id, { [field]: 0 });

    await refresh(selectedLocation);
  };

  const handleDisableRate = async (p, field) => {

    await updatePricing(p._id, { [field]: null });
    await refresh(selectedLocation);
  };

  const handleChange = (p, field, value) => {
    p[field] = value === "" ? "" : Number(value);
  };

  const handleUpdateRate = async (p, field, value) => {
    await updatePricing(p._id, {
      [field]: value === "" ? null : Number(value)
    });

    await refresh(selectedLocation);
  };

  return (
    <div>
      <div className="mb-6">
        <label className="block text-lg mb-2 font-bold">
          Select Location
        </label>

        <div className="relative">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full appearance-none bg-white border border-[#ffeddf] rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-200 cursor-pointer"
          >
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>
                {loc.locationName}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#980dfa]">
            ▼
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
         {loading || pricingLoading ? (
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-[#ffeddf] animate-pulse"
            >
              <div className="h-5 w-40 bg-gray-200 rounded mb-6"></div>

              {[...Array(5)].map((_, j) => (
                <div key={j} className="flex justify-between items-center mb-4">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-8 w-28 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ))
        ) : (
          lockerSizes.map((locker) => {

          const data = getPricingByLocker(locker.size);

          return (
            <div key={`${selectedLocation}-${locker.size}`} className="bg-white p-6 rounded-2xl border border-[#ffeddf] hover:shadow-md transition">

              <h2 className="text-lg font-semibold mb-4">{sizeMap[locker.size]} Locker</h2>

              {rateFields.map(({ key, label }) => {

                const value = data?.[key];
                const isEnabled = value !== null && value !== undefined;

                return (
                  <div key={key} className="flex items-center justify-between mb-3">
                    
                    <span className="text-gray-600 text-m">{label}</span>

                    {!isEnabled ? (
                      <button
                        onClick={() => handleEnableRate(locker.size, key)}
                        className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
                      >
                        Enable
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        
                        <input
                          type="number"
                          className="w-24 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                          value={tempValues[data?._id + key] ?? value ?? ""}
                          onChange={(e) =>
                            setTempValues(prev => ({
                              ...prev,
                              [data?._id + key]: e.target.value
                            }))
                          }
                        />

                        <button
                          onClick={() =>
                            handleUpdateRate(
                              data,
                              key,
                              tempValues[data?._id + key]
                            )
                          }
                          className="text-xs px-4 py-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 cursor-pointer"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => handleDisableRate(data, key)}
                          className="text-xs px-4 py-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer"
                        >
                          Disable
                        </button>

                      </div>
                    )}
                  </div>
                );

              })}

            </div>
          );
        
        }))}

      </div>

    </div>
  );
};

export default LockerPricing;