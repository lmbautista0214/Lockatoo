const API_URL = import.meta.env.VITE_API_URL;

const sendBookingEmailApi = async (bookingData) => {
    const response = await fetch(
        `${API_URL}/w1/api/booking/email`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        }
    );

    if (!response.ok) throw new Error("Failed to send email");

    return response.json();
};

export default sendBookingEmailApi;