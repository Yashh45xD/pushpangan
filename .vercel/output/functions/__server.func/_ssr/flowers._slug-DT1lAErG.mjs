import { a as productService } from "./productService-DaSRxsDy.mjs";
import { M as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SITE } from "./site-CY1ANRF-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flowers._slug-DT1lAErG.js
var $$splitNotFoundComponentImporter = () => import("./flowers._slug-CXPoVU06.mjs");
var $$splitComponentImporter = () => import("./flowers._slug-BxlVWGdD.mjs");
var Route = createFileRoute("/flowers/$slug")({
	loader: async ({ params }) => {
		const prod = await productService.getProductBySlug(params.slug);
		if (!prod) throw notFound();
		return { flower: productService.toFlower(prod) };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Flower not found" }, {
			name: "robots",
			content: "noindex"
		}] };
		const f = loaderData.flower;
		return { meta: [
			{ title: `${f.name} — ${SITE.brand}` },
			{
				name: "description",
				content: `${f.name} · ${f.description}`
			},
			{
				property: "og:title",
				content: `${f.name} — ${SITE.brand}`
			},
			{
				property: "og:description",
				content: f.description
			},
			{
				property: "og:image",
				content: f.image
			},
			{
				name: "twitter:image",
				content: f.image
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
