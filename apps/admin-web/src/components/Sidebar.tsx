import React from "react";
import { LayoutDashboard, Users, Settings, Package, PieChart, LogOut, Bell, Search, Menu } from "lucide-react";

export const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Users, label: "User Management", active: false },
    { icon: Package, label: "Inventory", active: false },
    { icon: PieChart, label: "Analytics", active: false },
    { icon: Bell, label: "Notifications", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-100 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="size-8 bg-primary rounded-sm flex items-center justify-center text-white font-bold">
            DE
          </div>
          <span className="text-gray-900 font-bold tracking-tight">DEES Admin</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                item.active 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-destructive transition-colors rounded-sm hover:bg-destructive/10">
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};
