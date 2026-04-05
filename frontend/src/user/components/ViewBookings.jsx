import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { CancelBooking } from "./CancelBooking";
// import { HeaderNav } from "../../components/HeaderNav";

export const ViewBookings = () => {
  const listBookingsEndpoint =
    import.meta.env.VITE_API_URL + "/api/booking/view/user";

  const { data, loading, error } = useFetch(listBookingsEndpoint);
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({
    locationId: "",
    bookingStatus: "",
  });

  useEffect(() => {
    if (data && Array.isArray(data.bookings)) {
      setBookings(data.bookings);
    }
  }, [data]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredBookings = bookings.filter((b) => {
    const matchLocation = filters.locationId
      ? b.locationId?._id === filters.locationId
      : true;
    const matchStatus = filters.bookingStatus
      ? b.bookingStatus === filters.bookingStatus
      : true;
    return matchLocation && matchStatus;
  });

  const uniqueLocations = [
    ...new Map(
      bookings
        .filter((b) => b.locationId)
        .map((b) => [b.locationId._id, b.locationId]),
    ).values(),
  ];

  const activeCount = bookings.filter(
    (b) => b.bookingStatus === "reserved",
  ).length;
  const totalCount = bookings.length;

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>Error loading bookings</div>;

  return (
    <div className="block getstarted-section bg-linear-to-b from-[#faf8f7] to-[#FFE5D9] bg-white/10">
      {/* <HeaderNav /> */}
      <h2 className="getstarted-title">Bookings</h2>
      <p>Past and current bookings</p>

      <div className="feature-card my-2">
        <select
          name="locationId"
          value={filters.locationId}
          onChange={handleChange}
          className="border border-[#adb3ba] text-[#1e2a38] p-2 m-2 lg:w-1/4 rounded-2xl mr-6"
        >
          <option value="">Location</option>
          {uniqueLocations.map((loc) => (
            <option key={loc._id} value={loc._id}>
              {loc.locationName || "Unknown"}
            </option>
          ))}
        </select>

        <select
          name="bookingStatus"
          value={filters.bookingStatus}
          onChange={handleChange}
          className="border border-[#adb3ba] text-[#1e2a38] p-2 m-2 lg:w-1/4 rounded-2xl"
        >
          <option value="">Status</option>
          <option value="reserved">Reserved</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="forfeited">Forfeited</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-1 lg:grid-cols-3">
        {filteredBookings.length === 0 ? (
          <p>No bookings match the selected filters.</p>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b._id}
              className="form-card bg-white/60"
            >
              <div className="booking-content"><b>Location:</b> {b.locationId?.locationName || "Unknown"}</div>
              <div className="booking-content"><b>Locker:</b> {b.lockerId?.code || "Unknown"}</div>
              <div className="booking-content capitalize"><b>Status:</b> {b.bookingStatus}</div>
              <div className="booking-content"><b>Start:</b> {new Date(b.start_datetime).toLocaleString()}</div>
              <div className="booking-content"><b>End:</b> {new Date(b.end_datetime).toLocaleString()}</div>

              {b.bookingStatus === "reserved" && (
                <CancelBooking
                  bookingId={b._id}
                  booking={b}
                  onCancelSuccess={(id) => {
                    setBookings((prev) =>
                      prev.map((booking) =>
                        booking._id === id
                          ? { ...booking, bookingStatus: "cancelled" }
                          : booking,
                      ),
                    );
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
