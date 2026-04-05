import { useEffect, useState } from "react";
import { HeaderNav } from "../../components/HeaderNav";
import { getLockerStatusStats } from "../../api/lockerApi";
import { fetchAdminStats } from "../../api/locationApi";
import { getDashboardStats, getRecentBookings, getBookingsByLocation } from "../../api/bookingApi";
import { getDashboardStatsPayment } from "../../api/paymentApi";

export const DashboardAdmin = () => {

    const [activeLocations, setActiveLocations] = useState(0);
    const [availableLockers, setAvailableLockers] = useState(0);
    const [stats, setStats] = useState(null);
    const [lockerStatus, setLockerStatus] = useState({
        available: 0,
        occupied: 0,
        maintenance: 0,
        reserved: 0
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
        const data = await getBookingsByLocation();
        setLocationStats(data);
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
      <HeaderNav />
      <main className="p-7 min-h-screen bg-gradient-to-r from-[#f9f3ff] to-[#e7d6ff]">
        {/* Welcome Message*/}
        <section className="mb-6">
          <h1 className="text-2xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-600">
            Overview of your locker management system
          </p>
        </section>

        <section className="flex flex-col gap-7">

          {/* Dashboard */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
                <p className="text-gray-600 text-s">
                  Total Active Locations
                </p>
                <p className="text-3xl font-bold text-[#165dfc]">{activeLocations}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
                <p className="text-gray-600 text-s">
                  Total Available Lockers
                </p>
                <p className="text-3xl font-bold text-[#00a83d]">{availableLockers}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
                <p className="text-gray-600 text-s">
                  Total Active Bookings
                </p>
                <h1 className="text-3xl font-bold text-[#980dfa]">{stats?.activeBookings ?? 0}</h1>
            </div>

            {/* <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
                <p className="text-gray-600 text-s">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-[#f2501e]">₱ {(stats?.totalRevenue ?? 0).toLocaleString()}</p>
            </div>
             */}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Locker Status Overview */}
            <section className="bg-white p-6 rounded-2xl border border-[#ffeddf]">

                <div className="pb-5">
                <h6 className="text-s font-bold">
                    Locker Status Overview
                </h6>

                <p className="text-gray-600">
                    Current status of all lockers
                </p>
                </div>

                <div className="flex flex-col gap-4">

                {/* Available */}
                <div className="flex justify-between items-center border border-[#ffeddf] rounded-2xl p-4">
                <div className="flex items-center gap-3">
                    <span className="w-4 h-4 bg-[#00a83d] rounded-full"></span>
                    <span className="font-medium">Available</span>
                </div>
                <span className="text-2xl font-bold text-[#00a83d]">
                    {lockerStatus.available}
                </span>
                </div>

                {/* Occupied */}
                <div className="flex justify-between items-center border border-[#ffeddf] rounded-2xl p-4">
                <div className="flex items-center gap-3">
                    <span className="w-4 h-4 bg-[#f2501e] rounded-full"></span>
                        <span className="font-medium">Occupied</span>
                </div>
                <span className="text-2xl font-bold text-[#f2501e]">
                        {lockerStatus.occupied}
                </span>
                </div>

                {/* Maintenance */}
                <div className="flex justify-between items-center border border-[#ffeddf] rounded-2xl p-4">
                <div className="flex items-center gap-3">
                    <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
                    <span className="font-medium">Maintenance</span>
                </div>
                <span className="text-2xl font-bold text-yellow-500">
                    {lockerStatus.maintenance}
                </span>
                </div>

                {/* Reserved */}
                <div className="flex justify-between items-center border border-[#ffeddf] rounded-2xl p-4">
                <div className="flex items-center gap-3">
                    <span className="w-4 h-4 bg-[#165dfc] rounded-full"></span>
                    <span className="font-medium">Reserved</span>
                </div>
                <span className="text-2xl font-bold text-[#165dfc]">
                    {lockerStatus.reserved}
                </span>
                </div>

    </div>

            </section>
            
            {/* Location Performance */}
            <section className="bg-white p-6 rounded-2xl border border-[#ffeddf]">

                <div className="pb-5">
                <h6 className="text-s font-bold">
                    Location Performance
                </h6>

                <p className="text-gray-600">
                    Bookings by location
                </p>
                </div>

                <div className="flex flex-col gap-4">
                {locationStats.map((loc) => {
                    const max = Math.max(...locationStats.map((l) => l.count), 1);
                    const percent = (loc.count / max) * 100;

                    return (
                    <div key={loc.locationId}>
                        <div className="flex justify-between">
                        <span className="font-semibold">{loc.locationName}</span>
                        <span>{loc.count}</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                        <div
                            className="bg-[#5b3df5] h-3 rounded-full"
                            style={{ width: `${percent}%` }}
                        ></div>
                        </div>
                    </div>
                    );
                })}
                </div>

            </section>
          </div>

          {/* Recent Bookings */}
          <section className="bg-white p-6 rounded-2xl border border-[#ffeddf]">

            <div className="pb-5">
              <h6 className="text-s font-bold">
                Recent Bookings
              </h6>

              <p className="text-gray-600">
                Latest locker reservations
              </p>
            </div>

            <div className="flex flex-col gap-4">

            {recentBookings.length === 0 ? (
            <p className="text-gray-500">No recent bookings</p>
            ) : (
            recentBookings.map((b) => (
                <div
                key={b._id}
                className="flex justify-between items-center border border-[#ffeddf] rounded-2xl p-4"
                >
                {/* LEFT */}
                <div>
                    <div className="flex items-center gap-3">
                    <h2 className="font-semibold text-lg">
                        {b.locationId?.locationName}
                    </h2>

                    <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                        bookingStatusColor[b.bookingStatus] || "bg-gray-400"
                        }`}
                    >
                        {b.bookingStatus}
                    </span>
                    </div>

                    <p className="text-gray-600 text-sm">
                        Locker: {b.lockerId?.code || "N/A"} (
                        {lockerSizeLabels[b.lockerSize] || b.lockerSize})
                    </p>

                    <p className="text-gray-600">
                    {new Date(b.start_datetime).toLocaleString("en-PH")}{" to "}
                    {new Date(b.end_datetime).toLocaleString("en-PH")}
                    </p>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                    <p className="text-[#165dfc] font-bold text-lg">
                    ₱ {(b.payment?.amount ?? 0).toLocaleString()}
                    </p>
                    <p
                    className={`text-sm ${
                        paymentStatusColor[b.paymentStatus] || "text-gray-500"
                    }`}
                    >
                    {b.paymentStatus}
                    </p>
                </div>
                </div>
            ))
            )}

        </div>
            
          </section>

        </section>

        

      </main>
    </>
  );
};