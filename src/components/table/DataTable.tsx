// src/components/table/DataTable.tsx
import TableRow from './TableRow';

const data = [
  {
    id: 'b1e26ac8-cfae-4d29-b1fe-1e43b6170c05',
    platform: 'Meet',
    length: '00:01:06',
    status: 'Done',
    date: 'July 10 at 12:46 AM',
  },
  {
    id: 'ab6032c7-0cc6-4090-930e-bfe7bab33097',
    platform: 'Meet',
    length: '00:03:31',
    status: 'Done',
    date: 'July 10 at 12:37 AM',
  },
];

const DataTable = () => (
  <div className="bg-card border border-default rounded-md">
    {/* Table scroll wrapper for mobile */}
    <div className="table-scroll">
      <table className="min-w-full">
        <thead>
          <tr className="bg-header rounded-xl">
            <th className="p-3 text-left text-xs font-semibold text-secondary whitespace-nowrap">ID</th>
            <th className="p-3 text-left text-xs font-semibold text-secondary whitespace-nowrap">Platform</th>
            <th className="p-3 text-left text-xs font-semibold text-secondary whitespace-nowrap">Recording Length</th>
            <th className="p-3 text-left text-xs font-semibold text-secondary whitespace-nowrap">Status</th>
            <th className="p-3 text-left text-xs font-semibold text-secondary whitespace-nowrap">Date</th>
            <th className="p-3 text-left text-xs font-semibold text-secondary whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <TableRow key={row.id} {...row} />
          ))}
        </tbody>
      </table>
    </div>
    {/* Footer */}
    <div className="flex items-center justify-between px-4 py-2 text-xs text-secondary">
      <span>1-2 of 2 results</span>
      <div className="flex space-x-2">
        <button className="border border-default rounded-md px-2 py-1 bg-card text-muted ">
          <span className="sr-only">Previous</span>
          {/* Left arrow */}
          <svg width="20" height="20" fill="none"><path d="M13 7l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button className="border border-default rounded-md px-2 py-1 bg-card text-muted ">
          <span className="sr-only">Next</span>
          {/* Right arrow */}
          <svg width="20" height="20" fill="none"><path d="M7 7l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  </div>
);

export default DataTable;