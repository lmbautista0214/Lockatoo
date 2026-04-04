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
          <div key={size} className="form-group">
            <label className="form-label text-xs">{size.toUpperCase()}</label>

            <input
              type="number"
              name={size}
              value={lockers[size] === 0 ? "" : lockers[size]}
              onChange={handleinputChange}
              min="0"
              max="30"
              className="form-input text-sm"
            />
          </div>
        ))}
      </div>

      <button type="submit" disabled={loading} className="btn-main w-full">
        {loading ? "Adding..." : "Add Lockers"}
      </button>
    </form>
  );
};
