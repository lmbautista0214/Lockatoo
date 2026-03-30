export const LockerForm = ({
  handleSubmit,
  lockers,
  handleinputChange,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(lockers).map((size) => (
          <div key={size} className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 tracking-wide">
              {size.toUpperCase()}
            </label>

            <input
              type="number"
              name={size}
              value={lockers[size] === 0 ? "" : lockers[size]}
              onChange={handleinputChange}
              min="0"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white/90 backdrop-blur shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold py-2.5 rounded-xl shadow-sm transition-all duration-150"
      >
        {loading ? "Adding..." : "Add Lockers"}
      </button>
    </form>
  );
};
