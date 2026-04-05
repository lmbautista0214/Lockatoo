import resend from "../configs/emailConfig.js";
import getEmailContent from "../templates/emailTemplate.js";

export const sendBookingEmail = async (type, booking, userEmail) => {
  const { subject, html } = getEmailContent(type, {
    bookingId: booking._id,
    location: booking.locationId?.locationName,
    dropOffTime: booking.dropOffTime,
    pickupTime: booking.pickupTime
  });

  await resend.emails.send({
    from: "BagDrop <onboarding@resend.dev>",
    to: userEmail,
    subject,
    html
  });
};