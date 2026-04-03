import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const Payment = ({ amount, bookingId, locationId }) => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const backendURL = import.meta.env.VITE_API_URL + "/api/payment";
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const initialState = {
  locationId: locationId,
  lockerSize: "",
  lockerId: "",
  start_datetime: "",
  end_datetime: "",
  billingType: "",
  total: "",
  }
  const [formData, setFormData] = useState(initialState);

  const handleCreate = async () => {
    try {
      const response = await fetch(`${backendURL}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ amount }),
      });

      const result = await response.json();
      console.log("Create order response:", result);

      if (!response.ok) {
        console.error(
          "Create order failed",
          result,
        );
        throw new Error("Failed to create a new order");
      }

      return result.id;
    } catch (error) {
      console.error("Error creating order", error);
    }
  };

  const handleApprove = async (data) => {
    const cleanAmount = Number(amount).toFixed(2);
    const response = await fetch(`${backendURL}/capture-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: data.orderID,
        bookingId,
        amount: cleanAmount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Capture error:", errorData);
      throw new Error(errorData.error || "Failed to pay!");
    }

    const result = await response.json();

    if (result.success) {
      setIsSuccess(true);
      setFormData(initialState);
    }
    console.log(result);
  };

  const handleError = (msg) => {
    console.error(msg);
    setIsSuccess(false);
    {
      isSuccess && <div>Payment failed</div>;
    }
  };

  useEffect(() => {
    if (isSuccess) {
    navigate(`/bookings/payment-success/${bookingId}`);
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      <h1>Payment gateway</h1>

      <PayPalScriptProvider
        options={{ "client-id": clientId, currency: "PHP" }}
      >
        <PayPalButtons
          createOrder={handleCreate}
          onApprove={handleApprove}
          onError={handleError}
        />
      </PayPalScriptProvider>
    </div>
  );
};
