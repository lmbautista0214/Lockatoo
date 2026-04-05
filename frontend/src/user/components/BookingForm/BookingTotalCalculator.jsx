import { useEffect, useState } from "react";

export const BookingTotalCalculator = ({
  locationId,
  lockerSize,
  startDate,
  endDate,
  billingType,
  onTotalChange,
}) => {
  const [pricingList, setPricingList] = useState([]);
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL +
            `/api/admin/pricing/location/${locationId}`,
        );
        const data = await res.json();
        console.log(data);
        const cleaned = data.filter(
          (price) =>
            price.isActive &&
            (price.pricePerHour !== null || price.pricePerDay !== null),
        );

        setPricingList(cleaned);
      } catch (err) {
        console.error("Pricing fetch failed:", err);
      }
    };

    if (locationId) fetchPricing();
  }, [locationId]);

  useEffect(() => {
    if (!pricingList.length || !lockerSize) return;

    const normalizedSize = lockerSize.toLowerCase();

    const found = pricingList.find(
      (p) => p.lockerSize.toLowerCase() === normalizedSize,
    );

    setSelectedPricing(found || null);
  }, [pricingList, lockerSize]);

  useEffect(() => {
    if (!selectedPricing || !startDate || !endDate || !billingType) {
      onTotalChange?.(0);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffMs = end - start;
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffHours / 24;

    let total = 0;

    if (billingType === "hourly") {
      total = diffHours * (selectedPricing.pricePerHour || 0);
    }

    if (billingType === "daily") {
      const fullDays = Math.ceil(diffDays);
      total = fullDays * (selectedPricing.pricePerDay || 0);
    }

    const roundedTotal = Math.ceil(total);

    setTotal(roundedTotal);
    onTotalChange?.(roundedTotal);
  }, [selectedPricing, startDate, endDate, billingType, onTotalChange]);

  return (
    <div className="flex">
      <h3 className="text-black mr-2 font-bold">Total:</h3>
      <span className="text-black">
        {selectedPricing?.currency || "PHP"} {total}
      </span>
    </div>
  );
};
