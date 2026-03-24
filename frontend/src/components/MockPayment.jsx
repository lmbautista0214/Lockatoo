//mock component for testing purpose only

import sendEmailConfirmationApi from "../api/emailConfirmationApi";

const MockPayment = () => {

    const mockBooking = {
        userEmail: "shimarilyn@gmail.com",
        bookingId: "BD-1001",
        location: "NAIA Terminal 3",
        dropOffTime: "10:00 AM",
        pickupTime: "06:00 PM"
    };

    const handleSendConfirmationEmail = async () => {
        try {

            const result = await sendEmailConfirmationApi(mockBooking);

            console.log("Email sent:", result);

        } catch (error) {
            console.error("Email failed:", error);
        }
    };

    return (
        <div>
            <h1>Mock Payment</h1>

            <button onClick={handleSendConfirmationEmail}>
                Confirm Payment
            </button>
        </div>
    );
};

export default MockPayment;