//#region node_modules/.nitro/vite/services/ssr/assets/site-CY1ANRF-.js
var SITE = {
	brand: "Pushpangan",
	tagline: "Fresh Flowers, Delivered with Trust",
	phone: "+91 73043 30409",
	whatsappNumber: "918369407007",
	email: "pushpangan001@gmail.com",
	instagramHandle: "@push_pangan",
	instagramUrl: "https://instagram.com/push_pangan",
	address: "Wholesale Flower Market, Dadar, Maharashtra, India",
	hours: "Open daily · 5:00 AM – 9:00 PM",
	domain: "https://pushpangan.in"
};
function waLink(message) {
	return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
function inr(n) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(n);
}
//#endregion
export { inr as n, waLink as r, SITE as t };
