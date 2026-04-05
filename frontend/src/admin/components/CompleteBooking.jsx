import { useState } from "react";

export const CompleteBooking = ({ bookingId, onSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);


  const updateEndpoint =
    import.meta.env.VITE_API_URL + "/api/booking/edit/" + bookingId;

  const handleCancel = async () => {
    try {
      const response = await fetch(updateEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ bookingStatus: "completed" }),
      });

      const data = await response.json();
      if (onSuccess) onSuccess(bookingId);

      setShowModal(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <button
      className="getstarted-btn bg-orange-100 text-green-900"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Complete booking
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[320px] text-center">
            <h3 className="text-lg font-semibold mb-2">Complete booking</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to complete this booking?
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="getstarted-btn bg-green-100"
              >
                No
              </button>

              <button
                onClick={handleCancel}
                disabled={loading}
                className="getstarted-btn bg-green-500 text-white"
              >
                {loading ? "Completing..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
