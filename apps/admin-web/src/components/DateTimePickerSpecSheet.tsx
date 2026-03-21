import React from "react";
import { Info, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, MousePointer2 } from "lucide-react";

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

export const DateTimePickerSpecSheet = () => {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

  return (
    <div className="min-h-screen bg-gray-50 p-12 font-['Wanted_Sans']">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-h-[1024px] flex flex-col relative">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Date & Time Picker Spec Sheet</h1>
            <p className="text-gray-500 font-medium">DEES Admin Design System • v1.0</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded-sm border border-gray-100 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Component</p>
              <p className="text-sm font-bold text-gray-900 italic underline decoration-primary decoration-2 underline-offset-4">Input & Selection</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 space-y-24 flex flex-col items-center">
          <div className="w-full max-w-5xl space-y-16">
            
            {/* Calendar Picker Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
                <CalendarIcon size={20} className="text-gray-900" />
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Calendar Picker</h2>
              </div>
              
              <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner flex justify-center">
                <div className="w-[320px] bg-white rounded-[12px] shadow-xl border border-gray-100 p-4 relative">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-1 hover:bg-gray-50 rounded-md transition-colors text-gray-400">
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-black text-gray-900 uppercase tracking-tight">March 2026</span>
                    <button className="p-1 hover:bg-gray-50 rounded-md transition-colors text-gray-400">
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Days */}
                  <div className="grid grid-cols-7 mb-2">
                    {days.map(day => (
                      <div key={day} className="h-10 w-10 flex items-center justify-center text-[10px] font-black text-gray-400 uppercase">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-7 relative">
                    {/* Padding for month start */}
                    <div className="h-10 w-10"></div>
                    <div className="h-10 w-10"></div>
                    <div className="h-10 w-10"></div>
                    <div className="h-10 w-10"></div>
                    <div className="h-10 w-10"></div>
                    
                    {dates.slice(0, 20).map(date => {
                      const isActive = date === 20;
                      return (
                        <div key={date} className="h-10 w-10 flex items-center justify-center relative">
                          {isActive ? (
                            <div className="w-8 h-8 rounded-full bg-[#C31348] flex items-center justify-center text-white text-sm font-black shadow-lg shadow-primary/20">
                              {date}
                            </div>
                          ) : (
                            <span className="text-sm font-bold text-gray-600 hover:text-primary cursor-pointer transition-colors">{date}</span>
                          )}
                          
                          {isActive && (
                            <>
                              <Annotation key="cell-size" type="horizontal" label="40x40px" size="40px" className="top-[-20px] left-0 w-full h-4" />
                              <Annotation key="active-circle" type="vertical" label="#C31348 Circle" size="32px" className="top-1 right-[-60px] h-[32px] w-4" color="blue" />
                              <div className="absolute inset-0 border border-red-500 border-dotted pointer-events-none"></div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Container Specs */}
                  <Annotation key="cal-radius" type="horizontal" label="R: 12px" size="12px" className="top-[-24px] left-0 w-8 h-4" />
                  <Annotation key="cal-shadow" type="vertical" label="Shadow: XL" size="40px" className="bottom-0 left-[-80px] h-[40px] w-4" color="blue" />
                </div>
              </div>
            </div>

            {/* Time Picker Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b-2 border-gray-900 pb-2 w-fit">
                <Clock size={20} className="text-gray-900" />
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Time Picker</h2>
              </div>

              <div className="bg-gray-100 rounded-md p-16 relative border border-gray-200 shadow-inner flex justify-center">
                <div className="w-[180px] bg-white rounded-[12px] shadow-xl border border-gray-100 flex overflow-hidden relative h-[240px]">
                  {/* Hours List */}
                  <div className="flex-1 overflow-y-auto scrollbar-hide border-r border-gray-50 py-2">
                    <div className="px-2 mb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Hour</div>
                    {hours.map(h => (
                      <div key={h} className={`h-10 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors ${h === '09' ? 'bg-[#FFEEF2] text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        {h}
                        {h === '09' && (
                          <div className="absolute left-0 w-full h-10 border-y border-red-500/20 pointer-events-none"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Minutes List */}
                  <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
                    <div className="px-2 mb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Min</div>
                    {minutes.map(m => (
                      <div key={m} className={`h-10 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors ${m === '30' ? 'bg-[#FFEEF2] text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        {m}
                        {m === '30' && (
                          <>
                            <Annotation key="time-active" type="vertical" label="BG: #FFEEF2" size="40px" className="top-0 right-[-100px] h-[40px] w-4" color="blue" />
                            <Annotation key="item-h" type="horizontal" label="H: 40px" size="40px" className="top-[-16px] left-0 w-full h-4" />
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="absolute inset-0 pointer-events-none rounded-[12px] border border-red-500 border-dotted opacity-20"></div>
                </div>
              </div>
            </div>

            {/* Spec Cards */}
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Calendar Grid</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900">Columns: 7 Fixed</p>
                  <p className="text-sm font-bold text-gray-900">Cell Size: 40 x 40 px</p>
                  <p className="text-sm font-bold text-gray-900">Inner Padding: 16px</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Selection Theme</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900">Active Date: #C31348</p>
                  <p className="text-sm font-bold text-gray-900">Active Row: #FFEEF2</p>
                  <p className="text-sm font-bold text-gray-900">Radius: 12px (Dropdown)</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Interaction</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900">Hover: bg-gray-50</p>
                  <p className="text-sm font-bold text-gray-900">Shadow: 0 20px 25px -5px</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase font-black tracking-tighter">Transition: 150ms</p>
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
               The Date and Time picker must follow the 8pt grid system. Ensure the dropdowns are positioned correctly relative to the input field, 
               maintaining a 4px gap to avoid overlap while staying visually connected.
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
