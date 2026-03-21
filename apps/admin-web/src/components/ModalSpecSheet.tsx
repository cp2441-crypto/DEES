import React from "react";
import { Info, X, MousePointer2, Layout } from "lucide-react";

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

export const ModalSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[800px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Desktop Modal Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Overlay UI</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 flex flex-col items-center justify-center bg-gray-100 shadow-inner relative overflow-hidden">
          {/* Background Overlay Simulation */}
          <div className="absolute inset-0 bg-gray-900/10 pointer-events-none"></div>

          <div className="w-full max-w-5xl space-y-12 relative z-10">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit mb-12">
              <Layout size={20} className="text-gray-900" />
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Standard Desktop Modal</h2>
            </div>

            <div className="flex justify-center items-center">
              {/* Modal Container */}
              <div className="w-[400px] bg-white rounded-[16px] shadow-2xl border border-gray-200 overflow-hidden relative">
                
                {/* Close Button */}
                <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="p-6 pb-2">
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Delete Deployment</h3>
                </div>

                {/* Body */}
                <div className="p-6 pt-2">
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">
                    Are you sure you want to delete this deployment? This action cannot be undone and will permanently remove all associated logs and historical data.
                  </p>
                </div>

                {/* Footer */}
                <div className="p-6 pt-4 flex items-center justify-end gap-3 bg-gray-50/50 border-t border-gray-100">
                  <button className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
                    Cancel
                  </button>
                  <button className="px-5 py-2.5 bg-[#BF534E] text-white text-sm font-black rounded-lg shadow-lg shadow-red-900/10 hover:brightness-110 active:scale-95 transition-all">
                    Delete
                  </button>
                </div>

                {/* Padding Annotations */}
                {/* Horizontal Padding (Left) */}
                <Annotation key="pad-left" type="horizontal" label="24px" size="24px" className="top-[80px] left-0 w-6 h-4" />
                {/* Horizontal Padding (Right) */}
                <Annotation key="pad-right" type="horizontal" label="24px" size="24px" className="top-[80px] right-0 w-6 h-4" />
                {/* Vertical Padding (Top) */}
                <Annotation key="pad-top" type="vertical" label="24px" size="24px" className="top-0 left-1/2 -translate-x-1/2 h-6 w-4" />
                {/* Vertical Padding (Bottom) */}
                <Annotation key="pad-bottom" type="vertical" label="24px" size="24px" className="bottom-0 left-1/2 -translate-x-1/2 h-6 w-4" />

                {/* Inner Elements Spec */}
                <Annotation key="modal-w" type="horizontal" label="400px Width" size="400px" className="top-[-36px] left-0 w-full h-4" color="blue" />
                <Annotation key="modal-r" type="horizontal" label="R: 16px" size="16px" className="bottom-[-24px] left-0 w-8 h-4" />
                
                {/* Action Spec */}
                <div className="absolute bottom-[24px] right-[24px] pointer-events-none">
                   <Annotation key="btn-del" type="vertical" label="#BF534E" size="40px" className="top-0 right-[-100px] h-[40px] w-4" color="blue" />
                </div>

                {/* Shadow Annotation */}
                <div className="absolute top-1/2 right-[-120px] -translate-y-1/2 pointer-events-none flex flex-col items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-white shadow-2xl border border-gray-100 flex items-center justify-center">
                      <Layout size={16} className="text-gray-400" />
                   </div>
                   <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-xs border border-blue-100">Shadow: XL</span>
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
               Modals should always include a 10% black overlay (#000000 10) behind the container to focus user attention. 
               The 16px corner radius is standard for all floating containers within the DEES ecosystem.
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
