// src/components/sidebar/Sidebar.tsx
import SidebarData from './SidebarData';
import SidebarItem from './SidebarItem';

const Sidebar = () => (
  <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
    <div className="p-4 font-bold text-xl flex items-center space-x-2">
      <span>Rolaa.ai</span>
      <span className="text-xs text-gray-400 ml-2">us-west-2</span>
    </div>
    <nav className="flex-1 overflow-y-auto px-2 sidebar-scroll">
      {SidebarData.map((section, idx) => (
        <div key={idx} className="mb-2">
          {section.section && (
            <div className="text-xs text-gray-400 font-semibold px-3 py-2">{section.section}</div>
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