import React from "react";
import { Info, MousePointer2, Zap } from "lucide-react";

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

export const SkeletonSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[800px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Skeleton Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Loading State UI</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl space-y-12">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Table Skeleton Loader</h2>
              <span className="text-sm font-bold text-gray-400">Placeholder UI Strategy</span>
            </div>

            <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner flex flex-col items-center">
              <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
                {/* Skeleton Table */}
                <div className="w-full">
                  {/* Header Row */}
                  <div className="h-[44px] bg-[#EEEEEE] border-b border-gray-200 flex items-center px-6 relative">
                     <div className="w-32 h-3 bg-gray-300 rounded-[4px] animate-pulse"></div>
                     <Annotation key="header-h" type="vertical" label="44px" size="44px" className="top-0 left-0 h-[44px] w-4" />
                  </div>

                  {/* Data Rows */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-[48px] border-b border-gray-100 flex items-center px-6 gap-6 relative">
                       {/* Image Placeholder */}
                       <div className="w-9 h-9 bg-[#EEEEEE] rounded-[8px] flex-shrink-0 animate-pulse relative">
                          {i === 1 && (
                            <Annotation key="img-size" type="horizontal" label="36px" size="36px" className="top-[-12px] left-0 w-full h-4" />
                          )}
                       </div>

                       {/* Text Block 1 */}
                       <div className={`h-3 bg-[#EEEEEE] rounded-[4px] animate-pulse relative`} style={{ width: i % 2 === 0 ? '120px' : '180px' }}>
                          {i === 1 && (
                            <>
                              <Annotation key="text-r" type="horizontal" label="R: 4px" size="4px" className="bottom-[-16px] right-0 w-4 h-4" />
                              <Annotation key="text-h" type="vertical" label="12px" size="12px" className="top-0 left-[-16px] h-full w-4" />
                            </>
                          )}
                       </div>

                       {/* Text Block 2 */}
                       <div className="h-3 bg-[#EEEEEE] rounded-[4px] animate-pulse w-24 ml-auto"></div>
                       
                       {/* Text Block 3 */}
                       <div className="h-3 bg-[#EEEEEE] rounded-[4px] animate-pulse w-16"></div>

                       {i === 1 && (
                          <Annotation key="row-h" type="vertical" label="48px" size="48px" className="top-0 left-0 h-[48px] w-4" />
                       )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Spec Details */}
              <div className="mt-16 grid grid-cols-3 gap-8 w-full max-w-4xl">
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#EEEEEE]"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Base Style</p>
                  <p className="text-sm font-bold text-gray-900">Color: #EEEEEE</p>
                  <p className="text-sm font-bold text-gray-900">Border-radius: 4px</p>
                  <p className="text-xs text-gray-500 mt-1 italic">Used for all text-based placeholders.</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Animation</p>
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Zap size={14} className="text-primary fill-primary" />
                    Pulse Effect
                  </p>
                  <p className="text-sm font-bold text-gray-900 italic font-mono">opacity: 0.5 to 1</p>
                  <p className="text-xs text-gray-500 mt-1">Duration: 1.5s (Infinite Loop)</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Logic</p>
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <MousePointer2 size={14} className="text-primary" />
                    Content Replacement
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Widths should vary to simulate real data entropy.</p>
                  <p className="text-xs text-gray-500 italic">Example: 40% - 80% range.</p>
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
               Skeleton loaders must mirror the layout of the final content exactly to minimize layout shifts. 
               Use varying widths for text lines to create a more organic loading feel.
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
