// src/pages/dashboard/Dashboard.tsx

import Filter from "../../components/filters/Filter";
import Sidebar from "../../components/sidebar/Sidebar";
import DataTable from "../../components/table/DataTable";
import Topbar from "../../components/topbar/Topbar";


const Dashboard = () => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Topbar />
      <main className="p-6 bg-gray-50 flex-1 flex flex-col gap-2 ">
        <Filter />
        <DataTable />
        {/* Add pagination here */}
      </main>
    </div>
  </div>
);

export default Dashboard;