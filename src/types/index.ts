export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface Driver {
  id: string;
  name: string;
}

export interface Assignment {
  driverId: string;
  day: Day;
}

export interface Route {
  id: string;
  name: string;
  assignments: Assignment[];
}
