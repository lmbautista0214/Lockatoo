import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const PaymentSuccess = () => {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (!bookingId) return;

        if (!bookingId) {
          console.log("No booking found");
          return;
        }

        const res = await fetch(
          import.meta.env.VITE_API_URL + "/api/booking/" + bookingId,
          { credentials: "include" },
        );

        const data = await res.json();
        if (!res.ok) {
<<<<<<< HEAD
          console.error("Failed to fetch booking:", data);
          return;
        }
=======
        console.error("Failed to fetch booking:", data);
        return;
}
        const booking = data;
        console.log("booking data", booking);

if (
        !booking?._id ||
        !booking?.user?.email ||
        !booking?.locationId?.locationName
      ) {
        console.log("Missing required booking fields", booking);
        return;
      };

        setBookingDetails(booking);
        
        const result = await sendBookingEmailApi({
          userEmail: booking.user.email,
          bookingId: booking._id,
          location: booking.locationId?.locationName,
          dropOffTime: new Date(booking.start_datetime).toLocaleString(),
          pickupTime: new Date(booking.end_datetime).toLocaleString(),
          type: "confirmation",
        });

          console.log("Email success:", result);
>>>>>>> 4d83774c6d8cebfb2e7fdb066a8d34acf10a8416

        setBookingDetails(data);
      } catch (err) {
        console.log("Error fetching booking:", err);
      }
    };

    fetchBooking();
  }, [bookingId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Success Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white">
            ✓
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          Payment Successful
        </h1>

        {/* Booking ID */}
        <h2 className="mt-4 text-lg font-semibold text-gray-800">
          Booking ID:{" "}
          <span className="text-orange-600">
            {bookingDetails?._id || "Loading..."}
          </span>
        </h2>

        {/* Details */}
        <p className="mt-3 text-gray-600">
          Your booking has been confirmed at{" "}
          <span className="font-medium text-gray-800">
            {bookingDetails?.locationId?.locationName || "Lockatoo"}
          </span>
          . A confirmation email has been sent to{" "}
          <span className="font-medium text-gray-800">
            {bookingDetails?.user?.email || "your inbox"}
          </span>
          .
        </p>

        {/* CTA */}
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold hover:scale-105 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};
