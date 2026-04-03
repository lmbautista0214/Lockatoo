import { useEffect, useState } from "react";
import { useParams } from "react-router";
import sendBookingEmailApi from "../../../api/emailApi";

export const PaymentSuccess = () => {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState([]);

  console.log("bookingId", bookingId);
  
  useEffect(() => {
    const sendEmail = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL + "/api/booking/" + bookingId,
          {
            credentials: "include",
          },
        );

        const data = await res.json();
        
        const booking = data;
        console.log("booking data", booking);

        if (!booking) return;

        setBookingDetails(booking);
        console.log("bookingdetails", bookingDetails)
        await sendBookingEmailApi({
          userEmail: booking.user?.email,
          bookingId: booking._id,
          location: booking.locationId?.locationName,
          dropOffTime: new Date(booking.start_datetime).toLocaleString(),
          pickupTime: new Date(booking.end_datetime).toLocaleString(),
          type: "confirmation",
        });
      } catch (err) {
        console.log(err);
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
