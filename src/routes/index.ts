import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

import LandingsView from "@/views/LandingsView.vue";
import { AccountStatus } from "@/models/enums/auth.enum";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "Landingspage",
			component: LandingsView,
			meta: {
				title: "Landingspage - Kwetter"
			}
		},
		{
			path: "/verify",
			name: "Verify",
			component: () =>
				import(/* webpackChunkName: "Verify" */ "../views/VerifyView.vue"),
			meta: {
				title: "Verify - Kwetter",
				requiresAuth: true
			}
		},
		{
			path: "/home",
			name: "Home",
			component: () =>
				import(/* webpackChunkName: "Home" */ "../views/HomeView.vue"),
			meta: {
				title: "Home - Kwetter",
				requiresAuth: true
			}
		},
		{
			path: "/profile/:id?",
			name: "Profile",
			component: () =>
				import(/* webpackChunkName: "Profile" */ "../views/ProfileView.vue"),
			meta: {
				title: "Profile - Kwetter",
				requiresAuth: true
			}
		},
		{
			path: "/manageprofile",
			name: "ManageProfile",
			component: () =>
				import(
					/* webpackChunkName: "Profile" */ "../views/ManageProfileView.vue"
				),
			meta: {
				title: "Manage Profile - Kwetter",
				requiresAuth: true
			}
		}
	]
});

/**
 * Router authorisation
 */
router.beforeEach((to, from, next) => {
	const user = store.getters["authModule/getUser"];
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !user) return next({ name: "Landingspage" });
	else if (
		to.name === "Verify" &&
		user &&
		user.status !== AccountStatus.Pending
	)
		return next({ name: from.name ? from.name : "Home" });

	next();
});

router.beforeEach((to, from, next) => {
	// This goes through the matched routes from last to first, finding the closest route with a title.
	// eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find(r => r.meta && r.meta.title);

	// Find the nearest route element with meta tags.
	const nearestWithMeta = to.matched
		.slice()
		.reverse()
		.find(r => r.meta && r.meta.metaTags);
	const previousNearestWithMeta = from.matched
		.slice()
		.reverse()
		.find(r => r.meta && r.meta.metaTags);

	// If a route with a title was found, set the document (page) title to that value.
	if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

	// Remove any stale meta tags from the document using the key attribute we set below.
	Array.from(
		document.querySelectorAll("[data-vue-router-controlled]")
	).map(el => el.parentNode!.removeChild(el));

	// Skip rendering meta tags if there are none.
	if (!nearestWithMeta) return next();

	// Turn the meta tag definitions into actual elements in the head.
	nearestWithMeta.meta.metaTags
		.map((tagDef: { [x: string]: string }) => {
			const tag = document.createElement("meta");

			Object.keys(tagDef).forEach(key => {
				tag.setAttribute(key, tagDef[key]);
			});

			// We use this to track which meta tags we create, so we don't interfere with other ones.
			tag.setAttribute("data-vue-router-controlled", "");

			return tag;
		})
		// Add the meta tags to the document head.
		.forEach((tag: any) => document.head.appendChild(tag));
});

export default router;
