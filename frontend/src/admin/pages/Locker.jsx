import { useState, useEffect, useRef } from "react";
import {
  createLockersApi,
  getLockers,
  updateLockerStatusApi,
  deleteLockerApi,
} from "../../api/lockerApi";
import { LockerFilter } from "../components/Lockers/LockerFilter";
import { LockerForm } from "../components/Lockers/LockerForm";
import { LockerGroup } from "../components/Lockers/LockerGroup";
import { LockerLegend } from "../components/Lockers/LockerLegend";

import toast from "react-hot-toast";

export const Locker = () => {
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [lockers, setLockers] = useState({
    xs: 0,
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
    xxl: 0,
  });
  const [lockerList, setLockerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeLocker, setActiveLocker] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dropdownRef = useRef(null);

  const handleStoreChange = (e) => {
    setLocationId(e.target.value);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/locations`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const data = await res.json();
        setLocations(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (!locationId) return;

    const fetchLockers = async () => {
      try {
        const res = await getLockers(locationId);
        setLockerList(res.lockers || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLockers();
  }, [locationId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".locker-dropdown")) {
        setActiveLocker(null);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setActiveLocker(null);
        setShowModal(false);
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
      const updated = await getLockers(locationId);
      setLockerList(updated.lockers || []);
      setActiveLocker(null);

      toast.success(`${locker.code} → ${status}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const handleDeleteLocker = async (locker) => {
    const confirmDelete = window.confirm(`Delete ${locker.code}?`);
    if (!confirmDelete) return;

    try {
      await deleteLockerApi(locker._id);
      const updated = await getLockers(locationId);
      setLockerList(updated.lockers || []);
      setActiveLocker(null);
      toast.success(`${locker.code} deleted`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete locker");
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

    if (!locationId) {
      alert("Select a location");
      return;
    }

    try {
      setLoading(true);

      await createLockersApi({ locationId, lockers });

      const updated = await getLockers(locationId);
      setLockerList(updated.lockers || []);

      setLockers({
        xs: 0,
        s: 0,
        m: 0,
        l: 0,
        xl: 0,
        xxl: 0,
      });

      setShowModal(false);

      toast.success("Lockers added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add lockers");
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
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Locker Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage lockers by store and size
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-2xl shadow-sm border">
          <LockerFilter
            storeId={locationId}
            handleStoreChange={handleStoreChange}
            stores={locations}
          />

          <button
            onClick={() => setShowModal(true)}
            className="btn-main w-full sm:w-auto"
          >
            + Add Locker
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border overflow-visible">
          <h2 className="text-base sm:text-lg font-semibold mb-4">
            Locker Overview
          </h2>

          <LockerLegend />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-visible">
            {sizeOrder
              .filter((size) => grouped[size]?.length > 0)
              .map((size) => (
                <div
                  key={size}
                  className="bg-gray-50 rounded-xl p-2 border overflow-visible relative"
                >
                  <LockerGroup
                    grouped={grouped}
                    size={size}
                    handleLockerClick={handleLockerClick}
                    dropdownRef={dropdownRef}
                    handleStatusChange={handleStatusChange}
                    handleDeleteLocker={handleDeleteLocker}
                    activeLocker={activeLocker}
                  />
                </div>
              ))}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md mx-4">
              <h2 className="text-lg font-semibold mb-4">Add Lockers</h2>

              <LockerForm
                handleSubmit={handleSubmit}
                lockers={lockers}
                handleinputChange={handleChange}
                loading={loading}
              />

              <button
                onClick={() => setShowModal(false)}
                className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
