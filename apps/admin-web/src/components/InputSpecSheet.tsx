import React from "react";
import { Info, Search, AlertCircle, ChevronDown, Check, MousePointer2, Type } from "lucide-react";

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

export const InputSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[1024px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Input Field Guidelines</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Form Controls</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 space-y-24">
          
          {/* Text Input States */}
          <section className="space-y-12">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <Type size={20} className="text-gray-900" />
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Text Input States</h2>
            </div>

            <div className="grid grid-cols-3 gap-12">
              {/* Default State */}
              <div className="space-y-6">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block text-center">Default</span>
                <div className="bg-gray-50 p-12 rounded-xl border border-gray-100 relative flex flex-col items-center">
                  <div className="w-full relative">
                    <label className="text-xs font-black text-gray-900 uppercase tracking-tight mb-2 block ml-1">Email Address</label>
                    <div className="h-[48px] w-full bg-white border border-gray-200 rounded-[12px] px-4 flex items-center shadow-xs">
                      <span className="text-sm font-medium text-gray-400 italic">Enter your email...</span>
                    </div>
                  </div>
                  <Annotation type="vertical" label="H: 48px" size="48px" className="top-20 right-4 h-[48px] w-4" color="blue" />
                  <Annotation type="horizontal" label="P: 16px" size="16px" className="bottom-8 left-12 w-4 h-4" />
                </div>
              </div>

              {/* Focused State */}
              <div className="space-y-6">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest block text-center">Focused</span>
                <div className="bg-gray-50 p-12 rounded-xl border border-gray-100 relative flex flex-col items-center">
                  <div className="w-full relative">
                    <label className="text-xs font-black text-gray-900 uppercase tracking-tight mb-2 block ml-1">Email Address</label>
                    <div className="h-[48px] w-full bg-white border-2 border-[#C31348] rounded-[12px] px-4 flex items-center shadow-lg shadow-primary/5">
                      <span className="text-sm font-bold text-gray-900">admin@dees.com</span>
                      <div className="w-[1.5px] h-5 bg-[#C31348] ml-0.5 animate-pulse"></div>
                    </div>
                  </div>
                  <Annotation type="horizontal" label="Border: 2px #C31348" size="40px" className="bottom-6 left-1/2 -translate-x-1/2 w-40 h-4" color="blue" />
                </div>
              </div>

              {/* Error State */}
              <div className="space-y-6">
                <span className="text-[10px] font-black text-[#BF534E] uppercase tracking-widest block text-center">Error</span>
                <div className="bg-gray-50 p-12 rounded-xl border border-gray-100 relative flex flex-col items-center">
                  <div className="w-full relative">
                    <label className="text-xs font-black text-[#BF534E] uppercase tracking-tight mb-2 block ml-1">Email Address</label>
                    <div className="h-[48px] w-full bg-white border border-[#BF534E] rounded-[12px] px-4 flex items-center pr-10 relative">
                      <span className="text-sm font-bold text-[#BF534E]">admin@invalid</span>
                      <AlertCircle size={18} className="absolute right-4 text-[#BF534E]" />
                    </div>
                    <p className="text-[10px] font-bold text-[#BF534E] mt-2 ml-1">Please enter a valid email address.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Combo Box Section */}
          <section className="space-y-12 pb-20">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <Search size={20} className="text-gray-900" />
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Combo Box (Dropdown)</h2>
            </div>

            <div className="bg-gray-100 rounded-xl p-20 flex justify-center relative shadow-inner overflow-hidden border border-gray-200">
              <div className="w-[400px] relative z-20">
                <label className="text-xs font-black text-gray-900 uppercase tracking-tight mb-2 block ml-1">Select Environment</label>
                
                {/* Search Input */}
                <div className="h-[48px] w-full bg-white border-2 border-[#C31348] rounded-[12px] px-4 flex items-center shadow-lg shadow-primary/10 mb-2">
                  <Search size={18} className="text-gray-400 mr-3" />
                  <span className="text-sm font-bold text-gray-900 flex-1">Prod</span>
                  <div className="w-[1.5px] h-5 bg-[#C31348] ml-0.5 animate-pulse mr-2"></div>
                  <ChevronDown size={18} className="text-gray-400" />
                </div>

                {/* Dropdown Menu */}
                <div className="bg-white border border-gray-100 rounded-[12px] shadow-2xl overflow-hidden py-2 absolute w-full top-[calc(100%+4px)]">
                  <div className="px-4 py-3 bg-[#FFEEF2] flex items-center justify-between group cursor-pointer border-l-4 border-primary">
                    <div className="flex items-center">
                       <span className="text-sm font-black text-primary">Prod</span>
                       <span className="text-sm font-medium text-gray-400 ml-0.5">uction</span>
                    </div>
                    <Check size={16} className="text-primary" />
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between group cursor-pointer transition-colors border-l-4 border-transparent">
                    <div className="flex items-center">
                       <span className="text-sm font-black text-gray-900">Prod</span>
                       <span className="text-sm font-medium text-gray-400 ml-0.5">uct_API_V2</span>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between group cursor-pointer transition-colors border-l-4 border-transparent">
                    <div className="flex items-center">
                       <span className="text-sm font-medium text-gray-900">Staging_Environment</span>
                    </div>
                  </div>
                  <div className="px-4 py-1 border-t border-gray-50 mt-1">
                    <button className="text-[10px] font-black text-primary uppercase tracking-widest w-full text-left px-3 py-2 hover:bg-primary/5 rounded-md transition-all">
                      + Create New Environment
                    </button>
                  </div>
                </div>

                {/* Annotations for Combo Box */}
                <Annotation type="horizontal" label="W: 400px" size="400px" className="top-[-36px] left-0 w-full h-4" color="blue" />
                <Annotation type="horizontal" label="R: 12px" size="12px" className="bottom-[-160px] left-0 w-8 h-4" />
                <div className="absolute right-[-140px] top-1/2 -translate-y-1/2">
                   <Annotation type="vertical" label="Highlight: #FFEEF2" size="44px" className="h-[44px] w-4" color="blue" />
                </div>
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
               Input heights are standardized at 48px to maintain vertical rhythm with Large buttons. 
               The 12px corner radius is enforced on both inputs and dropdown containers for visual cohesion.
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
