const API_URL = import.meta.env.VITE_API_URL;

const sendBookingEmailApi = async (bookingData) => {
      console.log("Sending email payload:", bookingData);
    const response = await fetch(
        `${API_URL}/api/booking/email`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(bookingData)
        }
    );

    if (!response.ok) throw new Error("Failed to send email");

    return response.json();
};

export default sendBookingEmailApi;