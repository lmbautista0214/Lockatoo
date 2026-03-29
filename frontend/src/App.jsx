import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import MockPayment from "./components/MockPayment";
import NearbyLocationsPage from "./pages/FindLockers";

function App() {
  return (
    <>
      <Register />
      <Login />
      <MockPayment />

      <NearbyLocationsPage />
    </>
  );
}

export default App;
