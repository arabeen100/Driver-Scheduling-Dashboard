import type { Driver, Route, Day } from "../types";

const DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  drivers: Driver[];
  routes: Route[];
}

/**
 * Calendar table:
 * - fixed wrapper with horizontal overflow auto when content is larger
 * - table has min-w to force horizontal scroll on small containers
 */
export default function CalendarView({ drivers, routes }: Props) {
  // For each driver and day, find whether he has an assignment and optionally which routes
  const cellContent = (driverId: string, day: Day) => {
    // find all routes where this driver is assigned on that day
    const assignedRoutes = routes.filter((r) => r.assignments.some((a) => a.driverId === driverId && a.day === day));
    if (assignedRoutes.length === 0) return null;
    // return small list of route names (could be 1 or more)
    return assignedRoutes.map((r) => r.name).join(", ");
  };

  return (
    <div className="p-4 border rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Calendar View</h2>

      {/* wrapper that scrolls horizontally if table wider than container */}
      <div className="overflow-x-auto">
        {/* make table min width so it can overflow on small screens */}
        <table className="min-w-[720px] w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2 text-left">Driver</th>
              {DAYS.map((d) => (
                <th key={d} className="border px-3 py-2 text-center">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td className="border px-3 py-2 font-medium">{driver.name}</td>
                {DAYS.map((day) => {
                  const content = cellContent(driver.id, day);
                  return (
                    <td
                      key={day}
                      className={`border px-3 py-2 text-center ${content ? "bg-green-100 text-green-800" : "bg-white text-gray-600"}`}
                    >
                      {content ? (
                        <div className="text-sm">
                          <div className="font-medium">Assigned</div>
                          <div className="text-xs text-gray-700">{content}</div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400">Free</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
