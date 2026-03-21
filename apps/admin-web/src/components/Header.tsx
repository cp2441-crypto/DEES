import React from "react";
import { Search, Bell, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-full w-96 max-w-full">
        <Search size={18} className="text-gray-300" />
        <input 
          type="text" 
          placeholder="Search something..." 
          className="bg-transparent border-none outline-none text-sm text-gray-900 w-full placeholder:text-gray-300"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-500 hover:text-primary transition-colors hover:bg-gray-50 rounded-full">
          <Bell size={20} />
          <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900 leading-tight">John Doe</p>
            <p className="text-xs font-medium text-gray-500">Super Admin</p>
          </div>
          <div className="size-10 rounded-full overflow-hidden border border-gray-200">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBlcnNvbiUyMHByb2ZpbGV8ZW58MXx8fHwxNzc0MDIxNjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Profile"
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
