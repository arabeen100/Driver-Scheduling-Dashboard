import { useMemo, useState } from "react";
import type { Driver, Route, Day } from "../types";

const DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  drivers: Driver[];
  routes: Route[];
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>;
}

/**
 * Rules implemented here:
 * - A driver can be assigned to multiple routes across different days.
 * - A driver can only be assigned to ONE route per DAY.
 * - The UI for assigning enforces that (driver options exclude drivers already assigned on that selected day).
 */
export default function Dashboard({ drivers, routes, setRoutes }: Props) {
  const [selectedDayPerRoute, setSelectedDayPerRoute] = useState<Record<string, Day | "">>({});
  const [routeSearch, setRouteSearch] = useState("");
  const [driverSearch, setDriverSearch] = useState("");

  // Helper: check if a driver is already assigned on a day (across all routes)
  const isDriverAssignedOnDay = (driverId: string, day: Day) =>
    routes.some((r) => r.assignments.some((a) => a.driverId === driverId && a.day === day));

  // Assign driver to route for a specific day, enforcing one-per-day rule
  const handleAssign = (routeId: string, driverId: string, day: Day) => {
    if (!day) {
      alert("Please select a day first.");
      return;
    }

    // check if driver already has assignment on that day (on other route)
    if (isDriverAssignedOnDay(driverId, day)) {
      alert("This driver is already assigned to a route on that day.");
      return;
    }

    setRoutes((prev) =>
      prev.map((r) =>
        r.id === routeId
          ? { ...r, assignments: [...r.assignments, { driverId, day }] }
          : r
      )
    );
  };

  // Remove a specific assignment (driver + day) from a route
  const handleRemoveAssignment = (routeId: string, driverId: string, day: Day) => {
    setRoutes((prev) =>
      prev.map((r) =>
        r.id === routeId
          ? { ...r, assignments: r.assignments.filter((a) => !(a.driverId === driverId && a.day === day)) }
          : r
      )
    );
  };

  // For display: compute drivers filtered
  const filteredDrivers = useMemo(
    () => drivers.filter((d) => d.name.toLowerCase().includes(driverSearch.toLowerCase())),
    [drivers, driverSearch]
  );

  const filteredRoutes = useMemo(
    () => routes.filter((r) => r.name.toLowerCase().includes(routeSearch.toLowerCase())),
    [routes, routeSearch]
  );

  return (
    <div className="p-4 border rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Routes panel */}
        <div>
          <div className="flex items-center justify-between mb-3 gap-3">
            <h3 className="text-lg font-bold">Routes</h3>
            <input
              value={routeSearch}
              onChange={(e) => setRouteSearch(e.target.value)}
              placeholder="Search routes..."
              className="border rounded p-2 text-sm"
            />
          </div>

          <ul className="space-y-4">
            {filteredRoutes.length === 0 && <li className="text-sm text-gray-500">No routes found</li>}
            {filteredRoutes.map((route) => (
              <li key={route.id} className="p-3 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{route.name}</div>
                  <div className="text-sm text-gray-600">{route.assignments.length} assignment(s)</div>
                </div>

                <div className="space-y-2">
                  {/* existing assignments for route */}
                  {route.assignments.length === 0 && <div className="text-sm text-red-600">Unassigned</div>}
                  {route.assignments.map((a) => {
                    const driver = drivers.find((d) => d.id === a.driverId);
                    return (
                      <div key={`${a.driverId}_${a.day}`} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                        <div>
                          <div className="font-medium">{driver?.name}</div>
                          <div className="text-sm text-gray-600">{a.day}</div>
                        </div>
                        <button
                          onClick={() => handleRemoveAssignment(route.id, a.driverId, a.day)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}

                  {/* assign area: choose day then driver */}
                  <div className="flex gap-2 mt-2">
                    <select
                      value={selectedDayPerRoute[route.id] ?? ""}
                      onChange={(e) => setSelectedDayPerRoute((s) => ({ ...s, [route.id]: e.target.value as Day }))}
                      className="w-1/2 border rounded p-2"
                    >
                      <option value="">Select day</option>
                      {DAYS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>

                    <select
                      onChange={(e) => {
                        const driverId = e.target.value;
                        const day = selectedDayPerRoute[route.id];
                        if (!driverId) return;
                        if (!day) {
                          alert("Please select a day first.");
                          e.currentTarget.value = "";
                          return;
                        }
                        handleAssign(route.id, driverId, day);
                        // reset driver select
                        e.currentTarget.value = "";
                      }}
                      className="w-1/2 border rounded p-2"
                      defaultValue=""
                    >
                      <option value="">+ Assign driver</option>
                      {drivers
                        .filter((d) => {
                          const day = selectedDayPerRoute[route.id];
                          if (!day) return true; // if no day selected show them (but the handler will require day)
                          // show drivers not already assigned on that day (across all routes)
                          return !isDriverAssignedOnDay(d.id, day);
                        })
                        .map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Drivers panel */}
        <div>
          <div className="flex items-center justify-between mb-3 gap-3">
            <h3 className="text-lg font-bold">Drivers</h3>
            <input
              value={driverSearch}
              onChange={(e) => setDriverSearch(e.target.value)}
              placeholder="Search drivers..."
              className="border rounded p-2 text-sm"
            />
          </div>

          <ul className="space-y-2">
            {filteredDrivers.length === 0 && <li className="text-sm text-gray-500">No drivers found</li>}
            {filteredDrivers.map((d) => {
              // compute days assigned for this driver across routes
              const daysAssigned = routes.flatMap((r) => r.assignments.filter((a) => a.driverId === d.id).map((a) => a.day));
              return (
                <li key={d.id} className="p-2 border rounded flex justify-between items-center">
                  <div>
                    <div className="font-medium">{d.name}</div>
                    <div className="text-sm text-gray-600">{daysAssigned.length ? daysAssigned.join(", ") : "Available"} </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
