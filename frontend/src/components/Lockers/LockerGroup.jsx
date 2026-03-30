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
    <div>
      <h3 className="text-md font-semibold text-gray-700 mb-3">
        {size.toUpperCase()} Lockers
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
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
              dropdownRef={dropdownRef}
              handleStatusChange={handleStatusChange}
              handleDeleteLocker={handleDeleteLocker}
              activeLocker={activeLocker}
            />
          ))}
      </div>
    </div>
  );
};
