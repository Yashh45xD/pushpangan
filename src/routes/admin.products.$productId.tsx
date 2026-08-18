import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { AdminAuthProvider, useAdminAuth } from "../context/AdminAuthContext";
import { AdminLogin } from "../components/admin/AdminLogin";
import { ProductDetailView } from "../components/admin/views/ProductDetailView";

export const Route = createFileRoute("/admin/products/$productId")({
  component: AdminProductDetailRoute,
});

function AdminProductDetailRoute() {
  return (
    <AdminAuthProvider>
      <AdminProductDetailContent />
    </AdminAuthProvider>
  );
}

function AdminProductDetailContent() {
  const { productId } = Route.useParams();
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3E9] flex flex-col items-center justify-center text-[#4F5535] font-sans">
        <div className="w-10 h-10 border-4 border-[#E2DCBE] border-t-[#B83245] rounded-full animate-spin mb-4"></div>
        <p className="text-xs font-bold">Loading Product Details...</p>
      </div>
    );
  }

  if (!admin) {
    return <AdminLogin />;
  }

  return <ProductDetailView productId={productId} />;
}
