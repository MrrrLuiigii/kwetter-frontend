module.exports = {
	pwa: {
		name: "MunchKing",
		themeColor: "#ffd09a",
		msTileColor: "#ffd09a",
		appleMobileWebAppCapable: "yes",
		manifestOptions: {
			background_color: "#ffd09a",
			start_url: "/"
		}
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `
            @import "@/styles/_variables.scss";
            @import "@/styles/_mixins.scss";
            @import "@/styles/_functions.scss";
        `
			}
		}
	}
};
