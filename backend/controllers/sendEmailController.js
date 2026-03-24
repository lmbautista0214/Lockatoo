import resend from "../configs/emailConfig.js";
import { emailBody, emailSubject } from "../templates/emailTemplate.js";

const sendEmail = async (data) => {
    
    return resend.emails.send({
        from: "BagDrop <onboarding@resend.dev>",
        to: data.userEmail,
        subject: emailSubject,
        html: emailBody(data)
    })

};

const sendEmailController = async (req, res) => {
    try {

        //object keys not yet finalized
        const {
            userEmail,
            bookingId,
            location,
            dropOffTime,
            pickupTime
        } = req.body;

        if (!userEmail || !bookingId || !location || !dropOffTime || !pickupTime) {
            return res.status(400).json({
                message: "Incomplete booking data"
            });
        }

        //object keys not yet finalized
        await sendEmail({
            userEmail,
            bookingId,
            location,
            dropOffTime,
            pickupTime
        });

        res.status(200).json({
            message: "Email sent successfully",
            bookingId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Email failed to send"
        });
    }
};

export default sendEmailController;