<template>
	<v-app id="app">
		<Navigation v-if="$route.name !== 'Landingspage'" />
		<router-view />
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//components
import Navigation from "@/components/Navigation.vue";

@Component({
	components: { Navigation },
	metaInfo: {
		meta: [
			{ name: "title", content: "Kwetter" },
			{
				name: "description",
				content: "Kwetter is a social media platform!"
			},
			{ name: "keywords", content: "Kwetter, social-media" },
			{ name: "author", content: "MrrrLuiigii" }
		]
	}
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "@/styles/general";
body {
	overflow: hidden;
	-ms-overflow-style: none;
}

#app {
	width: 100vw;
	height: 100vh;
	font-size: 18px;
	margin: 0;
	text-align: center;
	overflow: hidden;
	font-family: "Segoe Script";
	font-weight: 600;
	color: color(app-font);
	background-color: color(app-background);

	-webkit-touch-callout: none; // iOS Safari
	-webkit-user-select: none; // Safari
	-khtml-user-select: none; // Konqueror HTML
	-moz-user-select: none; // Old versions of Firefox
	-ms-user-select: none; // Internet Explorer/Edge
	user-select: none; // Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox
}

//#region scrollbar
::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}
::-webkit-scrollbar-track {
	background-color: color(app-background);
	border-radius: 7px 0 7px 7px;
}
::-webkit-scrollbar-thumb {
	background-color: color(app-primary);
	border: 2px solid color(app-font);

	border-radius: 7px 0 7px 7px;
}

//#endregion
</style>
