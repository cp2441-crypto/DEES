import React from "react";
import { TrendingUp, Users, Package, AlertCircle, MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const Dashboard = () => {
  const stats = [
    { label: "Total Revenue", value: "$128,430", change: "+12.5%", trendingUp: true, icon: TrendingUp, color: "bg-blue-50 text-blue-600" },
    { label: "Active Users", value: "24,532", change: "+5.2%", trendingUp: true, icon: Users, color: "bg-green-50 text-green-600" },
    { label: "Total Orders", value: "1,205", change: "-2.4%", trendingUp: false, icon: Package, color: "bg-orange-50 text-orange-600" },
    { label: "System Alerts", value: "3", change: "Action required", trendingUp: false, icon: AlertCircle, color: "bg-red-50 text-destructive" },
  ];

  const recentActivities = [
    { user: "Sarah Miller", action: "Updated inventory", time: "2 mins ago", status: "Success" },
    { user: "David Chen", action: "Created new promotion", time: "15 mins ago", status: "Pending" },
    { user: "Emma Wilson", action: "System update", time: "1 hour ago", status: "Failed" },
    { user: "Michael Ross", action: "Bulk user import", time: "3 hours ago", status: "Success" },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">Dashboard Overview</h1>
        <p className="text-gray-500 font-medium">Welcome back, John! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-primary/20 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-md ${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <button className="text-gray-300 hover:text-gray-500 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-none">{stat.value}</h3>
              <div className="flex items-center gap-1">
                {stat.trendingUp ? (
                  <ArrowUpRight size={16} className="text-green-500" />
                ) : (
                  <ArrowDownRight size={16} className={stat.change.includes("%") ? "text-destructive" : "text-orange-500"} />
                )}
                <span className={`text-xs font-bold ${stat.trendingUp ? "text-green-500" : stat.change.includes("%") ? "text-destructive" : "text-orange-500"}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Revenue Growth</h2>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <span className="size-2 bg-primary rounded-full"></span> This Month
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 pl-4 border-l border-gray-100">
                <span className="size-2 bg-gray-200 rounded-full"></span> Last Month
              </span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[65, 45, 75, 55, 85, 95, 70, 60, 80, 50, 40, 90].map((height, idx) => (
              <div key={idx} className="flex-1 group relative">
                <div 
                  className="bg-gray-50 rounded-xs w-full transition-all duration-500 hover:bg-primary/20" 
                  style={{ height: '100%' }}
                />
                <div 
                  className="absolute bottom-0 bg-primary rounded-xs w-full transition-all duration-700 delay-150" 
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 px-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => (
              <span key={idx} className="text-xs font-medium text-gray-300 w-full text-center">{month}</span>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Recent Activity</h2>
            <button className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="relative">
                  <div className="size-2 bg-gray-200 rounded-full mt-2 ring-4 ring-white relative z-10 group-hover:bg-primary transition-colors"></div>
                  {idx !== recentActivities.length - 1 && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-50"></div>
                  )}
                </div>
                <div className="flex-1 pb-4 border-b border-gray-50 last:border-none">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-bold text-gray-900">{activity.user}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      activity.status === "Success" ? "bg-green-50 text-green-600" :
                      activity.status === "Pending" ? "bg-orange-50 text-orange-600" :
                      "bg-red-50 text-destructive"
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{activity.action}</p>
                  <p className="text-[10px] text-gray-300 uppercase tracking-wider font-bold">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
