import React from "react";
import { Info, CheckSquare, Square, MoreVertical, MousePointer2 } from "lucide-react";

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

export const TableSpecSheet = () => {
  const tableData = [
    { id: 1, name: "Gangnam Flagship Store", category: "Retail", status: "Active", state: "normal", checked: false },
    { id: 2, name: "Itaewon Concept Shop", category: "Fashion", status: "Active", state: "hover", checked: false },
    { id: 3, name: "Seongsu Logistics Hub", category: "Distribution", status: "Inactive", state: "selected", checked: true },
    { id: 4, name: "Busan Marine Center", category: "Retail", status: "Active", state: "normal", checked: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[1024px] flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Desktop Table Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Data Management Table</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 space-y-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Table Structure & States</h2>
              <span className="text-sm font-bold text-gray-400">44px Height Standard</span>
            </div>

            <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner overflow-hidden flex flex-col items-center">
              <div className="w-full max-w-5xl bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="h-[44px] bg-[#EEEEEE] border-b border-gray-200 relative">
                      <th className="w-12 px-4 text-left relative">
                         <Square size={16} className="text-gray-400" />
                         <Annotation key="header-h" type="vertical" label="44px" size="44px" className="top-0 left-[-20px] h-[44px] w-4" />
                      </th>
                      <th className="px-4 text-[11px] font-black text-gray-500 uppercase tracking-wider text-left">Store</th>
                      <th className="px-4 text-[11px] font-black text-gray-500 uppercase tracking-wider text-left">Category</th>
                      <th className="px-4 text-[11px] font-black text-gray-500 uppercase tracking-wider text-left">Status</th>
                      <th className="w-12 px-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, idx) => (
                      <tr 
                        key={row.id} 
                        className={`h-[44px] border-b border-gray-100 transition-colors relative ${
                          row.state === 'hover' ? 'bg-[#EEEEEE]' : 
                          row.state === 'selected' ? 'bg-[#FFEEF2]' : 
                          'bg-white'
                        }`}
                      >
                        <td className="px-4 relative">
                          {row.checked ? (
                            <CheckSquare size={16} className="text-primary" />
                          ) : (
                            <Square size={16} className="text-gray-300" />
                          )}
                          
                          {idx === 0 && (
                            <>
                              {/* Horizontal Padding Annotation */}
                              <Annotation key="cell-pad-h" type="horizontal" label="16px" size="16px" className="top-1/2 left-0 w-4 h-4 -translate-y-1/2" />
                            </>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-200 rounded-[8px] flex-shrink-0 relative overflow-hidden">
                               <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300"></div>
                               {idx === 0 && (
                                 <div className="absolute inset-0 border-2 border-red-500 border-dotted rounded-[8px] flex items-center justify-center">
                                    <span className="text-[8px] font-black text-red-600 bg-white px-0.5">36x36</span>
                                 </div>
                               )}
                            </div>
                            <span className="text-sm font-bold text-gray-900 truncate">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-4">
                          <span className="text-xs font-medium text-gray-500">{row.category}</span>
                        </td>
                        <td className="px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tight border ${
                            row.status === 'Active' 
                              ? 'bg-green-50 text-green-600 border-green-100' 
                              : 'bg-gray-50 text-gray-400 border-gray-100'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 text-right relative">
                          <MoreVertical size={16} className="text-gray-300 inline-block" />
                          
                          {/* Row State Labels */}
                          {row.state === 'hover' && (
                            <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 flex items-center gap-2">
                               <div className="w-4 h-[1px] bg-gray-400"></div>
                               <span className="px-2 py-1 bg-gray-900 text-white text-[10px] font-black rounded-xs uppercase">Hover State</span>
                               <MousePointer2 size={14} className="text-gray-900 -ml-1 -mt-1" />
                            </div>
                          )}
                          {row.state === 'selected' && (
                            <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 flex items-center gap-2">
                               <div className="w-4 h-[1px] bg-primary"></div>
                               <span className="px-2 py-1 bg-primary text-white text-[10px] font-black rounded-xs uppercase">Selected State</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Spec Details */}
              <div className="mt-20 grid grid-cols-4 gap-8 w-full max-w-5xl">
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#EEEEEE]"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Header Spec</p>
                  <p className="text-sm font-bold text-gray-900">Height: 44px</p>
                  <p className="text-sm font-bold text-gray-900">BG: #EEEEEE</p>
                  <p className="text-xs text-gray-500 mt-1">Font: 11px Black Uppercase</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-white border-l border-gray-100"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Row Spec</p>
                  <p className="text-sm font-bold text-gray-900">Height: 44px</p>
                  <p className="text-sm font-bold text-gray-900">Stroke: 1px Bottom</p>
                  <p className="text-xs text-gray-500 mt-1">Cell Padding: 16px (h)</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#FFEEF2]"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Selection</p>
                  <p className="text-sm font-bold text-gray-900">BG: #FFEEF2</p>
                  <p className="text-sm font-bold text-gray-900">Icon: CheckSquare</p>
                  <p className="text-xs text-gray-500 mt-1">Color: #C31348 (Primary)</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gray-200"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Assets</p>
                  <p className="text-sm font-bold text-gray-900">Image: 36x36px</p>
                  <p className="text-sm font-bold text-gray-900">Radius: 8px</p>
                  <p className="text-xs text-gray-500 mt-1">Aspect Ratio: 1:1</p>
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
               Tables should implement virtual scrolling for datasets over 100 rows. The header remains sticky during vertical scroll. 
               Horizontal scroll is triggered only when total column width exceeds viewport.
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
