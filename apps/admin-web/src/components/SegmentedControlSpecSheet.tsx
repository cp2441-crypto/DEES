import React from "react";
import { Info, MousePointer2, Layers } from "lucide-react";

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

export const SegmentedControlSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[800px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Segmented Control Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Toggle & Selection</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl space-y-12">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Segmented Control</h2>
              <span className="text-sm font-bold text-gray-400">Standard Navigation Toggle</span>
            </div>

            <div className="bg-gray-100 rounded-md p-24 relative border border-gray-200 shadow-inner flex flex-col items-center justify-center">
              {/* Segmented Control Component Simulation */}
              <div className="bg-[#EEEEEE] p-[2px] rounded-[10px] flex items-center w-[360px] relative shadow-sm">
                
                {/* Container Annotations */}
                <Annotation key="cont-r" type="horizontal" label="R: 10px" size="10px" className="top-[-24px] left-0 w-8 h-4" />
                <Annotation key="cont-p" type="vertical" label="2px" size="2px" className="top-0 left-[1px] h-[36px] w-4" />
                <Annotation key="cont-bg" type="vertical" label="BG: #EEEEEE" size="40px" className="top-0 right-[-100px] h-[40px] w-4" color="blue" />

                {/* Segment 1 (Inactive) */}
                <div className="flex-1 py-1.5 px-4 text-center relative">
                   <span className="text-[13px] font-medium text-[#555555]">Day</span>
                </div>

                {/* Segment 2 (Active) */}
                <div className="flex-1 py-1.5 px-4 text-center bg-white rounded-[8px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative">
                   <span className="text-[13px] font-semibold text-gray-900">Week</span>
                   
                   {/* Active Annotations */}
                   <Annotation key="active-r" type="horizontal" label="R: 8px" size="8px" className="bottom-[-20px] left-0 w-8 h-4" />
                   <Annotation key="active-shadow" type="vertical" label="Shadow: 0 1px 3px 0.1" size="30px" className="top-0 right-[-80px] h-[30px] w-4" color="blue" />
                   <div className="absolute inset-0 border border-red-500 border-dotted rounded-[8px] pointer-events-none"></div>
                </div>

                {/* Segment 3 (Inactive) */}
                <div className="flex-1 py-1.5 px-4 text-center relative">
                   <span className="text-[13px] font-medium text-[#555555]">Month</span>
                </div>

                {/* Height Annotation */}
                <Annotation key="ctrl-h" type="vertical" label="32px (Content)" size="32px" className="top-[4px] right-[-30px] h-[32px] w-4" />
              </div>

              {/* Interaction Callouts */}
              <div className="mt-20 grid grid-cols-3 gap-8 w-full max-w-4xl">
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Base Container</p>
                  <p className="text-sm font-bold text-gray-900">Padding: 2px Internal</p>
                  <p className="text-sm font-bold text-gray-900">Background: #EEEEEE</p>
                  <p className="text-xs text-gray-500 mt-1 italic font-mono">overflow: hidden</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-white border-b border-gray-100"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Active State</p>
                  <p className="text-sm font-bold text-gray-900">Background: #FFFFFF</p>
                  <p className="text-sm font-bold text-gray-900 font-mono">shadow-sm (0 1px 3px)</p>
                  <p className="text-xs text-gray-500 mt-1 font-black text-primary uppercase">Font: Semibold</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Typography</p>
                  <p className="text-sm font-bold text-gray-900 italic flex items-center gap-2">
                    <Layers size={14} className="text-primary" />
                    Wanted Sans
                  </p>
                  <p className="text-sm font-bold text-gray-900">Inactive: #555555</p>
                  <p className="text-xs text-gray-500 mt-1">Size: 13px (0.8125rem)</p>
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
               Segmented controls are used for high-frequency navigation within a view. 
               Ensure that the transition between segments is smooth (200ms ease-in-out) to give a tactile feel to the selection.
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
