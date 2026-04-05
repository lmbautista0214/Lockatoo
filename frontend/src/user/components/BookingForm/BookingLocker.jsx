import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { useState, useEffect } from "react";

export const BookingLocker = ({ lockers, formData, setFormData }) => {
  const lockerSizes = ["xs", "s", "m", "l", "xl", "xxl"];

  const safeLockers = Array.isArray(lockers) ? lockers : [];

  const filteredLockers = formData.lockerSize
    ? safeLockers.filter((locker) => locker.size === formData.lockerSize)
    : safeLockers;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-1">
        <select
          name="lockerSize"
          value={formData.lockerSize}
          onChange={handleChange}
          className="m-2 form-input"
        >
          <option value="">Select locker size</option>
          {lockerSizes.map((size) => (
            <option key={size} value={size}>
              {size.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          name="lockerId"
          value={formData.lockerId}
          onChange={handleChange}
          className="m-2 form-input"
        >
          <option value="">Select locker</option>

          {filteredLockers.length === 0 ? (
            <option disabled>No available lockers</option>
          ) : (
            filteredLockers.map((locker) => (
              <option key={locker._id} value={locker._id}>
                {locker.code}
              </option>
            ))
          )}
        </select>
      </div>
    </>
  );
};
