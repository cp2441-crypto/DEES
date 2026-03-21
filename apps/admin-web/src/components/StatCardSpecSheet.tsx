import React from "react";
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, Info } from "lucide-react";

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

const StatCard = ({ label, value, trend, icon: Icon, isPositive, annotated = false }: any) => (
  <div className="relative bg-white border border-[#DEDEDE] rounded-[12px] p-5 flex flex-col gap-2 min-w-[200px] flex-1">
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-medium text-gray-500">{label}</span>
      <div className="p-2 bg-gray-50 rounded-full border border-gray-100">
        <Icon size={16} className="text-gray-400" />
      </div>
    </div>
    <div className="flex items-end justify-between gap-2">
      <span className="text-[22px] font-semibold text-gray-900 leading-none">{value}</span>
      <div className={`flex items-center gap-1 text-[11px] font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {trend}
      </div>
    </div>

    {annotated && (
      <>
        {/* Padding Annotations */}
        <Annotation key="pad-h" type="horizontal" label="20px" size="20px" className="top-[10px] left-0 w-5 h-4" />
        <Annotation key="pad-v" type="vertical" label="20px" size="20px" className="top-0 left-[10px] h-5 w-4" />
        
        {/* Radius Annotation */}
        <div key="radius" className="absolute -top-1 -right-1 flex flex-col items-end">
          <div className="size-4 border-2 border-red-500 rounded-[12px] border-dotted"></div>
          <span className="text-[8px] font-black text-red-500 mt-1">R: 12px</span>
        </div>

        {/* Font Spec Annotations */}
        <div key="fonts" className="absolute -bottom-8 left-0 flex flex-col gap-1">
          <span className="text-[8px] font-bold text-blue-500 bg-blue-50 px-1 border border-blue-100">Label: 12px</span>
          <span className="text-[8px] font-bold text-blue-500 bg-blue-50 px-1 border border-blue-100">Value: 22px Semibold</span>
        </div>
      </>
    )}
  </div>
);

export const StatCardSpecSheet = () => {
  const stats = [
    { id: "rev", label: "Total Revenue", value: "$42,500", trend: "+12.5%", icon: DollarSign, isPositive: true },
    { id: "usr", label: "Active Users", value: "1,284", trend: "+3.2%", icon: Users, isPositive: true },
    { id: "ord", label: "Total Orders", value: "856", trend: "-2.1%", icon: ShoppingCart, isPositive: false },
    { id: "con", label: "Conversion Rate", value: "4.8%", trend: "+0.4%", icon: Activity, isPositive: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[1024px] flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Stat Card Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Information Display</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 space-y-24">
          {/* Desktop Layout Spec */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Desktop Grid</h2>
              <span className="text-sm font-bold text-gray-400">Row (4 Cards)</span>
            </div>
            
            <div className="bg-gray-100 rounded-md p-20 relative border border-gray-200 shadow-inner overflow-hidden flex flex-col items-center">
              <div className="w-full max-w-5xl flex gap-4 relative">
                {stats.map((stat, i) => (
                  <React.Fragment key={stat.id}>
                    <StatCard {...stat} annotated={i === 0} />
                    {i < stats.length - 1 && (
                      <Annotation key={`gap-${i}`} type="horizontal" label="16px" size="16px" className="top-1/2 -translate-y-1/2 w-4 h-4" style={{ left: `calc(${(i+1)*25}% - 8px)` }} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Specs Details */}
              <div className="mt-16 grid grid-cols-4 gap-8 w-full max-w-5xl">
                <div className="bg-white p-4 rounded-sm border border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Border</p>
                  <p className="text-sm font-bold text-gray-900">1px Solid #DEDEDE</p>
                  <p className="text-xs text-gray-500 mt-1">Radius: 12px (Rounded-xl)</p>
                </div>
                <div className="bg-white p-4 rounded-sm border border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Padding</p>
                  <p className="text-sm font-bold text-gray-900">20px Internal (p-5)</p>
                  <p className="text-xs text-gray-500 mt-1">Uniform all sides</p>
                </div>
                <div className="bg-white p-4 rounded-sm border border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Typography</p>
                  <p className="text-sm font-bold text-gray-900">Value: 22px / Label: 12px</p>
                  <p className="text-xs text-gray-500 mt-1">Font-weight: Semibold/Medium</p>
                </div>
                <div className="bg-white p-4 rounded-sm border border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Layout</p>
                  <p className="text-sm font-bold text-gray-900">Gap: 16px (Horizontal)</p>
                  <p className="text-xs text-gray-500 mt-1">Flex-1 equal width</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout Spec */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Mobile Layout</h2>
              <span className="text-sm font-bold text-gray-400">Wrapping Grid</span>
            </div>

            <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner overflow-hidden flex justify-center">
              {/* Mobile Device Simulation */}
              <div className="w-[375px] bg-white border-[6px] border-gray-900 rounded-[32px] overflow-hidden shadow-2xl relative">
                <div className="h-6 bg-gray-900 w-1/3 mx-auto rounded-b-xl mb-6"></div>
                
                <div className="p-6">
                  <h3 className="text-lg font-black text-gray-900 mb-4">Overview</h3>
                  
                  <div className="flex flex-wrap gap-3 relative">
                    {stats.slice(0, 3).map((stat) => (
                      <div key={`mob-${stat.id}`} className="w-[calc(50%-6px)] last:w-full">
                        <StatCard {...stat} />
                      </div>
                    ))}
                    
                    {/* Wrap/Gap Annotations */}
                    <Annotation key="mob-gap-h" type="horizontal" label="12px" size="12px" className="top-12 left-[calc(50%-6px)] w-3 h-4" />
                    <Annotation key="mob-gap-v" type="vertical" label="12px" size="12px" className="top-24 left-1/2 h-3 w-4" />
                  </div>
                </div>
              </div>

              {/* Mobile Spec Labels */}
              <div className="absolute bottom-8 right-8 text-right space-y-4">
                <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-lg max-w-[200px]">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Mobile Behavior</p>
                  <p className="text-sm font-bold text-gray-900">Wrap with 12px Gap</p>
                  <p className="text-xs text-gray-500 italic mt-1">Cards stack into 2 columns or full width based on viewport.</p>
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
               Stat cards should use subtle transitions on hover. Icons are purely decorative and should use a gray-400 shade to avoid competing with values.
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
