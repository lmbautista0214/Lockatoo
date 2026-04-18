import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { CancelBooking } from "../../user/components/CancelBooking";
import { CompleteBooking } from "../components/CompleteBooking";
import { StartBooking } from "../components/StartBooking";
import AdminHeaderNav from "../components/AdminHeaderNav";

export const AdminViewBookings = () => {
  const listBookingsEndpoint =
    import.meta.env.VITE_API_URL + "/api/booking/view";

  const { data, loading, error } = useFetch(listBookingsEndpoint);
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({
    locationId: "",
    bookingStatus: "",
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      setBookings(data);
    }
  }, [data]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredBookings = bookings.filter((b) => {
    console.log("bookings", bookings);
    const matchLocation = filters.locationId
      ? b.locationId?._id.toString() === filters.locationId
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

  const reservedCount = bookings.filter(
    (b) => b.bookingStatus === "reserved",
  ).length;
  const activeCount = bookings.filter(
    (b) => b.bookingStatus === "active",
  ).length;
  const totalCount = bookings.length;

  const statusStyles = {
    active: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
    reserved: "bg-yellow-100 text-yellow-700",
    paid: "bg-orange-100 text-orange-700",
  };

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>Error loading bookings</div>;

  return (
    <>
      <AdminHeaderNav />
      <div className="block getstarted-section bg-linear-to-b from-[#faf8f7] to-[#FFE5D9] bg-white/10">
        <h2 className="getstarted-title my-2 mt-4">Manage transactions</h2>

        <div className="flex">
          <div className="feature-card my-2 mr-2 w-2/3 sm:w-100">
            <p className="how-title text-xl">
              Active bookings:{" "}
              <span className="text-green-700">{activeCount}</span>
            </p>
          </div>

          <div className="feature-card my-2 mr-2 w-2/3 sm:w-100">
            <p className="how-title text-xl">
              Reserved bookings:{" "}
              <span className="text-yellow-700">{reservedCount}</span>
            </p>
          </div>

          <div className="feature-card my-2 mr-2 w-2/3 sm:w-100">
            <p className="how-title text-xl">
              {" "}
              Total bookings:{" "}
              <span className="text-violet-700">{totalCount}</span>
            </p>
          </div>
        </div>

        <div className="feature-card my-2">
          <select
            name="locationId"
            value={filters.locationId}
            onChange={handleChange}
            className="border border-[#adb3ba] text-[#1e2a38] p-2 m-2 lg:w-1/4 rounded-2xl mr-6"
          >
            <option value="">All locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc._id} value={loc._id.toString()}>
                {loc.locationName || "Unknown"}
              </option>
            ))}
          </select>

          <select
            name="bookingStatus"
            value={filters.bookingStatus}
            onChange={handleChange}
            className="border border-[#adb3ba] text-[#1e2a38] p-2 m-2 lg:w-1/4 rounded-2xl mr-6"
          >
            <option value="">All Status</option>
            <option value="reserved">Reserved</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="forfeited">Forfeited</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 lg:grid-cols-3">
          {filteredBookings.length === 0 ? (
            <p>No bookings match the selected filters.</p>
          ) : (
            filteredBookings.map((b) => (
              <div key={b._id} className="form-card bg-white/60">
                <div className="flex items-end gap-3">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusStyles[b.bookingStatus] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {b.bookingStatus}
                  </div>
                </div>
                <div className="booking-content">
                  <b>Location:</b> {b.locationId?.locationName || "Unknown"}
                </div>
                <div className="booking-content">
                  <b>Locker:</b> {b.lockerId?.code || "Unknown"}
                </div>
                <div className="booking-content">
                  <b>Start:</b> {new Date(b.start_datetime).toLocaleString()}
                </div>
                <div className="booking-content">
                  <b>End:</b> {new Date(b.end_datetime).toLocaleString()}
                </div>

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

                {b.bookingStatus === "active" && (
                  <CompleteBooking
                    bookingId={b._id}
                    booking={b}
                    onSuccess={(id) => {
                      setBookings((prev) =>
                        prev.map((booking) =>
                          booking._id === id
                            ? { ...booking, bookingStatus: "completed" }
                            : booking,
                        ),
                      );
                    }}
                  />
                )}

                {b.bookingStatus === "reserved" && (
                  <StartBooking
                    bookingId={b._id}
                    booking={b}
                    onSuccess={(id) => {
                      setBookings((prev) =>
                        prev.map((booking) =>
                          booking._id === id
                            ? { ...booking, bookingStatus: "active" }
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
    </>
  );
};
