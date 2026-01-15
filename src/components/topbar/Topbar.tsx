// src/components/topbar/Topbar.tsx
import type { FC } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: FC<TopbarProps> = ({ onMenuClick }) => (
  <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-default topbar-mobile">
    <div className="flex items-center">
      {/* Hamburger menu for mobile */}
      <button
        className="hamburger-btn md-hidden mr-2"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <MenuIcon className="hamburger-icon" />
      </button>

      <nav className="flex items-center space-x-2 text-secondary" aria-label="Breadcrumb">
        <FolderOpenIcon fontSize="small" className="text-muted mobile-hidden" />
        <span className="h-5 border-l border-default mx-2 mobile-hidden"></span>
        <span className="hover:underline cursor-pointer mobile-hidden">Home</span>
        <ChevronRightIcon fontSize="small" className="mobile-hidden" />
        <span className="hover:underline cursor-pointer mobile-hidden">Explorer</span>
        <ChevronRightIcon fontSize="small" className="mobile-hidden" />
        <span className="font-semibold text-primary">Bot</span>
      </nav>
    </div>
  </header>
);

export default Topbar;