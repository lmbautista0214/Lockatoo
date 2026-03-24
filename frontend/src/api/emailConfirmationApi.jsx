const sendEmailConfirmationApi = async (bookingData) => {

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/w1/api/booking/email-confirmation`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        }
    );

    if (!response.ok) {
        throw new Error("Failed to send email");
    }

    return response.json();
};

export default sendEmailConfirmationApi;