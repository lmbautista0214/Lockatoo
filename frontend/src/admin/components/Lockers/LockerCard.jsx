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
          rounded-xl flex items-center justify-center
          text-white text-[10px] font-semibold
          ${statusStyles[locker.status]}
          shadow-md hover:shadow-lg hover:scale-105 active:scale-95 
          transition-all duration-200 cursor-pointer
        `}
      >
        {locker.code.split("-")[1]}
      </div>

      {activeLocker === locker._id && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            locker-dropdown
            absolute top-full mt-2
            left-1/2 -translate-x-1/2
            w-44
            bg-white text-gray-700 
            rounded-2xl shadow-xl border border-gray-100 
            p-2
            z-9999
          "
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
              className="
                flex justify-between items-center px-3 py-2 text-sm 
                rounded-xl hover:bg-gray-50 cursor-pointer 
                transition-all
              "
            >
              {s.label}
              <span className={`text-xs ${s.color}`}>●</span>
            </div>
          ))}

          <div className="my-1 border-t border-gray-100" />

          <div
            onClick={() => handleDeleteLocker(locker)}
            className="
              px-3 py-2 text-sm rounded-xl 
              hover:bg-red-50 text-red-500 font-semibold 
              cursor-pointer transition-all
            "
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};
