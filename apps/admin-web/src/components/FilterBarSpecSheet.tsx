import React from "react";
import { Search, ChevronDown, Plus, Info, Filter, SlidersHorizontal } from "lucide-react";

const Annotation = ({ type, size, label, className = "", color = "red", style = {} }: { type: 'horizontal' | 'vertical', size: string, label: string, className?: string, color?: string, style?: React.CSSProperties }) => {
  const borderClass = color === "red" ? "border-red-500" : "border-blue-500";
  const textClass = color === "red" ? "text-red-600" : "text-blue-600";
  const bgClass = color === "red" ? "bg-white border-red-100" : "bg-white border-blue-100";

  return (
    <div className={`absolute flex items-center justify-center pointer-events-none ${className}`} style={style}>
      {type === 'horizontal' ? (
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center w-full">
            <div className={`h-2 w-[1px] ${borderClass.replace('border-', 'bg-')}`}></div>
            <div className={`h-[1px] flex-1 border-t border-dotted ${borderClass}`}></div>
            <div className={`h-2 w-[1px] ${borderClass.replace('border-', 'bg-')}`}></div>
          </div>
          <span className={`text-[9px] font-bold ${textClass} ${bgClass} px-1 -mt-1 rounded-xs border shadow-xs`}>{label}</span>
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

export const FilterBarSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[1024px] flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Filter Bar Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Filter & Search Controls</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 space-y-16">
          {/* Desktop Filter Bar Spec */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Desktop Layout</h2>
              <span className="text-sm font-bold text-gray-400">Horizontal Inline</span>
            </div>
            
            <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner overflow-hidden flex flex-col items-center">
              <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative">
                <div className="flex items-center gap-4 relative">
                  {/* Search Input */}
                  <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-[8px] relative">
                    <Search size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-400">Search keywords...</span>
                    {/* Radius Annotation */}
                    <div key="rad-note" className="absolute -bottom-6 left-0">
                      <span className="text-[10px] font-black text-red-500">Radius: 8px</span>
                    </div>
                  </div>

                  {/* Annotation for Gap between search and dropdown */}
                  <Annotation key="gap-1" type="horizontal" label="16px" size="16px" className="top-1/2 left-[calc(100%-438px)] w-4 h-4 -translate-y-1/2" />

                  {/* Dropdowns */}
                  <div className="flex items-center gap-4 relative">
                    <div className="w-36 flex items-center justify-between bg-white border border-gray-200 px-4 py-2 rounded-[8px] text-sm font-bold text-gray-700">
                      Category <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    
                    {/* Annotation for Gap between dropdowns */}
                    <Annotation key="gap-2" type="horizontal" label="16px" size="16px" className="top-1/2 left-[152px] w-4 h-4 -translate-y-1/2" />

                    <div className="w-36 flex items-center justify-between bg-white border border-gray-200 px-4 py-2 rounded-[8px] text-sm font-bold text-gray-700">
                      Status <ChevronDown size={16} className="text-gray-400" />
                    </div>
                  </div>

                  {/* Annotation for Gap between dropdown and button */}
                  <Annotation key="gap-3" type="horizontal" label="16px" size="16px" className="top-1/2 right-[100px] w-4 h-4 -translate-y-1/2" />

                  {/* Register Button */}
                  <button className="bg-[#C31348] text-white px-6 py-2 rounded-[8px] text-sm font-black flex items-center gap-2 hover:bg-[#A00F3B] transition-colors shadow-sm">
                    <Plus size={18} />
                    등록
                  </button>
                </div>
              </div>

              {/* Specs Text */}
              <div className="mt-12 grid grid-cols-3 gap-8 w-full max-w-4xl">
                <div className="bg-white p-4 rounded-sm border border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Layout</p>
                  <p className="text-sm font-bold text-gray-900">Flex Horizontal Row</p>
                  <p className="text-xs text-gray-500 mt-1">align-items: center</p>
                </div>
                <div className="bg-white p-4 rounded-sm border border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Spacing</p>
                  <p className="text-sm font-bold text-gray-900">Gap: 16px (Fixed)</p>
                  <p className="text-xs text-gray-500 mt-1">Apply to all siblings</p>
                </div>
                <div className="bg-white p-4 rounded-sm border border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Styling</p>
                  <p className="text-sm font-bold text-gray-900">Radius: 8px (md)</p>
                  <p className="text-xs text-gray-500 mt-1">Primary: #C31348</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Bar Spec */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Mobile Layout</h2>
              <span className="text-sm font-bold text-gray-400">Vertical Stacked</span>
            </div>

            <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner overflow-hidden flex justify-center">
              {/* Mobile Device Simulation */}
              <div className="w-[375px] bg-white border-[6px] border-gray-900 rounded-[32px] overflow-hidden shadow-2xl relative">
                <div className="h-6 bg-gray-900 w-1/3 mx-auto rounded-b-xl mb-4"></div>
                
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-black text-gray-900">Product List</h3>
                    <button className="p-2 bg-gray-50 rounded-full text-gray-400 border border-gray-100">
                      <SlidersHorizontal size={18} />
                    </button>
                  </div>

                  {/* Collapsible Mobile Filter Bar */}
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100 relative">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-[8px]">
                      <Search size={18} className="text-gray-400" />
                      <span className="text-sm text-gray-400">Search...</span>
                    </div>

                    {/* Vertical Gap Annotation */}
                    <Annotation key="m-gap-1" type="vertical" label="16px" size="16px" className="top-14 left-1/2 -translate-x-1/2 h-4 w-4" />

                    <div className="flex items-center justify-between bg-white border border-gray-200 px-4 py-2.5 rounded-[8px] text-sm font-bold text-gray-700">
                      Category <ChevronDown size={16} className="text-gray-400" />
                    </div>

                    {/* Vertical Gap Annotation */}
                    <Annotation key="m-gap-2" type="vertical" label="16px" size="16px" className="top-[112px] left-1/2 -translate-x-1/2 h-4 w-4" />

                    <div className="flex items-center justify-between bg-white border border-gray-200 px-4 py-2.5 rounded-[8px] text-sm font-bold text-gray-700">
                      Status <ChevronDown size={16} className="text-gray-400" />
                    </div>

                    {/* Vertical Gap Annotation */}
                    <Annotation key="m-gap-3" type="vertical" label="16px" size="16px" className="top-[168px] left-1/2 -translate-x-1/2 h-4 w-4" />

                    <button className="w-full bg-[#C31348] text-white py-3 rounded-[8px] text-sm font-black flex items-center justify-center gap-2 shadow-sm">
                      <Plus size={18} />
                      등록
                    </button>
                  </div>

                  {/* List Placeholder */}
                  <div className="space-y-3 pt-4">
                    {[1, 2, 3].map(i => (
                      <div key={`placeholder-${i}`} className="h-16 bg-gray-50 border border-gray-100 rounded-md animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Spec Label */}
              <div className="absolute bottom-8 right-8 text-right">
                <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-lg">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Mobile Spec</p>
                  <p className="text-sm font-bold text-gray-900">Vertical Stack / Gap: 16px</p>
                  <p className="text-xs text-gray-500 italic mt-1">Full width buttons & inputs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-900 text-white flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="p-2 bg-primary rounded-xs">
               <Info size={18} />
             </div>
             <p className="text-sm font-medium opacity-80 max-w-2xl">
               Dropdowns must support multi-select functionality with chips in the search area. 
               The '등록' button should remain sticky on mobile if the filter bar is collapsed.
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
