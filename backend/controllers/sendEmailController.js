import resend from "../configs/emailConfig.js";
import getEmailContent from "../templates/emailTemplate.js";

const sendEmailController = async (req, res) => {
  try {
    const {
      type,
      userEmail,
      bookingId,
      location,
      dropOffTime,
      pickupTime
    } = req.body;

    if (!type || !userEmail || !bookingId || !location) {
      return res.status(400).json({
        message: "Incomplete booking data"
      });
    };

    if (!["confirmation", "cancelled"].includes(type)) {
      return res.status(400).json({
        message: "Invalid email type"
      });
    };

    const { subject, html } = getEmailContent(type, {
      bookingId,
      location,
      dropOffTime,
      pickupTime
    });

    await resend.emails.send({
      from: "BagDrop <onboarding@resend.dev>",
      to: userEmail,
      subject,
      html
    });

    res.status(200).json({
      message: `${type} email sent successfully`,
      bookingId
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);

    res.status(500).json({
      message: error.message || "Email failed to send"
    });
  }
};

export default sendEmailController;