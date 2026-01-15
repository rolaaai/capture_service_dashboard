// src/pages/dashboard/Dashboard.tsx

import { useState } from "react";
import Filter from "../../components/filters/Filter";
import Sidebar from "../../components/sidebar/Sidebar";
import DataTable from "../../components/table/DataTable";
import Topbar from "../../components/topbar/Topbar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay md-hidden ${sidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
      />

      {/* Sidebar - responsive */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={toggleSidebar} />
        <main className="p-6 bg-page flex-1 flex flex-col gap-2 main-mobile overflow-auto">
          <Filter />
          <DataTable />
          {/* Add pagination here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;