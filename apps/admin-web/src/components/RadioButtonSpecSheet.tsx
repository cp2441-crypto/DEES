import React from "react";
import { Info, MousePointer2, Circle, CheckCircle2 } from "lucide-react";

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

export const RadioButtonSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[800px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Radio Button Spec Sheet</h1>
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
              <Circle size={20} className="text-gray-900" />
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Radio Buttons</h2>
              <span className="text-sm font-bold text-gray-400">Single Selection Inputs</span>
            </div>

            <div className="bg-gray-100 rounded-md p-24 relative border border-gray-200 shadow-inner grid grid-cols-2 gap-24">
              
              {/* Detailed Annotated View */}
              <div className="flex flex-col items-center justify-center bg-white p-12 rounded-xl shadow-sm border border-gray-200 relative">
                 <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Construction</span>
                 </div>

                 <div className="flex flex-col gap-12 items-start relative">
                    {/* Selected Radio Button Construction */}
                    <div className="flex items-center gap-4 group">
                       <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#C31348] flex items-center justify-center relative bg-white">
                          <div className="w-[8px] h-[8px] rounded-full bg-[#C31348]"></div>
                          
                          {/* Circle Specs */}
                          <Annotation key="radio-w" type="horizontal" label="20px" size="20px" className="top-[-32px] left-0 w-full h-4" />
                          <Annotation key="radio-h" type="vertical" label="20px" size="20px" className="top-0 right-[-32px] h-full w-4" />
                          <div className="absolute inset-0 border border-red-500 border-dotted rounded-full pointer-events-none scale-110"></div>
                          
                          {/* Dot Specs */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <Annotation key="dot-w" type="horizontal" label="8px Dot" size="8px" className="bottom-[-24px] left-1/2 -translate-x-1/2 w-4 h-4" color="blue" />
                          </div>
                       </div>
                       <span className="text-sm font-black text-gray-900">Selected Option</span>
                    </div>

                    {/* Unselected Radio Button Construction */}
                    <div className="flex items-center gap-4">
                       <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#BEBEBE] bg-white relative">
                          <Annotation key="stroke-w" type="vertical" label="1.5px Stroke" size="20px" className="top-0 left-[-60px] h-full w-4" color="blue" />
                       </div>
                       <span className="text-sm font-bold text-[#555555]">Unselected Option</span>
                    </div>
                 </div>
              </div>

              {/* Vertical Group View */}
              <div className="flex flex-col items-center justify-center bg-white p-12 rounded-xl shadow-sm border border-gray-200 relative">
                 <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Vertical Grouping</span>
                 </div>

                 <div className="flex flex-col gap-[12px] relative w-full max-w-[200px]">
                    {/* Item 1 (Selected) */}
                    <div className="flex items-center gap-3">
                       <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#C31348] flex items-center justify-center shrink-0">
                          <div className="w-[8px] h-[8px] rounded-full bg-[#C31348]"></div>
                       </div>
                       <span className="text-sm font-black text-gray-900">Apple Pay</span>
                    </div>

                    {/* Gap Annotation */}
                    <Annotation key="group-gap" type="vertical" label="12px Gap" size="12px" className="top-[20px] left-[4px] h-[12px] w-4" />

                    {/* Item 2 (Unselected) */}
                    <div className="flex items-center gap-3">
                       <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#BEBEBE] shrink-0"></div>
                       <span className="text-sm font-bold text-gray-600">Credit Card</span>
                    </div>

                    {/* Item 3 (Disabled) */}
                    <div className="flex items-center gap-3 opacity-40">
                       <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#DEDEDE] shrink-0 bg-gray-50"></div>
                       <span className="text-sm font-medium text-gray-400">PayPal (Unavailable)</span>
                    </div>
                 </div>
              </div>

            </div>

            {/* Spec Cards */}
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Dimensions</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900">Outer: 20px Diameter</p>
                  <p className="text-sm font-bold text-gray-900">Inner: 8px Diameter</p>
                  <p className="text-sm font-bold text-gray-900">Stroke: 1.5px Solid</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Color Palette</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900 italic flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#C31348]"></div> Active: #C31348</p>
                  <p className="text-sm font-bold text-gray-900 italic flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#BEBEBE]"></div> Normal: #BEBEBE</p>
                  <p className="text-sm font-bold text-gray-900 italic flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#DEDEDE]"></div> Disabled: #DEDEDE</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Spacing & Layout</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900">Vertical Gap: 12px</p>
                  <p className="text-sm font-bold text-gray-900">Horizontal Label: 12px</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase font-black">Align: Center Left</p>
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
               Radio buttons are for mutually exclusive options within a group. 
               Always ensure the clickable area includes the label to maximize the touch/click target (min 44px height recommended).
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
