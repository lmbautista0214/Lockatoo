import { useEffect, useState } from "react";
import { HeaderNav } from "../components/HeaderNav";
import { getCurrentUser } from "../api/userApi";
import { fetchBookingStats, fetchActiveBookingsList } from "../api/bookingApi";
import { getLocations } from "../api/locationApi";
import { fetchAvailableLockersCount } from "../api/lockerApi";

const lockerSizeLabels = {
  xs: "Extra Small",
  s: "Small",
  m: "Medium",
  l: "Large",
  xl: "Extra Large",
  xxl: "Double Extra Large",
};

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeBookings, setActiveBookings] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [ready, setReady] = useState(false);
  const [activeBookingsList, setActiveBookingsList] = useState([]);
  const [locationCount, setLocationCount] = useState(0);
  const [availableLockers, setAvailableLockers] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
        setReady(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const stats = await fetchBookingStats();

      setActiveBookings(stats.active);
      setTotalBookings(stats.total);
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const bookings = await fetchActiveBookingsList();
      setActiveBookingsList(bookings);
    };

    loadData();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locations = await getLocations();
        setLocationCount(locations.length);
      } catch (err) {
        console.error("Error fetching locations:", err);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const loadLockers = async () => {
      const count = await fetchAvailableLockersCount();
      setAvailableLockers(count);
    };

    loadLockers();
  }, []);

  return (
    <>
      <HeaderNav />
      <main className="p-7 min-h-screen bg-gradient-to-r from-[#FFF8EF] to-[#FFE5D9]">
        {/* Welcome Message*/}
        <section className="mb-6">
          <h1 className="text-2xl font-bold">
            Welcome{user ? `, ${user.name}` : ""} 👋
          </h1>

          <p className="text-gray-600">
            Manage your locker bookings and account
          </p>
        </section>

        <section className="flex flex-col gap-7">

          {/* Dashboard */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
                <p className="text-gray-600 text-s">
                  Active Bookings
                </p>
                <p className="text-3xl font-bold text-[#165dfc]">{activeBookings}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
                <p className="text-gray-600 text-s">
                  Total Bookings
                </p>
                <p className="text-3xl font-bold text-[#00a83d]">{totalBookings}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
                <p className="text-gray-600 text-s">
                  Locations
                </p>
                <h1 className="text-3xl font-bold text-[#980dfa]">{locationCount}</h1>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
                <p className="text-gray-600 text-s">
                  Available Lockers
                </p>
                <p className="text-3xl font-bold text-[#f2501e]">{availableLockers}</p>
            </div>
            
          </section>

          {/* Quick Actions */}
          <section className="bg-white p-6 rounded-2xl border border-[#ffeddf]">

            <div className="pb-5">
              <h6 className="text-s font-bold">
                Quick Actions
              </h6>

              <p className="text-gray-600">
                Common tasks to get you started
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 bg-[#fffbf5] border border-[#ffeddf] p-2 rounded-2xl hover:bg-[#ffe5d9] transition duration-200 cursor-pointer">
                <h2 className="text-s font-semibold text-center">
                  Find Lockers
                </h2>
              </div>

              <div className="flex-1 bg-[#fffbf5] border border-[#ffeddf] p-2 rounded-2xl hover:bg-[#ffe5d9] transition duration-200 cursor-pointer">
                <h2 className="text-s font-semibold text-center">
                  My Bookings
                </h2>
              </div>

              <div className="flex-1 bg-[#fffbf5] border border-[#ffeddf] p-2 rounded-2xl hover:bg-[#ffe5d9] transition duration-200 cursor-pointer">
                <h2 className="text-s font-semibold text-center">
                  Booking History
                </h2>
              </div>
            </div>

          </section>

          {/* Active Bookings */}
          <section className="bg-white p-6 rounded-2xl border border-[#ffeddf]">

            <div className="pb-5">
              <h6 className="text-s font-bold">
                Active Bookings
              </h6>

              <p className="text-gray-600">
                Your current locker reservations
              </p>
            </div>

            {activeBookingsList.length === 0 ? (
              <p className="text-gray-500">No active bookings yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {activeBookingsList.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex justify-between items-center bg-white border border-[#ffeddf] rounded-2xl p-4"
                  >
                    {/* LEFT */}
                    <div>
                      <h2 className="font-semibold text-lg">
                        {booking.locationId?.locationName || "Location"}
                      </h2>

                      <p className="text-gray-600 text-sm">
                        Locker: {booking.lockerId?.code || "N/A"} (
                        {lockerSizeLabels[booking.lockerSize] || booking.lockerSize})
                      </p>

                      <p className="text-gray-500 text-sm">
                        {new Date(booking.start_datetime).toLocaleString("en-PH", {
                          month: "numeric",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(booking.end_datetime).toLocaleString("en-PH", {
                          month: "numeric",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="text-right">
                      <p className="text-[#165dfc] font-bold text-lg">
                        ${booking.payment?.amount || 0}
                      </p>

                      <p className="text-[#00a83d] text-sm">
                        {booking.paymentStatus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
          </section>

        </section>

        

      </main>
    </>
  );
};
