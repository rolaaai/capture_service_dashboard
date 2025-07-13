// src/components/table/DataTable.tsx
import TableRow from './TableRow';
import { KeyboardArrowRight } from '@mui/icons-material';

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
  <div className="bg-white border border-gray-200 rounded-md  ">
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-100 rounded-xl">
          <th className="p-3 text-left text-xs font-semibold text-gray-500">ID</th>
          <th className="p-3 text-left text-xs font-semibold text-gray-500">Platform</th>
          <th className="p-3 text-left text-xs font-semibold text-gray-500">Recording Length</th>
          <th className="p-3 text-left text-xs font-semibold text-gray-500">Status</th>
          <th className="p-3 text-left text-xs font-semibold text-gray-500">Date</th>
          <th className="p-3 text-left text-xs font-semibold text-gray-500">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <TableRow key={row.id} {...row} />
        ))}
      </tbody>
    </table>
    {/* Footer */}
    <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500">
      <span>1-2 of 2 results</span>
      <div className="flex space-x-2">
        <button className="border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-400 ">
          <span className="sr-only">Previous</span>
          {/* Left arrow */}
          <svg width="20" height="20" fill="none"><path d="M13 7l-3 3 3 3" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-400 ">
          <span className="sr-only">Next</span>
          {/* Right arrow */}
          <svg width="20" height="20" fill="none"><path d="M7 7l3 3-3 3" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  </div>
);

export default DataTable;