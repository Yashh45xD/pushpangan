import "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as useAdminAuth, n as AdminLogin, r as ProductDetailView, t as AdminAuthProvider } from "./ProductDetailView-BYVGrZFq.mjs";
import { t as Route } from "./admin.products._productId-C4Pe1pSH.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function AdminProductDetailRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminProductDetailContent, {}) });
}
function AdminProductDetailContent() {
	const { productId } = Route.useParams();
	const { admin, loading } = useAdminAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#F5F3E9] flex flex-col items-center justify-center text-[#4F5535] font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 border-4 border-[#E2DCBE] border-t-[#B83245] rounded-full animate-spin mb-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-bold",
			children: "Loading Product Details..."
		})]
	});
	if (!admin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLogin, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDetailView, { productId });
}
//#endregion
export { AdminProductDetailRoute as component };
