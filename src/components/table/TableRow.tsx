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
  <tr className="hover:bg-[var(--bg-hover)] transition border-b border-subtle ">
    <td className="p-3 text-xs text-primary">{id}</td>
    <td className="p-3 text-xs flex items-center space-x-2">
      <span className="inline-flex items-center bg-surface px-2 py-0.5 rounded text-xs font-medium text-primary">
        <VideocamIcon fontSize="small" className="mr-1 text-secondary" />
        {platform}
      </span>
    </td>
    <td className="p-3 text-xs font-bold text-primary">{length}</td>
    <td className="p-3 text-xs">
      <span className="badge-success px-2 py-0.5 rounded-full font-medium">{status}</span>
    </td>
    <td className="p-3 text-xs text-primary">{date}</td>
    <td className="p-3 text-xs">
      <a href="#" className="flex items-center text-link hover:underline">
        View <KeyboardArrowRight fontSize="small" />
      </a>
    </td>
  </tr>
);

export default TableRow;