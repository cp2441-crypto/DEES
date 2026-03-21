import React from "react";
import { Info, UploadCloud, FileText, X, MousePointer2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

export const FileUploadSpecSheet = () => {
  const sampleImages = [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzM5ODE0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1735982715522-e20248a226dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBhYnN0cmFjdCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzQwMjMzMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1617597835919-3fdbf6efe48d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYXJjaGl0ZWN0dXJlJTIwZGV0YWlsfGVufDF8fHx8MTc3NDAyMzMzN3ww&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[800px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">File Upload Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Media & Assets</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 space-y-24 flex flex-col items-center">
          <div className="w-full max-w-5xl space-y-12">
            
            {/* 1. Default UI */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
                <UploadCloud size={20} className="text-gray-900" />
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Default State</h2>
              </div>
              <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner">
                <div className="w-full min-h-[160px] bg-white rounded-[12px] border-2 border-dashed border-[#BEBEBE] flex flex-col items-center justify-center p-8 relative">
                   <UploadCloud size={40} className="text-[#BEBEBE] mb-4" />
                   <div className="text-center">
                     <p className="text-sm font-black text-gray-900">Click to upload or drag and drop</p>
                     <p className="text-xs font-bold text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                   </div>

                   {/* Annotations */}
                   <Annotation key="def-h" type="vertical" label="Min Height: 160px" size="160px" className="top-0 right-[-100px] h-full w-4" />
                   <Annotation key="def-r" type="horizontal" label="R: 12px" size="12px" className="top-[-24px] left-0 w-8 h-4" />
                   <Annotation key="def-stroke" type="vertical" label="2px Dashed #BEBEBE" size="40px" className="top-1/2 left-[-110px] h-[40px] w-4" color="blue" />
                   <div className="absolute inset-0 border border-red-500 border-dotted rounded-[12px] pointer-events-none"></div>

                   <div className="absolute top-[32px] left-1/2 -translate-x-1/2 pointer-events-none">
                     <Annotation key="def-icon" type="horizontal" label="40px Icon" size="40px" className="top-[-20px] left-0 w-[40px] h-4" color="blue" />
                   </div>
                </div>
              </div>
            </div>

            {/* 2. Hover UI */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-primary pb-2 w-fit">
                <MousePointer2 size={20} className="text-primary" />
                <h2 className="text-2xl font-black text-primary uppercase tracking-tighter">Hover State</h2>
              </div>
              <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner">
                <div className="w-full min-h-[160px] bg-[#FFEEF2] rounded-[12px] border-2 border-dashed border-[#C31348] flex flex-col items-center justify-center p-8 transition-colors duration-200 relative">
                   <UploadCloud size={40} className="text-primary mb-4" />
                   <div className="text-center">
                     <p className="text-sm font-black text-primary underline decoration-2 underline-offset-4">Release to drop files</p>
                     <p className="text-xs font-bold text-primary/60 mt-1 font-mono">cursor: pointer</p>
                   </div>
                   
                   <Annotation key="hov-bg" type="vertical" label="BG: #FFEEF2" size="40px" className="top-0 right-[-100px] h-[40px] w-4" color="blue" />
                   <Annotation key="hov-stroke" type="vertical" label="Stroke: #C31348" size="40px" className="top-0 left-[-100px] h-[40px] w-4" color="red" />
                </div>
              </div>
            </div>

            {/* 3. Uploaded UI */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
                <FileText size={20} className="text-gray-900" />
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Uploaded Assets</h2>
              </div>
              <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner">
                <div className="w-full bg-white rounded-[12px] border-2 border-[#E5E7EB] p-8 relative">
                   <div className="flex flex-wrap gap-4">
                      {sampleImages.map((src, i) => (
                        <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-100 shadow-sm group">
                           <ImageWithFallback src={src} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <X size={16} className="text-white cursor-pointer" />
                           </div>
                           {i === 0 && (
                             <>
                               <Annotation key="img-size" type="horizontal" label="80 x 80 px" size="80px" className="top-[-24px] left-0 w-full h-4" />
                               <div className="absolute inset-0 border-2 border-red-500 border-dotted rounded-lg pointer-events-none"></div>
                             </>
                           )}
                        </div>
                      ))}
                      {/* Add more button */}
                      <button className="w-20 h-20 rounded-lg border-2 border-dashed border-[#BEBEBE] flex items-center justify-center text-[#BEBEBE] hover:text-primary hover:border-primary transition-colors">
                        <UploadCloud size={24} />
                      </button>
                   </div>
                   <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                           <FileText size={20} />
                         </div>
                         <div>
                           <p className="text-xs font-black text-gray-900">project-specifications.pdf</p>
                           <p className="text-[10px] font-bold text-gray-400">1.2 MB • Uploading 65%</p>
                         </div>
                      </div>
                      <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-primary rounded-full"></div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Technical Parameters */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Border Style</p>
                <p className="text-sm font-bold text-gray-900">Dashed (Dash: 4, Gap: 4)</p>
                <p className="text-sm font-bold text-gray-900">Width: 2px</p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Corner Radius</p>
                <p className="text-sm font-bold text-gray-900">Container: 12px</p>
                <p className="text-sm font-bold text-gray-900">Asset Thumb: 8px</p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Active Colors</p>
                <p className="text-sm font-bold text-gray-900 italic">BG: #FFEEF2</p>
                <p className="text-sm font-bold text-gray-900 italic">Stroke: #C31348</p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 border-dotted border-t"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Typography</p>
                <p className="text-sm font-bold text-gray-900 italic">Wanted Sans</p>
                <p className="text-xs text-gray-500 mt-1 uppercase font-black tracking-tighter">Sizes: 10px / 12px / 14px</p>
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
               File upload areas must be clearly interactive. The hover state uses the primary brand color (#C31348) to signal active focus. 
               Always show a list of uploaded files with removal options to maintain user control.
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
