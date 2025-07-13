// src/components/table/TableRow.tsx
import type { FC } from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import { KeyboardArrowRight } from '@mui/icons-material';

interface TableRowProps {
  id: string;
  platform: string;
  length: string;
  status: string;
  date: string;
}

const TableRow: FC<TableRowProps> = ({ id, platform, length, status, date }) => (
  <tr className="hover:bg-gray-50 transition border-b border-b-gray-100 ">
    <td className="p-3 text-xs text-gray-700">{id}</td>
    <td className="p-3 text-xs flex items-center space-x-2">
      <span className="inline-flex items-center bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-700">
        <VideocamIcon fontSize="small" className="mr-1 text-gray-500" />
        {platform}
      </span>
    </td>
    <td className="p-3 text-xs font-bold text-gray-800">{length}</td>
    <td className="p-3 text-xs">
      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{status}</span>
    </td>
    <td className="p-3 text-xs text-gray-700">{date}</td>
    <td className="p-3 text-xs">
      <a href="#" className="flex items-center text-blue-600 hover:underline">
        View <KeyboardArrowRight fontSize="small" />
      </a>
    </td>
  </tr>
);

export default TableRow;