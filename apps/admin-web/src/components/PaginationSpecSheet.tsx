import React from "react";
import { Info, MousePointer2, ChevronLeft, ChevronRight, Monitor, Smartphone } from "lucide-react";

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

export const PaginationSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[800px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Pagination Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">List Navigation</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 space-y-24 flex flex-col items-center">
          <div className="w-full max-w-5xl space-y-12">
            
            {/* Desktop Pagination */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
                <Monitor size={20} className="text-gray-900" />
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Desktop Pagination</h2>
                <span className="text-sm font-bold text-gray-400">Standard Grid Footer</span>
              </div>

              <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner flex flex-col items-center justify-center">
                <div className="flex items-center gap-1 relative">
                  {/* Prev Button */}
                  <button className="w-9 h-9 flex items-center justify-center bg-white border border-gray-200 rounded-[8px] text-gray-400 hover:bg-gray-50 transition-colors shadow-sm">
                    <ChevronLeft size={18} />
                  </button>

                  {/* Gap Annotation */}
                  <Annotation key="gap-d" type="horizontal" label="4px" size="4px" className="top-1/2 left-[36px] w-[4px] h-4 -translate-y-1/2" />

                  {/* Page Numbers */}
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button 
                      key={page}
                      className={`w-9 h-9 flex items-center justify-center rounded-[8px] text-[13px] font-black transition-all shadow-sm ${
                        page === 3 ? 'bg-[#C31348] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                      } relative`}
                    >
                      {page}
                      {page === 3 && (
                        <>
                          <Annotation key="active-bg" type="vertical" label="BG: #C31348" size="36px" className="top-0 right-[-100px] h-[36px] w-4" color="blue" />
                          <Annotation key="btn-size" type="horizontal" label="36x36px" size="36px" className="top-[-24px] left-0 w-full h-4" />
                          <Annotation key="btn-r" type="horizontal" label="R: 8px" size="8px" className="bottom-[-16px] left-0 w-8 h-4" />
                          <div className="absolute inset-0 border-2 border-red-500 border-dotted rounded-[8px] pointer-events-none"></div>
                        </>
                      )}
                    </button>
                  ))}

                  <div className="w-9 h-9 flex items-center justify-center text-gray-400 font-bold">...</div>

                  <button className="w-9 h-9 flex items-center justify-center bg-white border border-gray-200 rounded-[8px] text-gray-600 hover:bg-gray-50 transition-colors shadow-sm font-black text-[13px]">
                    10
                  </button>

                  {/* Next Button */}
                  <button className="w-9 h-9 flex items-center justify-center bg-white border border-gray-200 rounded-[8px] text-gray-400 hover:bg-gray-50 transition-colors shadow-sm">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Pagination */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
                <Smartphone size={20} className="text-gray-900" />
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Mobile Pagination</h2>
                <span className="text-sm font-bold text-gray-400">Minimal Navigation</span>
              </div>

              <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner flex flex-col items-center justify-center">
                <div className="w-[343px] bg-white p-4 rounded-xl shadow-lg border border-gray-200 flex items-center justify-between relative">
                  <button className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 active:bg-gray-100 transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-black text-gray-900 tracking-tight">3 / 10</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Page</span>
                  </div>

                  <button className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg text-gray-900 active:bg-gray-100 transition-colors border border-gray-100 shadow-sm">
                    <ChevronRight size={20} />
                  </button>

                  {/* Mobile Spec Callouts */}
                  <Annotation key="mob-w" type="horizontal" label="343px (Full Width)" size="343px" className="top-[-24px] left-0 w-full h-4" />
                </div>
              </div>
            </div>

            {/* Spec Details Grid */}
            <div className="grid grid-cols-3 gap-8 w-full">
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Desktop Structure</p>
                <p className="text-sm font-bold text-gray-900">Button: 36 x 36 px</p>
                <p className="text-sm font-bold text-gray-900">Radius: 8px (Rounded-lg)</p>
                <p className="text-sm font-bold text-gray-900">Gap: 4px (Spacing-1)</p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Color Palette</p>
                <p className="text-sm font-bold text-gray-900">Active BG: #C31348</p>
                <p className="text-sm font-bold text-gray-900">Active Text: #FFFFFF</p>
                <p className="text-sm font-bold text-gray-900">Inactive Border: #E5E7EB</p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 border-dashed border-t"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Mobile Interaction</p>
                <p className="text-sm font-bold text-gray-900">Layout: Split / Center Text</p>
                <p className="text-sm font-bold text-gray-900">Touch Target: 40 x 40 px</p>
                <p className="text-xs text-gray-500 mt-1 italic">Designed for single-hand use.</p>
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
               Pagination controls should include an ellipsis (...) for large datasets. 
               The active state must have high contrast (#C31348) to indicate the user's current location within the data set clearly.
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
