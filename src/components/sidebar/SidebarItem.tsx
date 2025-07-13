// src/components/sidebar/SidebarItem.tsx
import type { FC } from 'react';

interface SidebarItemProps {
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: string;
  subLabel?: string;
}

const SidebarItem: FC<SidebarItemProps> = ({ label, icon: Icon, path, badge, subLabel }) => (
  <a href={path} className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 transition group">
    <div className="flex items-center space-x-3">
      <Icon className="text-gray-500" fontSize="small" />
      <span className="text-sm">{label}</span>
      {badge && (
        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{badge}</span>
      )}
    </div>
    {subLabel && (
      <span className="text-xs text-gray-500">{subLabel}</span>
    )}
  </a>
);

export default SidebarItem;