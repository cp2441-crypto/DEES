import React from "react";
import { Info, MousePointer2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const data = [
  { name: "Mon", value: 2400 },
  { name: "Tue", value: 1398 },
  { name: "Wed", value: 9800 },
  { name: "Thu", value: 3908 },
  { name: "Fri", value: 4800 },
  { name: "Sat", value: 3800 },
  { name: "Sun", value: 4300 },
];

const Annotation = ({ type, size, label, className = "", color = "red", style = {} }: { type: 'horizontal' | 'vertical', size: string, label: string, className?: string, color?: string, style?: React.CSSProperties }) => {
  const borderClass = color === "red" ? "border-red-500" : "border-blue-500";
  const textClass = color === "red" ? "text-red-600" : "text-blue-600";
  const bgClass = color === "red" ? "bg-white border-red-100" : "bg-white border-blue-100";

  return (
    <div className={`absolute flex items-center justify-center pointer-events-none ${className}`} style={style}>
      {type === 'horizontal' ? (
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center w-full">
            <div className={`h-2 w-[1px] ${borderClass.replace('border-', 'bg-')}`}></div>
            <div className={`h-[1px] flex-1 border-t border-dotted ${borderClass}`}></div>
            <div className={`h-2 w-[1px] ${borderClass.replace('border-', 'bg-')}`}></div>
          </div>
          <span className={`text-[9px] font-bold ${textClass} ${bgClass} px-1 -mt-1 rounded-xs border shadow-xs`}>{label}</span>
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

export const ChartSpecSheet = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[1024px] flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Chart Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Data Visualization</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 space-y-16">
          {/* Chart Component Spec */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Line Chart Container</h2>
              <span className="text-sm font-bold text-gray-400">Standard Container</span>
            </div>
            
            <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner overflow-hidden flex flex-col items-center">
              <div className="w-full max-w-5xl bg-white rounded-[12px] border border-[#DEDEDE] overflow-hidden flex flex-col relative">
                {/* Chart Header */}
                <div className="p-4 flex items-center justify-between border-b border-gray-50">
                  <span className="text-sm font-black text-gray-900">Weekly Revenue Analysis</span>
                  <div className="flex items-center gap-2">
                    {['Daily', 'Weekly', 'Monthly'].map((period) => (
                      <button 
                        key={period}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${
                          period === 'Weekly' ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-900'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart Body */}
                <div className="p-4 h-[400px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} key="main-area-chart">
                      <defs key="defs">
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1" key="gradient">
                          <stop key="stop-1" offset="5%" stopColor="#C31348" stopOpacity={0.1}/>
                          <stop key="stop-2" offset="95%" stopColor="#C31348" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid key="grid" vertical={false} stroke="#DEDEDE" strokeDasharray="3 3" />
                      <XAxis 
                        key="x-axis"
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fontWeight: 700, fill: '#9ca3af'}} 
                        dy={10}
                      />
                      <YAxis 
                        key="y-axis"
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fontWeight: 700, fill: '#9ca3af'}}
                      />
                      <Tooltip 
                        key="tooltip"
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-[#1B1B1B] text-white p-3 rounded-[8px] shadow-2xl border border-white/10" key="tooltip-content">
                                <p className="text-[10px] font-black opacity-50 uppercase mb-1">{payload[0].payload.name}</p>
                                <p className="text-sm font-black text-primary">${payload[0].value.toLocaleString()}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area 
                        key="area"
                        type="monotone" 
                        dataKey="value" 
                        stroke="#C31348" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>

                  {/* Internal Padding Annotations */}
                  <Annotation key="pad-h" type="horizontal" label="16px" size="16px" className="top-4 left-0 w-4 h-4" />
                  <Annotation key="pad-v" type="vertical" label="16px" size="16px" className="top-0 left-4 h-4 w-4" />
                </div>

                {/* Radius Annotation */}
                <div key="radius-note" className="absolute -top-1 -right-1 flex flex-col items-end">
                  <div className="size-4 border-2 border-red-500 rounded-[12px] border-dotted"></div>
                  <span className="text-[8px] font-black text-red-500 mt-1">R: 12px</span>
                </div>
              </div>

              {/* Spec Details */}
              <div className="mt-16 grid grid-cols-3 gap-8 w-full max-w-5xl">
                <div className="bg-white p-6 rounded-sm border border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Visual Style</p>
                  <p className="text-sm font-bold text-gray-900">Stroke: #C31348 (2px)</p>
                  <p className="text-sm font-bold text-gray-900">Area Fill: Primary 10% → 0%</p>
                  <p className="text-xs text-gray-500 mt-2">Grid: 1px #DEDEDE (Horizontal only)</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Interactivity</p>
                  <p className="text-sm font-bold text-gray-900 italic flex items-center gap-2">
                    <MousePointer2 size={14} className="text-primary" />
                    Dark Tooltip State
                  </p>
                  <div className="mt-3 bg-[#1B1B1B] p-2 rounded-[8px] inline-block border border-white/10">
                     <p className="text-[8px] font-black text-white/50 uppercase">Tooltip Example</p>
                     <p className="text-xs font-black text-primary">$12,000</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Radius: 8px / BG: #1B1B1B</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Filters</p>
                  <p className="text-sm font-bold text-gray-900">Active Chip: #C31348</p>
                  <p className="text-xs text-gray-500 mt-2">Inactive: text-gray-400</p>
                  <p className="text-xs text-gray-500 italic">Font size: 11px Bold</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-900 text-white flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="p-2 bg-primary rounded-xs">
               <Info size={18} />
             </div>
             <p className="text-sm font-medium opacity-80 max-w-2xl">
               Charts use the Recharts library. The color palette is strictly derived from the primary brand color. 
               Ensure responsiveness by wrapping in ResponsiveContainer and providing an aspect ratio for mobile screens.
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
