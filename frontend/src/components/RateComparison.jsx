import React from "react";

const RateComparison = ({ pricing }) => {

  const safePricing = Array.isArray(pricing)
    ? pricing
    : pricing?.data || [];

  const formatValue = (value) => {
    return value === null || value === undefined ? "-" : value;
  };

  const sizeStyles = {
    small: "bg-blue-100 text-blue-600",
    medium: "bg-purple-100 text-purple-600",
    large: "bg-orange-100 text-orange-600",
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
      
      {/* Header */}
      <h3 className="text-lg font-bold">Rate Comparison</h3>
      <p className="text-gray-500 mb-6">
        Compare pricing across locker sizes
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          
          {/* Head */}
          <thead>
            <tr className="text-m border-b border-orange-100">
              <th className="py-3 font-semibold">Size</th>
              <th className="py-3 font-semibold">Hourly</th>
              <th className="py-3 font-semibold">Daily</th>
              <th className="py-3 font-semibold">Weekly</th>
              <th className="py-3 font-semibold">Monthly</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {safePricing.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No pricing available
                </td>
              </tr>
            ) : (
              safePricing.map((p, index) => (
                <tr
                  key={p._id || index}
                  className="border-b border-orange-100"
                >
                  {/* Size Pill */}
                  <td className="py-4">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${
                        sizeStyles[p.lockerSize] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {p.lockerSize}
                    </span>
                  </td>

                  {/* Prices */}
                  <td className="py-4 font-semibold">
                    {formatValue(p.pricePerHour)}
                  </td>
                  <td className="py-4 font-semibold">
                    {formatValue(p.pricePerDay)}
                  </td>
                  <td className="py-4 font-semibold">
                    {formatValue(p.pricePerWeek)}
                  </td>
                  <td className="py-4 font-semibold">
                    {formatValue(p.pricePerMonth)}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
    </>
  );
};

export default RateComparison;