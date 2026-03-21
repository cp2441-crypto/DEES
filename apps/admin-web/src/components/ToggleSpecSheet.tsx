import React from "react";
import { Info, MousePointer2, ToggleLeft, ToggleRight, Check } from "lucide-react";

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

export const ToggleSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[800px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Toggle Switch Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Selection Controls</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 flex flex-col items-center justify-center bg-white">
          <div className="w-full max-w-5xl space-y-16">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <ToggleRight size={20} className="text-gray-900" />
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Toggle Switches</h2>
              <span className="text-sm font-bold text-gray-400">Tactile Binary Input</span>
            </div>

            {/* Main Spec Area */}
            <div className="bg-gray-100 rounded-md p-24 relative border border-gray-200 shadow-inner grid grid-cols-1 gap-16 justify-items-center">
              
              {/* Active / Detailed State */}
              <div className="flex flex-col items-center gap-8 bg-white p-12 rounded-xl shadow-sm border border-gray-200 relative">
                 <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Annotated View</span>
                 </div>

                 <div className="flex items-center gap-6">
                    {/* Toggle ON */}
                    <div className="relative">
                      <div className="w-[52px] h-[32px] bg-[#C31348] rounded-[9999px] relative transition-all duration-300 shadow-inner">
                        <div className="absolute top-[2px] left-[22px] w-[28px] h-[28px] bg-white rounded-full shadow-md"></div>
                      </div>
                      
                      {/* Annotations for the Toggle ON */}
                      <Annotation key="w-spec" type="horizontal" label="52px" size="52px" className="top-[-28px] left-0 w-full h-4" />
                      <Annotation key="h-spec" type="vertical" label="32px" size="32px" className="top-0 right-[-36px] h-full w-4" />
                      <Annotation key="r-spec" type="horizontal" label="R: 9999px" size="9999px" className="bottom-[-20px] left-0 w-8 h-4" />
                      <div className="absolute inset-0 border border-red-500 border-dotted rounded-[9999px] pointer-events-none"></div>

                      {/* Thumb Annotation */}
                      <div className="absolute top-[2px] left-[22px] w-[28px] h-[28px] pointer-events-none">
                         <Annotation key="t-spec" type="horizontal" label="28px Circle" size="28px" className="top-[-16px] left-0 w-full h-4" color="blue" />
                         <Annotation key="p-spec" type="vertical" label="2px" size="2px" className="top-0 right-[-12px] h-full w-4" color="red" />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-900">State: ON</span>
                      <span className="text-xs font-bold text-gray-400 font-mono">#C31348</span>
                    </div>
                 </div>
              </div>

              {/* State Comparison */}
              <div className="grid grid-cols-3 gap-12 w-full max-w-4xl">
                {/* State: Off */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-[52px] h-[32px] bg-[#BEBEBE] rounded-[9999px] relative shadow-inner">
                    <div className="absolute top-[2px] left-[2px] w-[28px] h-[28px] bg-white rounded-full shadow-md"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Off State</p>
                    <p className="text-[10px] font-bold text-gray-400 font-mono">#BEBEBE</p>
                  </div>
                </div>

                {/* State: On */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-[52px] h-[32px] bg-[#C31348] rounded-[9999px] relative shadow-inner">
                    <div className="absolute top-[2px] left-[22px] w-[28px] h-[28px] bg-white rounded-full shadow-md"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black text-primary uppercase tracking-widest">On State</p>
                    <p className="text-[10px] font-bold text-gray-400 font-mono">#C31348</p>
                  </div>
                </div>

                {/* State: Disabled */}
                <div className="flex flex-col items-center gap-4 opacity-50">
                  <div className="w-[52px] h-[32px] bg-[#DEDEDE] rounded-[9999px] relative">
                    <div className="absolute top-[2px] left-[2px] w-[28px] h-[28px] bg-white rounded-full"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Disabled</p>
                    <p className="text-[10px] font-bold text-gray-400 font-mono">#DEDEDE</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Technical Parameters */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Track Size</p>
                <p className="text-lg font-black text-gray-900">52 <span className="text-xs font-bold text-gray-400">W</span> × 32 <span className="text-xs font-bold text-gray-400">H</span></p>
                <p className="text-xs text-gray-500 mt-1">Aspect Ratio: 1.625:1</p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Thumb Specs</p>
                <p className="text-lg font-black text-gray-900">28px <span className="text-xs font-bold text-gray-400">Circle</span></p>
                <p className="text-xs text-gray-500 mt-1">Color: #FFFFFF</p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Primary Color</p>
                <p className="text-lg font-black text-[#C31348]">#C31348</p>
                <p className="text-xs text-gray-500 mt-1 uppercase font-bold">State: Active</p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 border-dotted border-t"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Spacing</p>
                <p className="text-lg font-black text-gray-900">2px <span className="text-xs font-bold text-gray-400">Inset</span></p>
                <p className="text-xs text-gray-500 mt-1 italic">Uniform all sides.</p>
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
               Toggle switches are used to toggle a single setting on or off. They should never be used for complex navigation or multi-choice selection. 
               Always provide immediate feedback when clicked.
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
