const getEmailContent = (type, booking) => {
const baseStyle = `
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen;
    background-color: #FFF8EF;
    background-image: linear-gradient(to right, #FFF8EF, #FFE5D9);
    padding: 24px;
  `;

  const containerStyle = `
    max-width: 520px;
    margin: auto;
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  `;

  const titleStyle = `
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #111827;
  `;

  const labelStyle = `
    color: #6b7280;
    font-size: 13px;
  `;

  const valueStyle = `
    font-weight: 500;
    color: #111827;
    font-size: 14px;
  `;

  const rowStyle = `
    margin-bottom: 12px;
  `;

  const divider = `
    border-top: 1px solid #e5e7eb;
    margin: 16px 0;
  `;

  const footerStyle = `
    font-size: 12px;
    color: #9ca3af;
    margin-top: 20px;
    text-align: center;
  `;

  const formatTime = (time) => {
    if (!time) return "N/A";
    return new Date(time).toLocaleString("en-PH", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (type === "confirmation") {
    return {
      subject: "Booking Confirmed",
      html: `
        <div style="${baseStyle}">
          <div style="${containerStyle}">
            
            <div style="${titleStyle}">
              ✅ Booking Confirmed
            </div>

            <p style="font-size:14px; color:#374151;">
              Your booking has been successfully confirmed. Here are the details:
            </p>

            <div style="${divider}"></div>

            <div style="${rowStyle}">
              <div style="${labelStyle}">Booking ID</div>
              <div style="${valueStyle}">${booking.bookingId}</div>
            </div>

            <div style="${rowStyle}">
              <div style="${labelStyle}">Location</div>
              <div style="${valueStyle}">${booking.location}</div>
            </div>

            <div style="${rowStyle}">
              <div style="${labelStyle}">Locker Code</div>
              <div style="${valueStyle}">
                ${booking.lockerCode || "N/A"}
              </div>
            </div>

            <div style="${rowStyle}">
              <div style="${labelStyle}">Drop-off Time</div>
              <div style="${valueStyle}">
                ${formatTime(booking.dropOffTime)}
              </div>
            </div>

            <div style="${rowStyle}">
              <div style="${labelStyle}">Pickup Time</div>
              <div style="${valueStyle}">
                ${formatTime(booking.pickupTime)}
              </div>
            </div>

            <div style="${divider}"></div>

            <p style="font-size:14px; color:#374151;">
              Thank you for using <strong>Lockatoo</strong>. We look forward to serving you!
            </p>

            <div style="${footerStyle}">
              Need help? Contact our support anytime.
            </div>

          </div>
        </div>
      `
    };
  }

  if (type === "cancelled") {
    return {
      subject: "Booking Cancelled",
      html: `
        <div style="${baseStyle}">
          <div style="${containerStyle}">
            
            <div style="${titleStyle}">
              ❌ Booking Cancelled
            </div>

            <p style="font-size:14px; color:#374151;">
              Your booking has been cancelled. Here are the details:
            </p>

            <div style="${divider}"></div>

            <div style="${rowStyle}">
              <div style="${labelStyle}">Booking ID</div>
              <div style="${valueStyle}">${booking.bookingId}</div>
            </div>

            <div style="${rowStyle}">
              <div style="${labelStyle}">Location</div>
              <div style="${valueStyle}">${booking.location}</div>
            </div>

            <div style="${rowStyle}">
              <div style="${labelStyle}">Locker Code</div>
              <div style="${valueStyle}">
                ${booking.lockerCode || "N/A"}
              </div>
            </div>

            <div style="${divider}"></div>

            <p style="font-size:14px; color:#374151;">
              If this wasn't intended, please contact our support team.
            </p>

            <div style="${footerStyle}">
              We hope to serve you again soon.
            </div>

          </div>
        </div>
      `
    };
  }

  return {
    subject: "Booking Update",
    html: `
      <div style="${baseStyle}">
        <div style="${containerStyle}">
          <div style="${titleStyle}">
            ℹ️ Booking Update
          </div>
          <p style="font-size:14px; color:#374151;">
            There was an update to your booking.
          </p>
        </div>
      </div>
    `
  };
};

export default getEmailContent;