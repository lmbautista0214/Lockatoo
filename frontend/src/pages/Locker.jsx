import { useState, useEffect, useRef } from "react";
import {
  createLockersApi,
  getLockers,
  updateLockerStatusApi,
  deleteLockerApi,
} from "../api/lockerApi";
import { LockerFilter } from "../components/Lockers/LockerFilter";
import { LockerForm } from "../components/Lockers/LockerForm";
import { LockerGroup } from "../components/Lockers/LockerGroup";

export const Locker = () => {
  const mockStores = ["Pasay", "Makati", "Quezon City"];

  const [lockers, setLockers] = useState({
    xs: 0,
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
    xxl: 0,
  });

  const [storeId, setStoreId] = useState("");
  const [lockerList, setLockerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeLocker, setActiveLocker] = useState(null);

  const dropdownRef = useRef(null);

  const handleStoreChange = (e) => {
    setStoreId(e.target.value);
  };

  useEffect(() => {
    if (!storeId) return;

    const fetchLockers = async () => {
      try {
        const res = await getLockers(storeId);
        setLockerList(res.lockers || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLockers();
  }, [storeId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveLocker(null);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setActiveLocker(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleLockerClick = (locker) => {
    setActiveLocker((prev) => (prev === locker._id ? null : locker._id));
  };

  const handleStatusChange = async (locker, status) => {
    try {
      await updateLockerStatusApi(locker._id, status);

      const updated = await getLockers(storeId);
      setLockerList(updated.lockers || []);

      setActiveLocker(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLocker = async (locker) => {
    const confirmDelete = window.confirm(`Delete ${locker.code}?`);
    if (!confirmDelete) return;

    try {
      await deleteLockerApi(locker._id);

      const updated = await getLockers(storeId);
      setLockerList(updated.lockers || []);

      setActiveLocker(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLockers((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : Number(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storeId) {
      alert("Select a store");
      return;
    }

    try {
      setLoading(true);

      await createLockersApi({ storeId, lockers });

      const updated = await getLockers(storeId);
      setLockerList(updated.lockers || []);

      setLockers({
        xs: 0,
        s: 0,
        m: 0,
        l: 0,
        xl: 0,
        xxl: 0,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const grouped = lockerList.reduce((acc, locker) => {
    if (!acc[locker.size]) acc[locker.size] = [];
    acc[locker.size].push(locker);
    return acc;
  }, {});

  const sizeOrder = ["xs", "s", "m", "l", "xl", "xxl"];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Locker Management</h1>
        <p className="text-sm text-gray-500">
          Manage lockers by store and size
        </p>
      </div>

      {/* Top Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-3">Select Store</h2>
          <LockerFilter
            storeId={storeId}
            handleStoreChange={handleStoreChange}
            stores={mockStores}
          />
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-3">Add Lockers</h2>
          <LockerForm
            handleSubmit={handleSubmit}
            lockers={lockers}
            handleinputChange={handleChange}
            loading={loading}
          />
        </div>
      </div>

      {/* Locker Groups */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Locker Overview</h2>

        <div className="space-y-6">
          {sizeOrder.map((size) => (
            <LockerGroup
              key={size}
              grouped={grouped}
              size={size}
              handleLockerClick={handleLockerClick}
              dropdownRef={dropdownRef}
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
