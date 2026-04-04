import { LockerCard } from "./LockerCard";

export const LockerGroup = ({
  grouped,
  size,
  handleLockerClick,
  dropdownRef,
  handleStatusChange,
  handleDeleteLocker,
  activeLocker,
}) => {
  const items = grouped[size];
  if (!items?.length) return null;

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center tracking-wide">
        {size.toUpperCase()} Lockers
      </h3>

      <div className="flex justify-center">
        <div
          className="
            grid
            grid-cols-[repeat(auto-fit,minmax(40px,auto))]
            justify-center
            gap-2
            max-w-90
            relative
          "
        >
          {[...items]
            .sort(
              (a, b) =>
                Number(a.code.split("-")[1]) - Number(b.code.split("-")[1]),
            )
            .map((locker) => (
              <LockerCard
                key={locker._id}
                locker={locker}
                handleLockerClick={handleLockerClick}
                // dropdownRef={dropdownRef}
                handleStatusChange={handleStatusChange}
                handleDeleteLocker={handleDeleteLocker}
                activeLocker={activeLocker}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
