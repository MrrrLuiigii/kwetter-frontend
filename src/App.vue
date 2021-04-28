<template>
	<v-app id="app">
		<Navigation v-if="$route.name !== 'Landingspage'" />
		<div v-if="$route.name !== 'Landingspage'" class="router-view">
			<router-view />
		</div>
		<router-view v-else />
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//components
import Navigation from "@/components/Navigation.vue";

//services
import AuthService from "@/services/authService";

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
export default class App extends Vue {
	created() {
		AuthService.validate();
	}
}
</script>

<style lang="scss">
@import "@/styles/general";
body {
	overflow: hidden;
	-ms-overflow-style: none;
}

.router-view {
	padding: 2em;
	width: 100vw;
	height: 100vh;
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

::-webkit-scrollbar {
	width: 0;
}
</style>
