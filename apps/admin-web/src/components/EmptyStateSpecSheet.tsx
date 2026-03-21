import React from "react";
import { Info, Store, Plus, MousePointer2 } from "lucide-react";

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

export const EmptyStateSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[800px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Empty State Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Placeholder Feedback</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl space-y-12">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Standard Empty State</h2>
              <span className="text-sm font-bold text-gray-400">Centered Placeholder</span>
            </div>

            <div className="bg-gray-100 rounded-md p-24 relative border border-gray-200 shadow-inner flex flex-col items-center justify-center min-h-[400px]">
              {/* Empty State Component Simulation */}
              <div className="bg-white rounded-lg border border-dashed border-gray-300 w-full max-w-2xl min-h-[240px] flex flex-col items-center justify-center p-8 relative">
                
                {/* Min-height Annotation */}
                <Annotation key="min-h" type="vertical" label="min-height: 240px" size="240px" className="top-0 left-[-60px] h-full w-4" />

                <div className="flex flex-col items-center text-center max-w-md relative">
                  {/* Icon */}
                  <div className="mb-6 relative">
                    <Store size={64} className="text-[#BEBEBE]" />
                    <Annotation key="icon-size" type="horizontal" label="64px" size="64px" className="top-[-20px] left-0 w-full h-4" />
                    <div className="absolute inset-0 border-2 border-red-500 border-dotted rounded-sm pointer-events-none"></div>
                  </div>

                  {/* Title */}
                  <h3 className="text-[18px] font-semibold text-gray-900 mb-2 relative">
                    등록된 가게가 없습니다
                    <Annotation key="title-fs" type="vertical" label="18px Semibold" size="18px" className="top-0 right-[-100px] h-full w-4" />
                  </h3>

                  {/* Description */}
                  <div className="text-[14px] text-[#868686] mb-8 relative">
                    새로운 가게 정보를 등록하고 관리를 시작해보세요. <br />
                    언제든지 새로운 데이터를 추가할 수 있습니다.
                    <Annotation key="desc-fs" type="vertical" label="14px #868686" size="14px" className="top-0 right-[-100px] h-full w-4" />
                  </div>

                  {/* Action Button */}
                  <button className="bg-[#C31348] text-white px-8 py-3 rounded-[8px] text-[14px] font-black flex items-center gap-2 hover:bg-[#A00F3B] transition-colors shadow-lg relative">
                    <Plus size={18} />
                    가게 등록하기
                    <Annotation key="btn-radius" type="horizontal" label="R: 8px" size="8px" className="bottom-[-20px] right-0 w-8 h-4" />
                  </button>
                  
                  {/* Internal Gaps */}
                  <Annotation key="gap-1" type="vertical" label="24px" size="24px" className="top-[64px] left-1/2 -translate-x-1/2 h-6 w-4" />
                  <Annotation key="gap-2" type="vertical" label="8px" size="8px" className="top-[116px] left-1/2 -translate-x-1/2 h-2 w-4" />
                  <Annotation key="gap-3" type="vertical" label="32px" size="32px" className="top-[152px] left-1/2 -translate-x-1/2 h-8 w-4" />
                </div>
              </div>

              {/* Spec Details */}
              <div className="mt-16 grid grid-cols-3 gap-8 w-full max-w-4xl">
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 border-dashed border-t"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Structure</p>
                  <p className="text-sm font-bold text-gray-900">Min-height: 240px</p>
                  <p className="text-sm font-bold text-gray-900">Alignment: Flex Center</p>
                  <p className="text-xs text-gray-500 mt-1 italic">Usage: Content-area fallback</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-[#BEBEBE]"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Typography</p>
                  <p className="text-sm font-bold text-gray-900">Title: 18px / Semibold</p>
                  <p className="text-sm font-bold text-gray-900">Desc: 14px / #868686</p>
                  <p className="text-xs text-gray-500 mt-1">Font Family: Wanted Sans</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Visuals</p>
                  <p className="text-sm font-bold text-gray-900">Icon size: 64px</p>
                  <p className="text-sm font-bold text-gray-900">Primary Button: #C31348</p>
                  <p className="text-xs text-gray-500 mt-1">Border: 1px Dashed (Optional)</p>
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
               Empty states should always provide a clear call-to-action (CTA). 
               The illustration or icon must remain neutral (#BEBEBE) to avoid attracting too much visual attention compared to primary data.
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
