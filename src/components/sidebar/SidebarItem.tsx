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
  <a href={path} className="flex items-center justify-between px-3 py-2 rounded hover:bg-[var(--bg-hover)] transition group">
    <div className="flex items-center space-x-3">
      <Icon className="text-secondary" fontSize="small" />
      <span className="text-sm text-primary">{label}</span>
      {badge && (
        <span className="ml-2 text-xs badge-primary px-2 py-0.5 rounded">{badge}</span>
      )}
    </div>
    {subLabel && (
      <span className="text-xs text-secondary">{subLabel}</span>
    )}
  </a>
);

export default SidebarItem;