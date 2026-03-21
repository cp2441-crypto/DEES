import React from "react";
import { Info, ArrowRight, MousePointer2 } from "lucide-react";

const Annotation = ({ type, size, label, className = "", color = "red", style = {} }: { type: 'horizontal' | 'vertical', size: string, label: string, className?: string, color?: string, style?: React.CSSProperties }) => {
  const borderClass = color === "red" ? "border-red-500" : "border-blue-500";
  const textClass = color === "red" ? "text-red-600" : "text-blue-600";
  const bgClass = color === "red" ? "bg-white border-red-100" : "bg-white border-blue-100";

  return (
    <div className={`absolute flex items-center justify-center pointer-events-none z-20 ${className}`} style={style}>
      {type === 'horizontal' ? (
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center w-full">
            <div className={`h-2 w-[1px] ${borderClass.replace('border-', 'bg-')}`}></div>
            <div className={`h-[1px] flex-1 border-t border-dotted ${borderClass}`}></div>
            <div className={`h-2 w-[1px] ${borderClass.replace('border-', 'bg-')}`}></div>
          </div>
          <span className={`text-[9px] font-bold ${textClass} ${bgClass} px-1 -mt-1 rounded-xs border shadow-xs whitespace-nowrap`}>{label}</span>
        </div>
      ) : (
        <div className="flex items-center h-full">
          <div className="flex flex-col items-center h-full">
            <div className={`w-2 h-[1px] ${borderClass.replace('border-', 'bg-')}`}></div>
            <div className={`w-[1px] flex-1 border-l border-dotted ${borderClass}`}></div>
            <div className={`w-2 h-[1px] ${borderClass.replace('border-', 'bg-')}`}></div>
          </div>
          <span className={`text-[9px] font-bold ${textClass} ${bgClass} px-1 ml-1 rounded-xs border shadow-xs whitespace-nowrap`}>{label}</span>
        </div>
      )}
    </div>
  );
};

export const MobileTableSpecSheet = () => {
  const tableData = [
    { id: 1, name: "Gangnam Store", category: "Retail", status: "Active", revenue: "$12,400", orders: "142" },
    { id: 2, name: "Itaewon Shop", category: "Fashion", status: "Active", revenue: "$8,200", orders: "89" },
    { id: 3, name: "Seongsu Hub", category: "Logistics", status: "Inactive", revenue: "$24,500", orders: "412" },
    { id: 4, name: "Busan Center", category: "Retail", status: "Active", revenue: "$15,800", orders: "201" },
    { id: 5, name: "Jeju Outlet", category: "Fashion", status: "Active", revenue: "$5,100", orders: "54" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[1024px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Mobile Table Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Mobile Data Grid</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 flex flex-col items-center">
          <div className="w-full max-w-5xl space-y-12">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Mobile Sticky Table</h2>
              <span className="text-sm font-bold text-gray-400">Horizontal Scrolling Strategy</span>
            </div>

            <div className="bg-gray-100 rounded-md p-20 relative border border-gray-200 shadow-inner flex flex-col items-center">
              {/* Mobile Container Simulation */}
              <div className="w-[343px] bg-white rounded-[24px] shadow-2xl border border-gray-200 overflow-hidden relative">
                {/* Scroll Indicator */}
                <div className="absolute top-4 right-4 animate-bounce">
                  <div className="flex items-center gap-1 bg-gray-900/80 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 shadow-lg">
                    <span className="text-[8px] font-black text-white uppercase tracking-tighter">Scroll</span>
                    <ArrowRight size={10} className="text-white" />
                  </div>
                </div>

                <div className="overflow-x-auto scrollbar-hide flex">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="h-[48px] bg-gray-50 border-b border-gray-100 relative">
                        <th className="sticky left-0 z-10 bg-gray-50 px-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest min-w-[120px] shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                          Store Name
                        </th>
                        <th className="px-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap min-w-[100px]">Category</th>
                        <th className="px-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap min-w-[80px]">Status</th>
                        <th className="px-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap min-w-[100px]">Revenue</th>
                        <th className="px-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap min-w-[80px]">Orders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, idx) => (
                        <tr key={row.id} className="h-[48px] border-b border-gray-50 group relative">
                          <td className="sticky left-0 z-10 bg-white px-4 text-[12px] font-black text-gray-900 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                            {row.name}
                            
                            {idx === 0 && (
                               <Annotation key="row-h" type="vertical" label="48px" size="48px" className="top-0 left-[-20px] h-[48px] w-4" />
                            )}
                          </td>
                          <td className="px-4 text-[11px] font-bold text-gray-500">{row.category}</td>
                          <td className="px-4">
                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-tighter ${
                              row.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 text-right text-[11px] font-black text-gray-900">{row.revenue}</td>
                          <td className="px-4 text-right text-[11px] font-bold text-gray-400">{row.orders}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Spec Details */}
              <div className="mt-16 grid grid-cols-3 gap-8 w-full max-w-4xl">
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Structure</p>
                  <p className="text-sm font-bold text-gray-900">Width: 343px (Standard)</p>
                  <p className="text-sm font-bold text-gray-900">Row Height: 48px</p>
                  <p className="text-xs text-gray-500 mt-1 italic">Optimized for touch targets.</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1 h-full bg-gray-200 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Sticky Logic</p>
                  <p className="text-sm font-bold text-gray-900 font-mono">position: sticky</p>
                  <p className="text-sm font-bold text-gray-900">Shadow: 4px Spread Blur</p>
                  <p className="text-xs text-gray-500 mt-1 font-mono text-primary font-black uppercase">z-index: 10</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-gray-900"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Interactivity</p>
                  <p className="text-sm font-bold text-gray-900 italic flex items-center gap-2">
                    <MousePointer2 size={14} className="text-primary" />
                    Swipe for more data
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Indicator: ArrowRight + Text</p>
                  <p className="text-xs text-gray-500">Auto-hide after 2s scroll.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-900 text-white flex items-center justify-between mt-auto">
           <div className="flex items-center gap-4">
             <div className="p-2 bg-primary rounded-xs">
               <Info size={18} />
             </div>
             <p className="text-sm font-medium opacity-80 max-w-2xl">
               Mobile tables should always fix the primary identifying column (ID or Name). 
               Use a subtle right shadow on the sticky column to visually separate it from the scrollable area.
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
