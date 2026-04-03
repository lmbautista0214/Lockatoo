import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Locker } from "./pages/Locker";

import Pricing from "./pages/Pricing";
import MockPayment from "./components/MockPayment";
import NearbyLocationsPage from "./pages/FindLockers";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Dashboard } from "./pages/DashBoard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { EditUserDetails } from "./components/EditUserDetails";
import { ChangePassword } from "./components/ChangePassword";
import { UserProfile } from "./components/UserProfile";
import { ProfileSettings } from "./pages/ProfileSettings";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
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

        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment" element={<MockPayment />} />
      </Routes>
    </Router>
  );
}

export default App;
