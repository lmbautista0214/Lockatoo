import { useEffect, useState } from "react";
import LockerPricing from "../components/LockerPricing";
import RateComparison from "../components/RateComparison";
import PricingGuidelines from "../components/PricingGuidelines";
import { listPricingByLocation } from "../api/pricingApi";

const Pricing = () => {

  const [pricing, setPricing] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const fetchPricing = async (locationId = selectedLocation) => {
    if (!locationId) return;

    try {
      const data = await listPricingByLocation(locationId);
      console.log("Pricing data:", data);
      setPricing(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch pricing:", error);
      setPricing([]);
    }
  };

  useEffect(() => {
    if (!selectedLocation) return;
    fetchPricing(selectedLocation);
  }, [selectedLocation]);

  return (
    <>
      <h1>Pricing & Rates</h1>
      <p>Manage rental rates for different locker sizes</p>

      <div>

        <LockerPricing
          pricing={pricing}
          refresh={fetchPricing}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        <RateComparison pricing={pricing} />

        <PricingGuidelines />

      </div>
    </>
  );
};

export default Pricing;