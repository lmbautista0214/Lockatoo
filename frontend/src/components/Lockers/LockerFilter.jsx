export const LockerFilter = ({ storeId, handleStoreChange, stores }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-500 tracking-wide">
        Store Location
      </label>

      <select
        value={storeId}
        onChange={handleStoreChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white/90 backdrop-blur shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
      >
        <option value="">Select Store</option>
        {stores.map((store) => (
          <option key={store} value={store}>
            {store}
          </option>
        ))}
      </select>
    </div>
  );
};
