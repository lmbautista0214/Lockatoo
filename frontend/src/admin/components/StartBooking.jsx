import { useState } from "react";

export const StartBooking = ({ bookingId, onSuccess }) => {
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
        body: JSON.stringify({ bookingStatus: "active" }),
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
      className="getstarted-btn bg-blue-50 text-blue-950"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Start booking
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[320px] text-center">
            <h3 className="text-lg font-semibold mb-2">Start booking</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to start this booking?
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="px-3 py-1 border rounded hover:bg-gray-100" 
              >
                No
              </button>

              <button
                onClick={handleCancel}
                disabled={loading}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {loading ? "Starting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
