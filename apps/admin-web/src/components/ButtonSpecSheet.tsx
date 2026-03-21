import React from "react";
import { Info, MousePointer2, Type, Smartphone } from "lucide-react";

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

export const ButtonSpecSheet = () => {
  const states = ['Default', 'Hover', 'Disabled'];
  
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[800px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Button Guidelines</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Core Interaction</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 space-y-20">
          {/* LG Matrix */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <Type size={20} className="text-gray-900" />
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Large (LG) - 48px</h2>
            </div>

            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-1"></div>
              {states.map(state => (
                <div key={state} className="text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{state}</span>
                </div>
              ))}

              {/* Primary LG */}
              <div className="flex items-center">
                <span className="text-sm font-black text-gray-900 uppercase tracking-tight">Primary</span>
              </div>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg relative">
                <button className="h-[48px] px-4 bg-[#C31348] text-white font-black rounded-[12px] shadow-lg shadow-primary/20 transition-all cursor-default">
                  Confirm Action
                </button>
                <Annotation type="vertical" label="H: 48px" size="48px" className="top-8 right-8 h-[48px] w-4" color="blue" />
                <Annotation type="horizontal" label="P: 16px" size="16px" className="bottom-4 left-[calc(50%-55px)] w-4 h-4" />
                <Annotation type="horizontal" label="P: 16px" size="16px" className="bottom-4 right-[calc(50%-55px)] w-4 h-4" />
                <Annotation type="horizontal" label="R: 12px" size="12px" className="top-8 left-[calc(50%-74px)] w-6 h-4" />
              </div>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <button className="h-[48px] px-4 bg-[#C31348] brightness-110 text-white font-black rounded-[12px] shadow-xl shadow-primary/30 transition-all cursor-default">
                  Confirm Action
                </button>
              </div>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <button className="h-[48px] px-4 bg-gray-100 text-gray-400 font-black rounded-[12px] transition-all cursor-not-allowed">
                  Confirm Action
                </button>
              </div>

              {/* Secondary LG */}
              <div className="flex items-center">
                <span className="text-sm font-black text-gray-900 uppercase tracking-tight">Secondary</span>
              </div>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <button className="h-[48px] px-4 bg-white border-[1.5px] border-[#C31348] text-[#C31348] font-black rounded-[12px] transition-all cursor-default">
                  Cancel Action
                </button>
              </div>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <button className="h-[48px] px-4 bg-[#FFEEF2] border-[1.5px] border-[#C31348] text-[#C31348] font-black rounded-[12px] transition-all cursor-default">
                  Cancel Action
                </button>
              </div>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <button className="h-[48px] px-4 bg-white border-[1.5px] border-gray-200 text-gray-300 font-black rounded-[12px] transition-all cursor-not-allowed">
                  Cancel Action
                </button>
              </div>

              {/* Ghost LG */}
              <div className="flex items-center">
                <span className="text-sm font-black text-gray-900 uppercase tracking-tight">Ghost</span>
              </div>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <button className="h-[48px] px-4 text-[#C31348] font-black rounded-[12px] transition-all cursor-default">
                  View Logs
                </button>
              </div>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <button className="h-[48px] px-4 bg-[#FFEEF2] text-[#C31348] font-black rounded-[12px] transition-all cursor-default">
                  View Logs
                </button>
              </div>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <button className="h-[48px] px-4 text-gray-300 font-black rounded-[12px] transition-all cursor-not-allowed">
                  View Logs
                </button>
              </div>
            </div>
          </section>

          {/* SM Matrix */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <Smartphone size={20} className="text-gray-900" />
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Small (SM) - 36px</h2>
            </div>

            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-1"></div>
              {states.map(state => (
                <div key={state} className="text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{state}</span>
                </div>
              ))}

              {/* Primary SM */}
              <div className="flex items-center">
                <span className="text-sm font-black text-gray-900 uppercase tracking-tight">Primary</span>
              </div>
              <div className="flex justify-center p-6 bg-gray-100 rounded-lg relative">
                <button className="h-[36px] px-3 bg-[#C31348] text-white font-black text-xs rounded-[8px] transition-all cursor-default">
                  Save
                </button>
                <Annotation type="vertical" label="H: 36px" size="36px" className="top-6 right-6 h-[36px] w-4" color="blue" />
                <Annotation type="horizontal" label="R: 8px" size="8px" className="top-6 left-[calc(50%-32px)] w-4 h-4" />
              </div>
              <div className="flex justify-center p-6 bg-gray-100 rounded-lg">
                <button className="h-[36px] px-3 bg-[#C31348] brightness-110 text-white font-black text-xs rounded-[8px] transition-all cursor-default">
                  Save
                </button>
              </div>
              <div className="flex justify-center p-6 bg-gray-100 rounded-lg">
                <button className="h-[36px] px-3 bg-gray-200 text-gray-400 font-black text-xs rounded-[8px] transition-all cursor-not-allowed">
                  Save
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Technical Footer */}
        <div className="p-8 bg-gray-900 text-white flex items-center justify-between mt-auto">
           <div className="flex items-center gap-4">
             <div className="p-2 bg-primary rounded-xs">
               <Info size={18} />
             </div>
             <p className="text-sm font-medium opacity-80 max-w-2xl">
               All buttons must follow the 8pt grid system. The 1.5px stroke on secondary buttons provides higher visual definition on high-density displays. 
               Primary buttons always feature a subtle shadow to emphasize elevation.
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
