import { useState, useEffect } from "react";
import { Payment } from "../Payment/Payment";
import { useNavigate, useParams } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, setSeconds } from "date-fns";
import { BookingDates } from "./BookingDates";
import { BookingLocker } from "./BookingLocker";
import { BookingTotalCalculator } from "./BookingTotalCalculator";
import { useCallback } from "react";

export const BookingForm = () => {
  //store ID param -- update while routing
  // const {id} = useParams();
  //sample ID for testing -- delete when routing, retain useParams above
  const id = "69cc981b31e1ba903529acdc";

  const billingTypes = [
    { label: "Per hour", value: "hourly" },
    { label: "Per day", value: "daily" },
  ];

  const reservationEndpoint = import.meta.env.VITE_API_URL + "/api/booking/reserve";
  const [formData, setFormData] = useState({
  locationId: id,
  lockerSize: "",
  lockerId: "",
  start_datetime: "",
  end_datetime: "",
  billingType: "",
  total: "",
  });

  const [bookingId, setBookingId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hasSelectedStart, setHasSelectedStart] = useState(false);
  const [error, setError] = useState({
    startDate: "",
    endDate: "",
    billing: "",
  });

  const [lockers, setLockers] = useState([]);
  const locationId = id;
  const [totalAmount, setTotalAmount] = useState(0);

  const checkAvailability = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/booking/check-availability",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lockerId: formData.lockerId,
            start_datetime: startDate.toISOString(),
            end_datetime: endDate.toISOString(),
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to check availability");
      }
      return data.available;
    } catch (err) {
      console.log({ error: err.message });
    }
  };

  const handleTotalChange = useCallback((total) => {
    setTotalAmount(total);
  }, []);

  const fetchAvailableLockers = async () => {
    if (!locationId || !startDate || !endDate) return;

    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + "/api/lockers/available",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            locationId,
            start_datetime: startDate?.toISOString(),
            end_datetime: endDate?.toISOString(),
          }),
        },
      );

      if (!res.ok) {
        console.error("API error");
        setLockers([]);
        return;
      }

      const data = await res.json();
      setLockers(data.lockers || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchAvailableLockers();
    }
  }, [startDate, endDate, locationId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let newErrors = {
      startDate: "",
      endDate: "",
    };

    let hasError = false;

    const isAvailable = await checkAvailability();

    if (!isAvailable) {
      newErrors.availability = "This locker is already booked for that time.";
      hasError = true;
    };

    if (formData.billingType === "daily" && startDate && endDate) {
      const sameDay = startDate.toDateString() === endDate.toDateString();

      if (sameDay) {
        newErrors.billing = "End date must be a different day.";
        hasError = true;
      }
    }

    if (!startDate || !hasSelectedStart) {
      newErrors.startDate = "Please select a start date and time";
      hasError = true;
    }

    if (!endDate) {
      newErrors.endDate = "Please select an end date and time";
      hasError = true;
    }

    if (endDate <= startDate) {
      newErrors.endDate = "End date must be after start date";
      hasError = true;
    }

    setError(newErrors);
    if (hasError) return;

    try {
      const payload = {
        ...formData,
        total: totalAmount,
        start_datetime: startDate.toISOString(),
        end_datetime: endDate.toISOString(),
      };

      const response = await fetch(reservationEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server error:", data);
        return;
      }

      console.log("success!", data);
      setBookingId(data._id);
      setFormData({ ...formData, status: "reserved" });
    } catch (error) {
      console.log("error!", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div>
              <BookingDates
                label={"Select the start date:"}
                name="start_datetime"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setHasSelectedStart(true);
                  setError((prev) => ({ ...prev, startDate: "" }));
                }}
                minDate={new Date()}
                minTime={
                  startDate
                    ? setHours(setMinutes(new Date(startDate), 0), 9)
                    : setHours(setMinutes(new Date(), 0), 9)
                }
                maxTime={setHours(setMinutes(new Date(), 0), 22)}
              />

              {error.startDate && (
                <div style={{ color: "red", fontSize: "0.9rem" }}>
                  {error.startDate}
                </div>
              )}
            </div>

            <div>
              <BookingDates
                label={"Select the end date:"}
                name="end_datetime"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate}
                minTime={
                  startDate
                    ? setHours(setMinutes(new Date(startDate), 0), 9)
                    : setHours(setMinutes(new Date(), 0), 9)
                }
                maxTime={setHours(setMinutes(new Date(), 0), 22)}
              />
              {error.endDate && (
                <div style={{ color: "red", fontSize: "0.9rem" }}>
                  {error.endDate}
                </div>
              )}
            </div>

            <BookingLocker
              lockers={lockers}
              formData={formData}
              setFormData={setFormData}
            />

            <div>
              <p>Billing rate</p>
              {billingTypes.map((type) => (
                <label key={type.value}>
                  <input
                    type="radio"
                    name="billingType"
                    value={type.value}
                    checked={formData.billingType === type.value}
                    onChange={handleChange}
                  />
                  {type.label}
                </label>
              ))}
            </div>

            {error.billing && (
              <div style={{ color: "red", fontSize: "0.9rem" }}>
                {error.billing}
              </div>
            )}

            <BookingTotalCalculator
              locationId={formData.locationId}
              lockerSize={formData.lockerSize}
              billingType={formData.billingType}
              startDate={startDate}
              endDate={endDate}
              onTotalChange={handleTotalChange}
            />

            {bookingId && totalAmount > 0 && (
              <Payment amount={totalAmount} bookingId={bookingId} locationId={id} />
            )}
          </div>

          {error.availability && (
            <div style={{ color: "red", fontSize: "0.9rem" }}>
              {error.availability}
            </div>
          )}
          <button>Confirm</button>
        </form>
      </div>
    </>
  );
};
