import React from "react";
import { Info, Smartphone, MousePointer2, ChevronDown } from "lucide-react";

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

export const BottomSheetSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[800px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Mobile Bottom Sheet Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Mobile Overlay UI</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 grid grid-cols-2 gap-12 bg-gray-100 shadow-inner overflow-hidden relative">
          {/* Left Side: Mobile Simulation */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit mb-4">
              <Smartphone size={20} className="text-gray-900" />
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter text-center">Contextual Preview (375x812)</h2>
            </div>
            
            <div className="w-[375px] h-[600px] bg-white rounded-[40px] border-[8px] border-gray-900 shadow-2xl relative overflow-hidden">
               {/* App Mock Content */}
               <div className="p-6 space-y-4 pt-12">
                  <div className="h-4 w-32 bg-gray-100 rounded-sm"></div>
                  <div className="h-32 w-full bg-gray-50 rounded-lg border border-gray-100"></div>
                  <div className="space-y-2">
                     <div className="h-3 w-full bg-gray-100 rounded-sm"></div>
                     <div className="h-3 w-[80%] bg-gray-100 rounded-sm"></div>
                  </div>
               </div>

               {/* Overlay */}
               <div className="absolute inset-0 bg-gray-900/20 z-10"></div>

               {/* Bottom Sheet */}
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[343px] bg-white rounded-t-[16px] shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-20 pb-8 transition-transform">
                  {/* Handle */}
                  <div className="w-full flex justify-center pt-2 pb-4">
                     <div className="w-[40px] h-[4px] bg-gray-200 rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="px-6 space-y-2">
                     <h3 className="text-lg font-black text-gray-900 tracking-tight">Confirm Action</h3>
                     <p className="text-sm font-medium text-gray-500 leading-relaxed mb-6">
                        This action will modify your production environment variables. Please confirm you have reviewed the changes before proceeding.
                     </p>
                  </div>

                  {/* Actions */}
                  <div className="px-6 mt-6 space-y-3">
                     <button className="w-full h-12 bg-[#C31348] text-white font-black rounded-lg shadow-lg shadow-primary/20">
                        Confirm Changes
                     </button>
                     <button className="w-full h-12 text-gray-500 font-bold hover:text-gray-900">
                        Dismiss
                     </button>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Side: Detailed Specs */}
          <div className="flex flex-col justify-center space-y-12">
            <div className="bg-white p-12 rounded-xl shadow-xl border border-gray-100 relative overflow-hidden min-h-[500px] flex items-end justify-center pb-0">
               <div className="absolute top-0 left-0 p-4 border-b border-r border-gray-100 rounded-br-lg bg-gray-50/50">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Technical Breakdown</span>
               </div>

               {/* Scaled Bottom Sheet Spec */}
               <div className="w-[343px] bg-white rounded-t-[16px] border-x border-t border-gray-200 shadow-2xl pb-12 relative">
                  {/* Drag Handle Spec */}
                  <div className="w-full flex justify-center pt-2 pb-4 relative">
                     <div className="w-[40px] h-[4px] bg-gray-200 rounded-full relative">
                        <Annotation key="handle-w" type="horizontal" label="40px" size="40px" className="top-[-16px] left-0 w-full h-4" />
                        <Annotation key="handle-h" type="vertical" label="4px" size="4px" className="top-0 right-[-40px] h-full w-4" />
                     </div>
                  </div>

                  {/* Content Spec */}
                  <div className="px-6 relative">
                     <div className="h-6 w-32 bg-gray-100 rounded-sm mb-4"></div>
                     <div className="space-y-2 mb-8">
                        <div className="h-3 w-full bg-gray-50 rounded-sm"></div>
                        <div className="h-3 w-full bg-gray-50 rounded-sm"></div>
                        <div className="h-3 w-[60%] bg-gray-50 rounded-sm"></div>
                     </div>

                     {/* Buttons Spec */}
                     <div className="space-y-3 relative">
                        <div className="w-full h-12 bg-primary/10 rounded-lg border border-dotted border-primary flex items-center justify-center">
                           <span className="text-[10px] font-black text-primary uppercase tracking-widest">Primary Stacked</span>
                        </div>
                        <div className="w-full h-12 bg-gray-50 rounded-lg border border-dotted border-gray-300 flex items-center justify-center">
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secondary Stacked</span>
                        </div>
                        
                        <Annotation key="btn-h" type="vertical" label="H: 48px" size="48px" className="top-0 right-[-80px] h-12 w-4" color="blue" />
                     </div>

                     {/* Padding Annotations */}
                     <Annotation key="pad-l" type="horizontal" label="24px" size="24px" className="top-1/2 left-0 w-6 h-4" />
                     <Annotation key="pad-r" type="horizontal" label="24px" size="24px" className="top-1/2 right-0 w-6 h-4" />
                  </div>

                  {/* Container Spec */}
                  <Annotation key="cont-w" type="horizontal" label="343px Width" size="343px" className="top-[-36px] left-0 w-full h-4" color="blue" />
                  <Annotation key="cont-r" type="horizontal" label="R: 16px (Top Only)" size="16px" className="top-0 left-0 w-8 h-4" />
               </div>
            </div>

            {/* Spec Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Typography & Layout</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900">Title: 18px / 900 Weight</p>
                  <p className="text-sm font-bold text-gray-900">Body: 14px / 500 Weight</p>
                  <p className="text-sm font-bold text-gray-900">Gap: 12px (Stacked Btns)</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Color Palette</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900">Primary: #C31348</p>
                  <p className="text-sm font-bold text-gray-900">Handle: #E5E7EB (Gray-200)</p>
                  <p className="text-sm font-bold text-gray-900">Overlay: rgba(17, 24, 39, 0.2)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Footer */}
        <div className="p-8 bg-gray-900 text-white flex items-center justify-between mt-auto">
           <div className="flex items-center gap-4">
             <div className="p-2 bg-primary rounded-xs">
               <Info size={18} />
             </div>
             <p className="text-sm font-medium opacity-80 max-w-2xl">
               Mobile bottom sheets should always animate from the baseline of the screen. The 343px width ensures a 16px horizontal margin on a standard 375px display, 
               maintaining optimal thumb-reachability for primary actions.
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
