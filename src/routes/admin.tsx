import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { AdminAuthProvider, useAdminAuth } from "../context/AdminAuthContext";
import { AdminLogin } from "../components/admin/AdminLogin";
import { AdminLayout } from "../components/admin/AdminLayout";

import { DashboardView } from "../components/admin/views/DashboardView";
import { FlowersView } from "../components/admin/views/FlowersView";
import { CategoriesView } from "../components/admin/views/CategoriesView";
import { OrdersView } from "../components/admin/views/OrdersView";
import { CustomersView } from "../components/admin/views/CustomersView";
import { InventoryView } from "../components/admin/views/InventoryView";
import { CouponsView } from "../components/admin/views/CouponsView";
import { OffersView } from "../components/admin/views/OffersView";
import { PaymentsView } from "../components/admin/views/PaymentsView";
import { DeliveryView } from "../components/admin/views/DeliveryView";
import { ReviewsView } from "../components/admin/views/ReviewsView";
import { AnalyticsView } from "../components/admin/views/AnalyticsView";
import { SettingsView } from "../components/admin/views/SettingsView";
import { AdminsView } from "../components/admin/views/AdminsView";
import { ActivityLogsView } from "../components/admin/views/ActivityLogsView";
import { ApiDocsView } from "../components/admin/views/ApiDocsView";

export const Route = createFileRoute("/admin")({
  component: AdminRouteWrapper,
});

function AdminRouteWrapper() {
  return (
    <AdminAuthProvider>
      <AdminContent />
    </AdminAuthProvider>
  );
}

function AdminContent() {
  const { admin, loading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-sans">
        <div className="w-10 h-10 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mb-4"></div>
        <p className="text-xs font-semibold text-rose-300">Loading Pushpangan Admin Security Console...</p>
      </div>
    );
  }

  if (!admin) {
    return <AdminLogin />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "orders":
        return <OrdersView />;
      case "flowers":
        return <FlowersView />;
      case "categories":
        return <CategoriesView />;
      case "customers":
        return <CustomersView />;
      case "inventory":
        return <InventoryView />;
      case "offers":
        return <OffersView />;
      case "coupons":
        return <CouponsView />;
      case "reviews":
        return <ReviewsView />;
      case "delivery":
        return <DeliveryView />;
      case "payments":
        return <PaymentsView />;
      case "analytics":
        return <AnalyticsView />;
      case "settings":
        return <SettingsView />;
      case "admins":
        return <AdminsView />;
      case "activity":
        return <ActivityLogsView />;
      case "apidocs":
        return <ApiDocsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderActiveView()}
    </AdminLayout>
  );
}
