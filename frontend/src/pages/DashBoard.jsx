import { useState } from "react";
import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";

export const Dashboard = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Header onToggleNav={() => setNavOpen(!navOpen)} navOpen={navOpen} />
      <NavBar isOpen={navOpen} />
      <main className="p-4">{/* Dashboard content */}</main>
    </>
  );
};
