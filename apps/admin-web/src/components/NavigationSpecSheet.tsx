import React from "react";
import { LayoutDashboard, Users, Package, PieChart, Bell, Settings, X, Info } from "lucide-react";

const Annotation = ({ type, size, label, className = "", color = "red", style = {} }: { type: 'horizontal' | 'vertical', size: string, label: string, className?: string, color?: string, style?: React.CSSProperties }) => {
  const colorClass = color === "red" ? "text-red-600 border-red-500" : "text-blue-600 border-blue-500";
  const bgClass = color === "red" ? "border-red-100 bg-white" : "border-blue-100 bg-white";
  const borderClass = color === "red" ? "border-red-500" : "border-blue-500";

  return (
    <div className={`absolute flex items-center justify-center pointer-events-none ${className}`} style={style}>
      {type === 'horizontal' ? (
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center w-full">
            <div className={`h-2 w-[1px] ${borderClass.replace('border-', 'bg-')}`}></div>
            <div className={`h-[1px] flex-1 border-t border-dotted ${borderClass}`}></div>
            <div className={`h-2 w-[1px] ${borderClass.replace('border-', 'bg-')}`}></div>
          </div>
          <span className={`text-[9px] font-bold ${colorClass} ${bgClass} px-1 -mt-1 rounded-xs border shadow-xs`}>{label}</span>
        </div>
      ) : (
        <div className="flex items-center h-full">
          <div className="flex flex-col items-center h-full">
            <div className={`w-2 h-[1px] ${borderClass.replace('border-', 'bg-')}`}></div>
            <div className={`w-[1px] flex-1 border-l border-dotted ${borderClass}`}></div>
            <div className={`w-2 h-[1px] ${borderClass.replace('border-', 'bg-')}`}></div>
          </div>
          <span className={`text-[9px] font-bold ${colorClass} ${bgClass} px-1 ml-1 rounded-xs border shadow-xs whitespace-nowrap`}>{label}</span>
        </div>
      )}
    </div>
  );
};

