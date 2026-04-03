import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { CancelBooking } from "./CancelBooking";
import { HeaderNav } from "../../components/HeaderNav";

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
    <div>
      <HeaderNav />
      <h2>Transaction History</h2>

      <div>
        <p>Active bookings: {activeCount}</p>
        <p>Total bookings made: {totalCount}</p>
      </div>

      {/* Filters */}
      <div>
        <h3>Filters</h3>
        <select
          name="locationId"
          value={filters.locationId}
          onChange={handleChange}
        >
          <option value="">All Locations</option>
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
          style={{ marginLeft: "10px" }}
        >
          <option value="">All Status</option>
          <option value="reserved">Reserved</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="forfeited">Forfeited</option>
        </select>
      </div>

      <div>
        {filteredBookings.length === 0 ? (
          <p>No bookings match the selected filters.</p>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <div>Location: {b.locationId?.locationName || "Unknown"}</div>
              <div>Locker: {b.lockerId?.code || "Unknown"}</div>
              <div>Status: {b.bookingStatus}</div>
              <div>Start: {new Date(b.start_datetime).toLocaleString()}</div>
              <div>End: {new Date(b.end_datetime).toLocaleString()}</div>

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
