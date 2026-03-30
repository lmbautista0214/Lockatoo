export const LockerCard = ({
  locker,
  handleLockerClick,
  dropdownRef,
  handleStatusChange,
  handleDeleteLocker,
  activeLocker,
}) => {
  const statusStyles = {
    available: "bg-green-500",
    occupied: "bg-red-500",
    reserved: "bg-orange-500",
    out_of_service: "bg-gray-400",
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleLockerClick(locker);
      }}
      className={`relative cursor-pointer h-20 flex flex-col items-center justify-center rounded-2xl font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:scale-95 ${
        statusStyles[locker.status]
      }`}
    >
      <span className="text-sm tracking-wide">{locker.code}</span>

      <span className="text-[10px] opacity-80 capitalize">
        {locker.status.replace("_", " ")}
      </span>

      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10"></div>

      {activeLocker === locker._id && (
        <div
          ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-full mt-2 bg-white text-gray-700 rounded-xl shadow-xl border p-2 z-20 w-40"
        >
          {[
            { label: "Available", value: "available", color: "text-green-600" },
            { label: "Occupied", value: "occupied", color: "text-red-500" },
            { label: "Reserved", value: "reserved", color: "text-orange-500" },
            {
              label: "Out of Service",
              value: "out_of_service",
              color: "text-gray-500",
            },
          ].map((s) => (
            <div
              key={s.value}
              onClick={() => handleStatusChange(locker, s.value)}
              className="flex justify-between items-center px-3 py-2 text-sm rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
              {s.label}
              <span className={`text-xs ${s.color}`}>●</span>
            </div>
          ))}

          <div className="my-1 border-t" />

          <div
            onClick={() => handleDeleteLocker(locker)}
            className="px-3 py-2 text-sm rounded-lg hover:bg-red-100 text-red-500 font-semibold cursor-pointer transition"
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};