export const NavigationSpecSheet = () => {
  const menuItems = [
    { id: 'dash', icon: LayoutDashboard, label: "Dashboard", active: true },
    { id: 'users', icon: Users, label: "User Management", active: false },
    { id: 'inv', icon: Package, label: "Inventory", active: false },
    { id: 'ana', icon: PieChart, label: "Analytics", active: false },
    { id: 'not', icon: Bell, label: "Notifications", active: false },
    { id: 'set', icon: Settings, label: "Settings", active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[1024px] flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Navigation Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Global Navigation</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Desktop Navigation Spec */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Desktop Navigation</h2>
              <span className="text-sm font-bold text-gray-400">240px Fixed</span>
            </div>
            
            <div className="bg-gray-100 rounded-md p-12 relative border border-gray-200 aspect-[4/5] flex justify-center items-start shadow-inner overflow-hidden">
              {/* Desktop Sidebar Simulation */}
              <div className="w-[240px] h-full bg-white border border-gray-200 shadow-xl rounded-xs relative flex flex-col">
                <div className="p-6 border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="size-6 bg-primary rounded-sm flex items-center justify-center text-[10px] text-white font-bold">DE</div>
                    <span className="text-sm font-bold text-gray-900">DEES Admin</span>
                  </div>
                </div>
                
                <div className="p-4 space-y-1 relative">
                  {menuItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`relative flex items-center gap-3 px-4 py-[10px] rounded-[8px] transition-colors ${
                        item.active 
                          ? "bg-[#FFEEF2] text-[#C31348] border-l-[3px] border-[#C31348] rounded-l-none" 
                          : "text-gray-500"
                      }`}
                    >
                      <item.icon size={18} />
                      <span className="text-sm font-bold">{item.label}</span>
                      
                      {item.active && (
                        <React.Fragment key={`active-notes-${item.id}`}>
                          {/* Vertical Padding Annotation */}
                          <Annotation key="v-pad" type="vertical" label="10px" size="10px" className="top-0 left-0 h-[10px] w-4 translate-x-1" />
                          {/* Horizontal Padding Annotation */}
                          <Annotation key="h-pad" type="horizontal" label="16px" size="16px" className="top-1/2 left-0 w-4 h-4 -translate-y-1/2" />
                          {/* Radius Annotation */}
                          <div key="radius-note" className="absolute -top-1 -right-1 flex flex-col items-center">
                            <div className="size-4 border-2 border-red-500 rounded-[8px] border-dotted"></div>
                            <span className="text-[8px] font-black text-red-500 mt-1">R: 8px</span>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                  ))}
                  
                  {/* Width Annotation */}
                  <Annotation key="side-width" type="horizontal" label="240px" size="240px" className="top-[-40px] left-0 w-full h-4" />
                </div>
              </div>

              {/* Spec Labels */}
              <div className="absolute top-4 left-4 space-y-2">
                 <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                   <div className="size-2 bg-primary rounded-full"></div>
                   <span className="text-[10px] font-bold text-gray-700">Active: #C31348</span>
                 </div>
                 <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                   <div className="size-2 bg-[#FFEEF2] rounded-full border border-[#C31348]/20"></div>
                   <span className="text-[10px] font-bold text-gray-700">Active BG: #FFEEF2</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Mobile Drawer Spec */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Mobile Drawer</h2>
              <span className="text-sm font-bold text-gray-400">280px Width</span>
            </div>

            <div className="bg-gray-100 rounded-md p-12 relative border border-gray-200 aspect-[4/5] flex justify-center items-center shadow-inner overflow-hidden">
              {/* Dark Backdrop Simulation */}
              <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px] z-0"></div>
              
              {/* Mobile Drawer Simulation */}
              <div className="w-[280px] h-full bg-white relative z-10 flex flex-col shadow-2xl animate-in slide-in-from-left duration-500">
                <div className="p-6 flex items-center justify-between border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="size-8 bg-primary rounded-sm flex items-center justify-center text-xs text-white font-bold">DE</div>
                    <span className="text-base font-bold text-gray-900">DEES Admin</span>
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-4 space-y-2 relative">
                  {menuItems.map((item) => (
                    <div
                      key={`mob-${item.id}`}
                      className={`flex items-center gap-4 px-5 py-4 rounded-[8px] ${
                        item.active 
                          ? "bg-[#FFEEF2] text-[#C31348] border-l-[3px] border-[#C31348] rounded-l-none font-black" 
                          : "text-gray-500 font-bold"
                      }`}
                    >
                      <item.icon size={22} />
                      <span className="text-base">{item.label}</span>
                    </div>
                  ))}
                  
                  {/* Width Annotation */}
                  <Annotation key="mob-width" type="horizontal" label="280px" size="280px" className="top-[-40px] left-0 w-full h-4" />
                </div>

                <div className="mt-auto p-6 border-t border-gray-50">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-[8px] border border-gray-100">
                    <div className="size-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">John Doe</p>
                      <p className="text-[10px] font-medium text-gray-400">Super Admin</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spec Labels */}
              <div className="absolute bottom-4 right-4 space-y-2 text-right">
                 <div className="bg-white px-4 py-2 rounded-sm border border-gray-200 shadow-sm">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Interaction</p>
                   <p className="text-xs font-bold text-gray-900 italic">Dark Backdrop: bg-gray-900/60</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-8 bg-gray-900 text-white flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="p-2 bg-primary rounded-xs">
               <Info size={18} />
             </div>
             <p className="text-sm font-medium opacity-80 max-w-2xl">
               Navigation items should always maintain vertical alignment. The active state indicator (3px border) is exclusive to the left edge. 
               Mobile drawer is triggered via hamburger menu and transitions from the left at 300ms cubic-bezier.
             </p>
           </div>
           <div className="text-right">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Property of DEES Admin</p>
           </div>
        </div>
      </div>
    </div>
  );
};
