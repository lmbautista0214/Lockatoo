const emailSubject = "Booking Confirmation";

//object key not yet finalized
const emailBody = (booking) => {
  return `
    <h1>Your booking has been successfully confirmed!</h1>

    <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
    <p><strong>Location:</strong> ${booking.location}</p>
    <p><strong>Drop-off time:</strong> ${booking.dropOffTime}</p>
    <p><strong>Pickup time:</strong> ${booking.pickupTime}</p>

    <p>Thank you for using BagDrop!</p>
  `;
};

export { emailBody, emailSubject };