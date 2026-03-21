import React from "react";
import { Info, Tag, MousePointer2, Award } from "lucide-react";

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

export const BadgeSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[800px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Badge Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Information UI</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 space-y-20">
          
          {/* Status Badges */}
          <section className="space-y-12">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <Tag size={20} className="text-gray-900" />
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Status Badges</h2>
            </div>

            <div className="bg-gray-100 rounded-xl p-16 flex items-center justify-around relative shadow-inner border border-gray-200">
               {/* 운영 */}
               <div className="flex flex-col items-center gap-4 relative">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">운영 (Operating)</span>
                  <div className="h-[24px] px-3 bg-[#FFEEF2] text-[#820A30] text-[11px] font-black rounded-full flex items-center justify-center relative shadow-xs">
                     운영
                     <Annotation type="vertical" label="H: 24px" size="24px" className="top-0 right-[-40px] h-full w-4" />
                     <Annotation type="horizontal" label="Pill Radius" size="12px" className="bottom-[-20px] left-0 w-8 h-4" />
                  </div>
               </div>

               {/* 휴점 */}
               <div className="flex flex-col items-center gap-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">휴점 (Paused)</span>
                  <div className="h-[24px] px-3 bg-[#FFF7ED] text-[#C2410C] text-[11px] font-black rounded-full flex items-center justify-center shadow-xs">
                     휴점
                  </div>
               </div>

               {/* 폐점 */}
               <div className="flex flex-col items-center gap-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">폐점 (Closed)</span>
                  <div className="h-[24px] px-3 bg-[#F3F4F6] text-[#4B5563] text-[11px] font-black rounded-full flex items-center justify-center shadow-xs">
                     폐점
                  </div>
               </div>
               
               <div className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-gray-100 shadow-sm">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter italic">Usage: Store Management</p>
               </div>
            </div>
          </section>

          {/* Product Badges */}
          <section className="space-y-12 pb-20">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <Award size={20} className="text-gray-900" />
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Product Badges</h2>
            </div>

            <div className="bg-gray-100 rounded-xl p-16 flex items-center justify-around relative shadow-inner border border-gray-200">
               {/* SOLD OUT */}
               <div className="flex flex-col items-center gap-4 relative">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inventory State</span>
                  <div className="h-[24px] px-3 bg-gray-900 text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-md">
                     SOLD OUT
                  </div>
               </div>

               {/* PICK */}
               <div className="flex flex-col items-center gap-4 relative">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Promotion</span>
                  <div className="h-[24px] px-3 bg-[#FFEEF2] text-[#C31348] text-[11px] font-black rounded-full flex items-center justify-center shadow-xs relative">
                     PICK
                     <Annotation type="horizontal" label="P: 12px" size="12px" className="bottom-[-20px] left-0 w-4 h-4" />
                  </div>
               </div>

               {/* BEST */}
               <div className="flex flex-col items-center gap-4 relative">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bestseller</span>
                  <div className="h-[24px] px-3 bg-[#612916] text-[#FEFDF2] text-[11px] font-black rounded-full flex items-center justify-center shadow-md">
                     BEST
                  </div>
               </div>

               <div className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-gray-100 shadow-sm">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter italic">Usage: Catalog UI</p>
               </div>
            </div>
          </section>
          
          {/* Spec Summary */}
          <div className="grid grid-cols-3 gap-8 pb-12">
             <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Geometry</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900">Height: 24px (Fixed)</p>
                  <p className="text-sm font-bold text-gray-900">Padding: 12px (Horizontal)</p>
                  <p className="text-sm font-bold text-gray-900">Radius: 9999px (Pill)</p>
                </div>
             </div>
             <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Typography</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900">Size: 11px / 0.68rem</p>
                  <p className="text-sm font-bold text-gray-900">Weight: 900 (Black)</p>
                  <p className="text-sm font-bold text-gray-900">Leading: Tight</p>
                </div>
             </div>
             <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Accessibility</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900">Contrast: Ratio 4.5:1 min</p>
                  <p className="text-sm font-bold text-gray-900">Shadow: Inner / Drop (xs)</p>
                  <p className="text-xs text-gray-500 mt-1 italic tracking-tight uppercase font-black">WCAG 2.1 Compliant</p>
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
               Badges are designed to convey high-level status or product attributes at a glance. They should not be used as interactive elements; 
               for interactive tagging, use the Chip or Tag components instead.
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
