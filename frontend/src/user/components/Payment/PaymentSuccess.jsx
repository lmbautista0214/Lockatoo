import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const PaymentSuccess = () => {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState([]);

  console.log("bookingId", bookingId);
  
  useEffect(() => {
    const sendEmail = async () => {
      try {
        if (!bookingId) {
          console.log("No booking found");
          return;
        }

        const res = await fetch(
          import.meta.env.VITE_API_URL + "/api/booking/" + bookingId,
          {
            credentials: "include",
          },
        );

        const data = await res.json();

        if (!res.ok) {
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

      } catch (err) {
        console.log("Error in sendEmail:", err);
      }
    };

    sendEmail();
  }, [bookingId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Payment successful!</h1>
      <h2>Booking ID: {bookingDetails?._id || "Loading..."} </h2>
      <p className="mt-2 text-gray-600">
        Your booking has been confirmed. Please check your inbox for the
        confirmation email.
      </p>
    </div>
  );
};
