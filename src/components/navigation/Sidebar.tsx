
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activePath: string;
  userRole: string;
  userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  items, 
  activePath, 
  userRole, 
  userName 
}) => {
  return (
    <div className="flex h-screen flex-col border-r bg-white w-64">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">Banking App</h2>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm">
          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive 
                    ? "bg-gray-100 text-gray-900" 
                    : "text-gray-500 hover:text-gray-900"
                )
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 py-2">
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
