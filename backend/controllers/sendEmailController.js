import resend from "../configs/emailConfig.js";
import getEmailContent from "../templates/emailTemplate.js";

export const sendBookingEmail = async (type, booking, userEmail) => {
  const { subject, html } = getEmailContent(type, {
    bookingId: booking._id,
    location: booking.locationId?.locationName,
    lockerCode: booking.lockerId?.code,
    dropOffTime: booking.start_datetime,
    pickupTime: booking.end_datetime
  });

  await resend.emails.send({
    from: "Lockatoo <onboarding@resend.dev>",
    to: userEmail,
    subject,
    html
  });
};