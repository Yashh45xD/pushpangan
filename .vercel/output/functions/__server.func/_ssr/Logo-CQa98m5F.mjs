import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-CQa98m5F.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ className = "", height = "h-12", showSubtitle = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: `group inline-flex items-center transition-opacity hover:opacity-90 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex items-center gap-3 ${height}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 160 160",
				className: "h-full w-auto text-[#b88523]",
				fill: "currentColor",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "80",
						cy: "74",
						r: "6",
						fill: "currentColor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 80 70 C 66 48 70 20 80 14 C 90 20 94 48 80 70 Z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 76 70 C 52 56 26 44 24 54 C 28 64 56 68 76 70 Z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 84 70 C 108 56 134 44 136 54 C 132 64 104 68 84 70 Z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 76 76 C 54 78 28 92 34 100 C 44 104 66 88 76 76 Z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 84 76 C 106 78 132 92 126 100 C 116 104 94 88 84 76 Z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 77 78 Q 72 105 68 126 Q 77 110 82 82 Z" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-serif text-2xl font-bold tracking-tight text-[#385434] leading-tight",
					children: "Pushpangan"
				}), showSubtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.18em] text-[#4a5d46] leading-none mt-0.5",
					children: "ROOTED IN SOIL, GROWN WITH LOVE"
				})]
			})]
		})
	});
}
function HorizontalLogo({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
		className,
		height: "h-10"
	});
}
//#endregion
export { Logo as n, HorizontalLogo as t };
