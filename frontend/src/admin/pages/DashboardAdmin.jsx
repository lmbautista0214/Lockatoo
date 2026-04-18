import { useEffect, useState } from "react";
import { getLockerStatusStats } from "../../api/lockerApi";
import { fetchAdminStats } from "../../api/locationApi";
import {
  getDashboardStats,
  getRecentBookings,
  getBookingsByLocation,
} from "../../api/bookingApi";
import { getDashboardStatsPayment } from "../../api/paymentApi";

import AdminHeaderNav from "../components/AdminHeaderNav";

export const DashboardAdmin = () => {
  const [activeLocations, setActiveLocations] = useState(0);
  const [availableLockers, setAvailableLockers] = useState(0);
  const [stats, setStats] = useState(null);
  const [lockerStatus, setLockerStatus] = useState({
    available: 0,
    occupied: 0,
    maintenance: 0,
    reserved: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [locationStats, setLocationStats] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchAdminStats();
        setActiveLocations(data.activeLocations);
        setAvailableLockers(data.availableLockers);
      } catch (err) {
        console.error(err);
      }
    };
    loadStats();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [bookingStats, paymentStats] = await Promise.all([
          getDashboardStats(),
          getDashboardStatsPayment(),
        ]);

        setStats({
          ...bookingStats,
          ...paymentStats,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchLockerStatus = async () => {
      try {
        const data = await getLockerStatusStats();
        setLockerStatus(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLockerStatus();
  }, []);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await getRecentBookings();
        setRecentBookings(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecent();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookingsByLocation();
        setLocationStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const bookingStatusColor = {
    reserved: "bg-[#165dfc]",
    active: "bg-yellow-500",
    completed: "bg-[#00a83d]",
    cancelled: "bg-[#f2501e]",
    forfeited: "bg-[#980dfa]",
  };

  const paymentStatusColor = {
    pending: "text-gray-500",
    completed: "text-[#00a83d]",
    failed: "text-[#f2501e]",
  };

  const lockerSizeLabels = {
    xs: "Extra Small",
    s: "Small",
    m: "Medium",
    l: "Large",
    xl: "Extra Large",
    xxl: "Double XL",
  };

  return (
    <>
      <AdminHeaderNav />

      <main className="p-7 min-h-screen bg-linear-to-r from-[#fff4ed] to-[#ffe3d3]">
        <section className="mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">
            Overview of your locker management system
          </p>
        </section>

        <section className="flex flex-col gap-7">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
              <p className="text-gray-600 text-s">Total Active Locations</p>
              <p className="text-3xl font-bold text-[#ff7e5f]">
                {activeLocations}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
              <p className="text-gray-600 text-s">Total Available Lockers</p>
              <p className="text-3xl font-bold text-[#ff7e5f]">
                {availableLockers}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
              <p className="text-gray-600 text-s">Total Active Bookings</p>
              <h1 className="text-3xl font-bold text-[#ff7e5f]">
                {stats?.activeBookings ?? 0}
              </h1>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <section className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
              <h6 className="font-bold mb-2">Locker Status Overview</h6>
              <div className="flex flex-col gap-3">
                {Object.entries(lockerStatus).map(([key, val]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key}</span>
                    <span className="font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
              <h6 className="font-bold mb-2">Location Performance</h6>
              {locationStats.map((loc) => {
                const max = Math.max(...locationStats.map((l) => l.count), 1);
                const percent = (loc.count / max) * 100;

                return (
                  <div key={loc.locationId}>
                    <div className="flex justify-between">
                      <span>{loc.locationName}</span>
                      <span>{loc.count}</span>
                    </div>
                    <div className="bg-gray-200 h-2 rounded">
                      <div
                        className="bg-orange-500 h-2 rounded"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </section>
          </div>

          <section className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
            <h6 className="font-bold mb-2">Recent Bookings</h6>

            {recentBookings.map((b) => (
              <div key={b._id} className="border p-3 rounded mb-2">
                <p>{b.locationId?.locationName}</p>
                <p>
                  {b.lockerId?.code} (
                  {lockerSizeLabels[b.lockerSize] || b.lockerSize})
                </p>
                <p>{b.bookingStatus}</p>
                <p>₱ {b.payment?.amount ?? 0}</p>
              </div>
            ))}
          </section>
        </section>
      </main>
    </>
  );
};
