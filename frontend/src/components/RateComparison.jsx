import React from "react";

const RateComparison = ({ pricing }) => {

  console.log("DEBUG PRICING:", pricing);

  const safePricing = Array.isArray(pricing)
    ? pricing
    : pricing?.data || [];

  const formatValue = (value) => {
    return value === null || value === undefined ? "-" : value;
  };

  return (
    <>
      <h3>Rate Comparison</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Size</th>
            <th>Hourly</th>
            <th>Daily</th>
            <th>Weekly</th>
            <th>Monthly</th>
            <th>Extra Hour</th>
          </tr>
        </thead>

        <tbody>
          {safePricing.length === 0 ? (
            <tr>
              <td colSpan="6">No pricing available</td>
            </tr>
          ) : (
            safePricing.map((p, index) => (
              <tr key={p._id || index}>
                <td>{p.lockerSize}</td>
                <td>{formatValue(p.pricePerHour)}</td>
                <td>{formatValue(p.pricePerDay)}</td>
                <td>{formatValue(p.pricePerWeek)}</td>
                <td>{formatValue(p.pricePerMonth)}</td>
                <td>{formatValue(p.extraHourFee)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default RateComparison;