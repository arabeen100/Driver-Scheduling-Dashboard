🚖 Driver Scheduling Dashboard

A frontend application for managing driver-route assignments with scheduling per day.

📌 Features

- Add new Drivers

- Add new Routes

- Assign drivers to routes by day of the week

- A driver can:

- Work on multiple routes (but only one per day)

- Work on the same route on different days

- View all assignments in a Dashboard

- Calendar view showing weekly availability of each driver

- Search functionality for drivers and routes

- Responsive design with horizontal scroll for calendar when needed

🛠️ Tech Stack

- React + TypeScript + Vite

- TailwindCSS
 for styling

⚙️ Setup Instructions
1. Clone the repo
git clone https://github.com/arabeen100/Driver-Scheduling-Dashboard
cd Driver-Scheduling-Dashboard

2. Install dependencies
npm install

3. Run locally
npm run dev


App will be available at: http://localhost:5173/

4. Build for production
npm run build
npm run preview

🚀 Deployment

The app is deployed on Vercel:

- Live Demo 👉 https://driver-scheduling-dashboard.vercel.app/

- GitHub Repository 👉 https://github.com/arabeen100/Driver-Scheduling-Dashboard


📂 Project Structure
src/
  ├── components/
  │   ├── CalendarView.tsx
  │   ├── Dashboard.tsx
  │   ├── DriverForm.tsx
  │   └── RouteForm.tsx
  ├── types.ts
  └── App.tsx

✅ Assumptions

- Each driver can only be assigned to one route per day.

- Drivers can work on:

- Multiple routes across different days.

- The same route on different days.

- Data is stored in React local state (no backend).

🏆 Bonus Features Implemented

- Calendar-style view for weekly schedule

- Search/filter functionality for drivers & routes

- Responsive layout with scrollable calendar

📅 Notes

This project was built as part of the DRB Internship – Frontend Task.