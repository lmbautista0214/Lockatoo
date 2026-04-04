export const LockerLegend = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 text-xs sm:text-sm bg-gray-50 p-3 rounded-xl border">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded bg-green-500"></span>
        <span className="text-gray-600">Available</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded bg-orange-500"></span>
        <span className="text-gray-600">Reserved</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded bg-red-500"></span>
        <span className="text-gray-600">Occupied</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded bg-gray-400"></span>
        <span className="text-gray-600">Out of Service</span>
      </div>
    </div>
  );
};
