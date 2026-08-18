import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService";
import {
  ShoppingBag,
  IndianRupee,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

/*
 * Pushpangan Clean Off-White & Warm Beige Theme:
 * Main Background: Warm Beige / Ivory (#F5F3E9)
 * Cards & Header: Off-White (#FFFFFF)
 * Accents: Soft Khaki / Beige (#E2DCBE / #9F905E)
 * Primary Highlights: Golden Mustard (#B68F38)
 * Primary Text: Deep Olive Green (#4F5535)
 */

export const DashboardView: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminService.getDashboardStats();
        setStats(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div style={{ backgroundColor: "#FFFFFF" }} className="h-8 w-48 rounded-lg border border-[#E2DCBE]"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} style={{ backgroundColor: "#FFFFFF" }} className="h-28 rounded-2xl border border-[#E2DCBE]"></div>
          ))}
        </div>
      </div>
    );
  }

  const cards = stats?.cards || {};
  const charts = stats?.charts || {};

  // Exact Brand Colors for Charts
  const CHART_COLORS = ["#B68F38", "#4F5535", "#9F905E", "#666851", "#d9a441"];

  const kpiCards = [
    { title: "Today's Orders", value: cards.todayOrders, change: "+14%", isUp: true, icon: ShoppingBag, color: "#B68F38" },
    { title: "Today's Revenue", value: `₹${cards.todayRevenue?.toLocaleString()}`, change: "+18%", isUp: true, icon: IndianRupee, color: "#4F5535" },
    { title: "Monthly Revenue", value: `₹${cards.monthlyRevenue?.toLocaleString()}`, change: "+24%", isUp: true, icon: TrendingUp, color: "#B68F38" },
    { title: "Total Customers", value: cards.totalCustomers, change: "+8%", isUp: true, icon: Users, color: "#4F5535" },
    { title: "Pending Orders", value: cards.pendingOrders, change: "Action Needed", isUp: false, icon: Clock, color: "#9F905E" },
    { title: "Completed Orders", value: cards.completedOrders, change: "98.2% Rate", isUp: true, icon: CheckCircle2, color: "#4F5535" },
    { title: "Cancelled Orders", value: cards.cancelledOrders, change: "-2.1%", isUp: true, icon: XCircle, color: "#666851" },
    { title: "Low Stock Flowers", value: cards.lowStockFlowers, change: "Restock Now", isUp: false, icon: AlertTriangle, color: "#B68F38" },
    { title: "Best Selling Flower", value: cards.bestSellingFlower, change: "Yellow Marigold", isUp: true, icon: Award, color: "#4F5535" },
    { title: "Recent Registrations", value: cards.recentCustomers?.length || 5, change: "Today", isUp: true, icon: Calendar, color: "#9F905E" },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Executive Header Banner - Off White & Warm Beige */}
      <div
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE", color: "#4F5535" }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2" style={{ color: "#4F5535" }}>
            Pushpangan Executive Overview <Sparkles style={{ color: "#B68F38" }} className="w-5 h-5" />
          </h1>
          <p style={{ color: "#666851" }} className="text-xs mt-1 font-medium">
            Wholesale & Retail Fresh Flower Telemetry, Daily Sales & Inventory Controls
          </p>
        </div>
        <div>
          <span
            style={{ backgroundColor: "#F5F3E9", color: "#B68F38", borderColor: "#E2DCBE" }}
            className="text-xs font-extrabold px-3.5 py-1.5 rounded-xl border"
          >
            Jul 2026 Live Telemetry
          </span>
        </div>
      </div>

      {/* 10 Dashboard Cards Grid - Off White Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }}
              className="p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span style={{ color: "#666851" }} className="text-xs font-bold truncate">
                  {card.title}
                </span>
                <div
                  style={{ backgroundColor: card.color }}
                  className="p-2 rounded-xl text-white shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div style={{ color: "#4F5535" }} className="text-xl font-extrabold tracking-tight truncate">
                {card.value}
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] font-bold">
                {card.isUp ? (
                  <span style={{ color: "#4F5535" }} className="flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5" /> {card.change}
                  </span>
                ) : (
                  <span style={{ color: "#B68F38" }} className="flex items-center">
                    <ArrowDownRight className="w-3.5 h-3.5" /> {card.change}
                  </span>
                )}
                <span style={{ color: "#9F905E" }} className="font-normal">vs last week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recharts Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <div style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }} className="p-5 rounded-3xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ color: "#4F5535" }} className="text-sm font-extrabold">Daily Order Volume</h3>
              <p style={{ color: "#666851" }} className="text-[11px]">Order count for the past 7 days</p>
            </div>
            <span style={{ backgroundColor: "rgba(182, 143, 56, 0.15)", color: "#B68F38", borderColor: "#E2DCBE" }} className="text-xs font-extrabold px-2.5 py-1 rounded-full border">
              Orders/Day
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.dailySales || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2DCBE" />
                <XAxis dataKey="day" stroke="#666851" fontSize={11} />
                <YAxis stroke="#666851" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE", borderRadius: "12px", fontSize: "12px", color: "#4F5535" }}
                />
                <Bar dataKey="sales" fill="#B68F38" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }} className="p-5 rounded-3xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ color: "#4F5535" }} className="text-sm font-extrabold">Monthly Revenue Growth</h3>
              <p style={{ color: "#666851" }} className="text-[11px]">Total revenue trajectory in INR (₹)</p>
            </div>
            <span style={{ backgroundColor: "rgba(79, 85, 53, 0.15)", color: "#4F5535", borderColor: "#E2DCBE" }} className="text-xs font-extrabold px-2.5 py-1 rounded-full border">
              ₹ Revenue
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.monthlySales || []}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F5535" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#4F5535" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2DCBE" />
                <XAxis dataKey="month" stroke="#666851" fontSize={11} />
                <YAxis stroke="#666851" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE", borderRadius: "12px", fontSize: "12px", color: "#4F5535" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4F5535" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Flowers Pie Chart */}
        <div style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }} className="p-5 rounded-3xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ color: "#4F5535" }} className="text-sm font-extrabold">Top Selling Flower Share</h3>
              <p style={{ color: "#666851" }} className="text-[11px]">Sales breakdown by flower variety</p>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.topSellingFlowers || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="sales"
                >
                  {(charts.topSellingFlowers || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE", borderRadius: "12px", fontSize: "12px", color: "#4F5535" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#666851" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Performance Chart */}
        <div style={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE" }} className="p-5 rounded-3xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ color: "#4F5535" }} className="text-sm font-extrabold">Category Demand Growth</h3>
              <p style={{ color: "#666851" }} className="text-[11px]">Category sales volume vs growth index</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.categoryPerformance || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2DCBE" />
                <XAxis type="number" stroke="#666851" fontSize={11} />
                <YAxis dataKey="category" type="category" stroke="#666851" fontSize={11} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2DCBE", borderRadius: "12px", fontSize: "12px", color: "#4F5535" }}
                />
                <Bar dataKey="sales" fill="#9F905E" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
