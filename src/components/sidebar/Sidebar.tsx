// src/components/sidebar/Sidebar.tsx
import type { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SidebarData from './SidebarData';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => (
  <aside
    className={`w-64 h-screen bg-card border-r border-default flex flex-col sidebar-mobile md:static md:transform-none ${isOpen ? 'open' : ''}`}
  >
    {/* Mobile close button */}
    <button
      className="sidebar-close-btn md-hidden"
      onClick={onClose}
      aria-label="Close sidebar"
    >
      <CloseIcon fontSize="small" className="text-secondary" />
    </button>

    <div className="p-4 font-bold text-xl flex items-center space-x-2">
      <span>Rolaa.ai</span>
      <span className="text-xs text-secondary ml-2">us-west-2</span>
    </div>
    <nav className="flex-1 overflow-y-auto px-2 sidebar-scroll">
      {SidebarData.map((section, idx) => (
        <div key={idx} className="mb-2">
          {section.section && (
            <div className="text-xs text-secondary font-semibold px-3 py-2">{section.section}</div>
          )}
          <div>
            {section.items.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </div>
      ))}
    </nav>
  </aside>
);

export default Sidebar;