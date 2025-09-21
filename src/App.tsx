import { useState } from "react";
import DriverForm from "./components/DriverForm";
import RouteForm from "./components/RouteForm";
import Dashboard from "./components/Dashboard";
import CalendarView from "./components/CalendarView";
import type { Driver, Route } from "./types";

function App() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Driver Scheduling Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DriverForm onAdd={(d) => setDrivers((p) => [...p, d])} />
        <RouteForm onAdd={(r) => setRoutes((p) => [...p, r])} />
      </div>

      <Dashboard drivers={drivers} setDrivers={setDrivers} routes={routes} setRoutes={setRoutes} />

      <CalendarView drivers={drivers} routes={routes} />
    </div>
  );
}

export default App;
