export const LockerForm = ({
  handleSubmit,
  lockers,
  handleinputChange,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {Object.keys(lockers).map((size) => (
          <div key={size} className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">
              {size.toUpperCase()}
            </label>

            <input
              type="number"
              name={size}
              value={lockers[size] === 0 ? "" : lockers[size]}
              onChange={handleinputChange}
              min="0"
              max="30"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition"
      >
        {loading ? "Adding..." : "Add Lockers"}
      </button>
    </form>
  );
};
