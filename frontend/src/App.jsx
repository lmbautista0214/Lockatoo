import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Locker } from "./pages/Locker";
import MockPayment from "./components/MockPayment";
import NearbyLocationsPage from "./pages/FindLockers";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Dashboard } from "./pages/DashBoard";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lockers" element={<Locker />} />
        <Route path="/find-lockers" element={<NearbyLocationsPage />} />
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

        {/* Placeholders for teammates */}
        <Route
          path="/bookings"
          element={<div>Bookings Page (coming soon)</div>}
        />
        <Route
          path="/history"
          element={<div>History Page (coming soon)</div>}
        />
        <Route
          path="/profile"
          element={<div>Profile Page (coming soon)</div>}
        />
        <Route
          path="/settings"
          element={<div>Settings Page (coming soon)</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
