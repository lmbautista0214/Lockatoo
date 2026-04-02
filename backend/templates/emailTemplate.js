const getEmailContent = (type, booking) => {
  if (type === "confirmation") {
    return {
      subject: "Booking Confirmation",
      html: `
        <h1>Your booking has been successfully confirmed!</h1>

        <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
        <p><strong>Location:</strong> ${booking.location}</p>
        <p><strong>Drop-off time:</strong> ${booking.dropOffTime || "N/A"}</p>
        <p><strong>Pickup time:</strong> ${booking.pickupTime || "N/A"}</p>

        <p>Thank you for using BagDrop!</p>
      `
    };
  }

  if (type === "cancelled") {
    return {
      subject: "Booking Cancelled",
      html: `
        <h1>Your booking has been cancelled</h1>

        <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
        <p><strong>Location:</strong> ${booking.location}</p>

        <p>If this was not intended, please contact support.</p>
        <p>We hope to serve you again soon.</p>
      `
    };
  }

  return {
    subject: "Booking Update",
    html: `<p>There was an update to your booking.</p>`
  };
};

export default getEmailContent;