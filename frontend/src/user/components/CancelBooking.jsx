import { useState } from "react";
import sendBookingEmailApi from "../../api/emailApi";

export const CancelBooking = ({ bookingId, booking, onCancelSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const userDetails = {
    userEmail: booking?.user?.email,
    bookingId: booking._id,
    location: booking.locationId?.locationName,
    dropOffTime: new Date(booking.start_datetime).toLocaleString(),
    pickupTime: new Date(booking.end_datetime).toLocaleString(),
  };

  const updateEndpoint =
    import.meta.env.VITE_API_URL + "/api/booking/edit/" + bookingId;

  const handleCancel = async () => {
    try {
      const response = await fetch(updateEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ bookingStatus: "cancelled" }),
      });

      const data = await response.json();
      if (onCancelSuccess) onCancelSuccess(bookingId);

      setShowModal(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <button
      className="getstarted-btn bg-orange-100 text-orange-900"
        onClick={() => {
          setShowModal(true);
          sendBookingEmailApi({
            ...userDetails,
            type: "cancelled",
          });
        }}
      >
        Cancel booking
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[320px] text-center">
            <h3 className="text-lg font-semibold mb-2">Cancel booking</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to cancel this booking?
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="getstarted-btn bg-orange-100"
              >
                No
              </button>

              <button
                onClick={handleCancel}
                disabled={loading}
                className="getstarted-btn bg-orange-500 text-white"
              >
                {loading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
