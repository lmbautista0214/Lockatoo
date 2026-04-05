import { useEffect, useState } from "react";
import LockerPricing from "../components/LockerPricing";
import RateComparison from "../components/RateComparison";
import PricingGuidelines from "../components/PricingGuidelines";
import { listPricingByLocation } from "../api/pricingApi";
import { AdminHeaderNav } from "../admin/components/AdminHeaderNav";

const Pricing = () => {
  const [pricing, setPricing] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [pricingLoading, setPricingLoading] = useState(false);

  const fetchPricing = async (locationId) => {
    if (!locationId) return;

    try {
      setPricingLoading(true);
      const data = await listPricingByLocation(locationId);
      setPricing(Array.isArray(data) ? data : []);
    } catch (error) {
      setPricing([]);
    } finally {
      setPricingLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedLocation) return;

    const load = async () => {
      setPricing([]);
      await fetchPricing(selectedLocation);
    };

    load();
  }, [selectedLocation]);

  return (
    <>
      <AdminHeaderNav />
      <div className="p-7 min-h-screen bg-gradient-to-br from-[#fff4ed] via-[#ffe8d9] to-[#fffaf5]">
        <div className="mb-7">
          <h1 className="text-2xl font-bold">Pricing & Rates</h1>
          <p className="text-gray-600">
            Manage rental rates for different locker sizes
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <LockerPricing
            pricing={pricing}
            refresh={fetchPricing}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            pricingLoading={pricingLoading}
          />

          <RateComparison pricing={pricing} />

          <PricingGuidelines />
        </div>
      </div>
    </>
  );
};

export default Pricing;
