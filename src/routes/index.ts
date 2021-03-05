import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

import LoginView from "@/views/LoginView.vue";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			redirect: "/login"
		},
		{
			path: "/login",
			name: "Login",
			component: LoginView,
			meta: {
				title: "Login - MunchKing"
			}
		},
		{
			path: "/register",
			name: "Register",
			component: () =>
				import(/* webpackChunkName: "Register" */ "../views/RegisterView.vue"),
			meta: {
				title: "Register - MunchKing"
			}
		},
		{
			path: "/lobby",
			name: "Lobby",
			component: () =>
				import(/* webpackChunkName: "Lobby" */ "../views/LobbyView.vue"),
			meta: {
				title: "Lobby - MunchKing",
				requiresAuth: true
			}
		},
		{
			path: "/game",
			name: "Game",
			component: () =>
				import(/* webpackChunkName: "Game" */ "../views/GameView.vue"),
			meta: {
				title: "Game - MunchKing",
				requiresAuth: true
			}
		},
		{
			path: "/battle",
			name: "Battle",
			component: () =>
				import(/* webpackChunkName: "Battle" */ "../views/BattleView.vue"),
			meta: {
				title: "Battle - MunchKing",
				requiresAuth: true
			}
		},
		{
			path: "/history",
			name: "History",
			component: () =>
				import(/* webpackChunkName: "History" */ "../views/HistoryView.vue"),
			meta: {
				title: "History - MunchKing",
				requiresAuth: true
			}
		},
		{
			path: "/settings",
			name: "Settings",
			component: () =>
				import(/* webpackChunkName: "Settings" */ "../views/SettingsView.vue"),
			meta: {
				title: "Settings - MunchKing",
				requiresAuth: true
			}
		},
		{
			path: "/about",
			name: "About",
			component: () =>
				import(/* webpackChunkName: "About" */ "../views/AboutView.vue"),
			meta: {
				title: "About - MunchKing",
				requiresAuth: true
			}
		}
	]
});

/**
 * Router authorisation
 */
router.beforeEach((to, from, next) => {
	const loggedInUser = store.getters.getLoggedInUser;
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !loggedInUser) next({ name: "Login" });
	else if (!requiresAuth && !!loggedInUser) next({ name: "Lobby" });
	else next();
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
