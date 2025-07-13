// src/components/topbar/Topbar.tsx
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Topbar = () => (
  <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
    <nav className="flex items-center space-x-2 text-gray-500" aria-label="Breadcrumb">
      <FolderOpenIcon fontSize="small" className="text-gray-400" />
      <span className="h-5 border-l border-gray-300 mx-2"></span>
      <span className="hover:underline cursor-pointer">Home</span>
      <ChevronRightIcon fontSize="small" />
      <span className="hover:underline cursor-pointer">Explorer</span>
      <ChevronRightIcon fontSize="small" />
      <span className="font-semibold text-gray-900">Bot</span>
    </nav>
  </header>
);

export default Topbar;