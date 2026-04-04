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
  xxl: "XXL"
};

const rateFields = [
  { key: "pricePerHour", label: "Hourly" },
  { key: "pricePerDay", label: "Daily" },
  { key: "pricePerWeek", label: "Weekly" },
  { key: "pricePerMonth", label: "Monthly" },
  { key: "extraHourFee", label: "Extra Hour" }
];

const sizeOrder = ["xs", "s", "m", "l", "xl", "xxl"];

const LockerPricing = ({ pricing, refresh, selectedLocation, setSelectedLocation }) => {

  const [locations, setLocations] = useState([]);
  const [lockerSizes, setLockerSizes] = useState([]);
  const [tempValues, setTempValues] = useState({});

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

      if (locationsData.length > 0) {
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

  const initializePricing = async () => {
    try {
      const missing = lockerSizes.filter(
        locker =>
          !pricing.find(
            p => p.lockerSize?.toLowerCase() === locker.size
          )
      );

      if (missing.length > 0) {
        await Promise.all(
          missing.map(locker =>
            createPricing({
              locationId: selectedLocation,
              lockerSize: locker.size,
              pricePerHour: null,
              pricePerDay: null,
              pricePerWeek: null,
              pricePerMonth: null,
              extraHourFee: null
            })
          )
        );

        await refresh(selectedLocation);
      }

    } catch (error) {
      console.error("Initialize pricing error:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (!selectedLocation) return;

    const init = async () => {
      await fetchLockerSizes();
    };

    init();
  }, [selectedLocation]);

  useEffect(() => {
    if (!selectedLocation || lockerSizes.length === 0) return;

    const init = async () => {
      await initializePricing();
    };

    init();
  }, [lockerSizes]);


  const getPricingByLocker = (lockerSize) => {
    return pricing.find(
      (p) => p.lockerSize?.toLowerCase() === lockerSize?.toLowerCase()
    );
  };

  const ensurePricingExists = async (lockerSize) => {
    const existing = pricing.find(
      (p) => p.lockerSize?.toLowerCase() === lockerSize?.toLowerCase()
    );

    if (!existing) {
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
    }

    return existing;
  };

  const handleEnableRate = async (lockerSize, field) => {
    const p = await ensurePricingExists(lockerSize);

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
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        {locations.map((loc) => (
          <option key={loc._id} value={loc._id}>
            {loc.locationName}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-3 gap-6 mt-4">

        {lockerSizes.map((locker) => {

          const data = getPricingByLocker(locker.size);

          return (
            <div key={locker.size} className="border p-4 rounded">

              <h2>{sizeMap[locker.size]} Locker</h2>

              {rateFields.map(({ key, label }) => {

                const value = data?.[key];
                const isEnabled = value !== null && value !== undefined;

                return (
                  <div key={key} style={{ marginBottom: "10px" }}>

                    <label>{label}</label>

                    {!isEnabled ? (
                      <button onClick={() => handleEnableRate(locker.size, key)}>
                        Enable
                      </button>
                    ) : (
                      <div>
                        <input
                          type="number"
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
                        >
                          Update
                        </button>
                        
                        <button onClick={() => handleDisableRate(data, key)}>
                          Disable
                        </button>
                      </div>
                    )}

                  </div>
                );

              })}

            </div>
          );

        })}

      </div>

    </div>
  );
};

export default LockerPricing;