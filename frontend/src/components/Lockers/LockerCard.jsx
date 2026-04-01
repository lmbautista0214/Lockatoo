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
    <div className="relative flex flex-col items-center">
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleLockerClick(locker);
        }}
        title={locker.code}
        className={`
          w-10 h-10
          rounded-lg flex items-center justify-center
          text-white text-[10px] font-semibold
          ${statusStyles[locker.status]}
          shadow-sm hover:scale-105 active:scale-95 transition
        `}
      >
        {locker.code.split("-")[1]}
      </div>

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
