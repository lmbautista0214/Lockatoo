//mock component for testing purpose only

import sendBookingEmailApi from "../api/emailApi";

const MockPayment = () => {

    const mockBooking = {
        userEmail: "albien.joy@gmail.com",
        bookingId: "BD-1001",
        location: "NAIA Terminal 3",
        dropOffTime: "10:00 AM",
        pickupTime: "06:00 PM"
    };

    return (
        <div>
            <h1>Mock Payment</h1>

            <button onClick={() => sendBookingEmailApi({
                ...mockBooking,
                type: "confirmation"
            })}>
                Confirm Payment
            </button>

            <button onClick={() => sendBookingEmailApi({
                ...mockBooking,
                type: "cancelled"
            })}>
                Cancel Booking
            </button>
        </div>
    );
};

export default MockPayment;