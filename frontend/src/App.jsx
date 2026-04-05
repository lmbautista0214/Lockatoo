import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Locker } from "./admin/pages/Locker";
import { Toaster } from "react-hot-toast";

import Pricing from "./pages/Pricing";
import MockPayment from "./components/MockPayment";
import NearbyLocationsPage from "./pages/FindLockers";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Dashboard } from "./user/pages/DashBoard";
import { DashboardAdmin } from "./admin/pages/DashBoard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserProfile } from "./components/UserProfile";
import { ProfileSettings } from "./pages/ProfileSettings";
import { PaymentSuccess } from "./user/components/Payment/PaymentSuccess";
import { AdminViewBookings } from "./admin/pages/AdminViewBookings";
import { BookingForm } from "./user/components/BookingForm/BookingForm";
import { ViewBookings } from "./user/components/ViewBookings";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lockers" element={<Locker />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/find-lockers"
          element={
            <ProtectedRoute>
              <NearbyLocationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile-settings"
          element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings/:id"
          element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings/view"
          element={
            <ProtectedRoute>
              <ViewBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings/payment-success/:bookingId"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />

        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment" element={<MockPayment />} />
      </Routes>
    </Router>
  );
}

export default App;
