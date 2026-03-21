import React from "react";
import { ArrowLeftRight, ArrowUpDown, Info } from "lucide-react";

const Annotation = ({ type, size, label, className = "" }: { type: 'horizontal' | 'vertical', size: string, label: string, className?: string }) => {
  return (
    <div className={`absolute flex items-center justify-center pointer-events-none ${className}`}>
      {type === 'horizontal' ? (
        <div className="flex flex-col items-center">
          <div className="flex items-center w-full">
            <div className="h-2 w-[1px] bg-red-500"></div>
            <div className="h-[1px] flex-1 border-t border-dotted border-red-500"></div>
            <div className="h-2 w-[1px] bg-red-500"></div>
          </div>
          <span className="text-[10px] font-bold text-red-600 bg-white px-1 -mt-1 rounded-xs border border-red-100 shadow-xs">{label}</span>
        </div>
      ) : (
        <div className="flex items-center h-full">
          <div className="flex flex-col items-center h-full">
            <div className="w-2 h-[1px] bg-red-500"></div>
            <div className="w-[1px] flex-1 border-l border-dotted border-red-500"></div>
            <div className="w-2 h-[1px] bg-red-500"></div>
          </div>
          <span className="text-[10px] font-bold text-red-600 bg-white px-1 ml-1 rounded-xs border border-red-100 shadow-xs whitespace-nowrap">{label}</span>
        </div>
      )}
    </div>
  );
};

export const SpacingSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[1024px] flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Spacing & Layout Guide</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Grid System</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">8pt Grid Base</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Desktop Spec */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Desktop Spec</h2>
              <span className="text-sm font-bold text-gray-400">1440px+</span>
            </div>
            
            <div className="bg-gray-100 rounded-md p-8 relative border border-gray-200 aspect-[4/3] flex flex-col shadow-inner overflow-hidden">
              {/* Desktop Container Simulation */}
              <div className="flex-1 bg-white rounded-xs border border-gray-300 relative flex flex-col p-8 gap-8 overflow-hidden">
                {/* Annotations for Padding */}
                <Annotation type="horizontal" label="32px" size="32px" className="top-0 left-0 w-8 h-8" />
                <Annotation type="vertical" label="32px" size="32px" className="top-0 left-0 w-8 h-8 flex-col" />
                
                {/* Section 1 */}
                <div className="flex flex-col gap-5 relative">
                  <div className="h-12 w-full bg-gray-50 border border-gray-200 rounded-xs flex items-center px-4">
                    <div className="size-4 bg-gray-200 rounded-full mr-3"></div>
                    <div className="h-2 w-32 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-5 relative">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-24 bg-gray-50 border border-gray-200 rounded-xs"></div>
                    ))}
                    {/* Component Gap Annotation */}
                    <Annotation type="horizontal" label="20px" size="20px" className="top-1/2 left-[33.33%] -translate-x-1/2 w-5 h-4" />
                  </div>
                </div>

                {/* Section Gap Annotation */}
                <Annotation type="vertical" label="32px" size="32px" className="top-[188px] left-12 h-8 w-4" />

                {/* Section 2 */}
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xs p-5 relative overflow-hidden">
                   <div className="h-4 w-48 bg-gray-200 rounded-full mb-4"></div>
                   <div className="space-y-3">
                     <div className="h-2 w-full bg-gray-200/50 rounded-full"></div>
                     <div className="h-2 w-full bg-gray-200/50 rounded-full"></div>
                     <div className="h-2 w-2/3 bg-gray-200/50 rounded-full"></div>
                   </div>
                </div>
              </div>

              {/* Legend Overlay for Desktop */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 border border-gray-200 rounded-sm shadow-sm space-y-2">
                <div className="flex items-center gap-3">
                  <div className="size-3 border border-red-500 border-dotted bg-red-50"></div>
                  <span className="text-xs font-bold text-gray-700">Padding: <span className="text-primary font-black">32px</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-3 border border-red-500 border-dotted bg-red-50"></div>
                  <span className="text-xs font-bold text-gray-700">Section Gap: <span className="text-primary font-black">32px</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-3 border border-red-500 border-dotted bg-red-50"></div>
                  <span className="text-xs font-bold text-gray-700">Component Gap: <span className="text-primary font-black">20px</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Spec */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Mobile Spec</h2>
              <span className="text-sm font-bold text-gray-400">375px</span>
            </div>

            <div className="bg-gray-100 rounded-md p-8 relative border border-gray-200 aspect-[4/3] flex justify-center shadow-inner overflow-hidden">
              {/* Mobile Device Simulation */}
              <div className="w-[280px] bg-white rounded-lg border-4 border-gray-900 relative flex flex-col p-4 gap-6 overflow-hidden">
                {/* Annotations for Padding */}
                <Annotation type="horizontal" label="16px" size="16px" className="top-0 left-0 w-4 h-4" />
                <Annotation type="vertical" label="16px" size="16px" className="top-0 left-0 w-4 h-4 flex-col" />

                {/* Mobile Section 1 */}
                <div className="flex flex-col gap-4 relative">
                  <div className="h-10 w-full bg-gray-50 border border-gray-200 rounded-xs flex items-center px-3">
                    <div className="size-3 bg-gray-200 rounded-full mr-2"></div>
                    <div className="h-1.5 w-24 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 relative">
                    {[1, 2].map(i => (
                      <div key={i} className="h-20 bg-gray-50 border border-gray-200 rounded-xs"></div>
                    ))}
                    {/* Component Gap Annotation */}
                    <Annotation type="horizontal" label="16px" size="16px" className="top-1/2 left-1/2 -translate-x-1/2 w-4 h-4" />
                  </div>
                </div>

                {/* Section Gap Annotation */}
                <Annotation type="vertical" label="24px" size="24px" className="top-[164px] left-6 h-6 w-4" />

                {/* Mobile Section 2 */}
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xs p-4 relative overflow-hidden">
                   <div className="h-3 w-32 bg-gray-200 rounded-full mb-3"></div>
                   <div className="space-y-2">
                     <div className="h-1.5 w-full bg-gray-200/50 rounded-full"></div>
                     <div className="h-1.5 w-full bg-gray-200/50 rounded-full"></div>
                     <div className="h-1.5 w-3/4 bg-gray-200/50 rounded-full"></div>
                   </div>
                </div>
              </div>

              {/* Legend Overlay for Mobile */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 border border-gray-200 rounded-sm shadow-sm space-y-2">
                <div className="flex items-center gap-3">
                  <div className="size-3 border border-red-500 border-dotted bg-red-50"></div>
                  <span className="text-xs font-bold text-gray-700">Padding: <span className="text-primary font-black">16px</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-3 border border-red-500 border-dotted bg-red-50"></div>
                  <span className="text-xs font-bold text-gray-700">Section Gap: <span className="text-primary font-black">24px</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-3 border border-red-500 border-dotted bg-red-50"></div>
                  <span className="text-xs font-bold text-gray-700">Component Gap: <span className="text-primary font-black">16px</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-8 bg-gray-900 text-white flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="p-2 bg-primary rounded-xs">
               <Info size={18} />
             </div>
             <p className="text-sm font-medium opacity-80 max-w-2xl">
               Always align to the 8pt grid base. For tighter interfaces, use 4px (0.5x) or 12px (1.5x) increments sparingly. 
               All responsive layouts must transition at 768px (Tablet) and 1280px (Desktop L).
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
