<template>
	<v-app id="app">
		<router-view />
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
	metaInfo: {
		meta: [
			{ name: "title", content: "MunchKing" },
			{
				name: "description",
				content:
					"MunchKing is there for you to keep track of your Munchkin games. Keep a nice and simple overview of the game to improve your winning chances!"
			},
			{ name: "keywords", content: "MunchKing, Munchkin, Game, Overview" },
			{ name: "author", content: "MrrrLuiigii" }
		]
	}
})
export default class App extends Vue {}
</script>

<style lang="scss">
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
	font-family: "SuperMunchkin";
	color: color(font);
	background-color: color(primary-dark);

	-webkit-touch-callout: none; // iOS Safari
	-webkit-user-select: none; // Safari
	-khtml-user-select: none; // Konqueror HTML
	-moz-user-select: none; // Old versions of Firefox
	-ms-user-select: none; // Internet Explorer/Edge
	user-select: none; // Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox
}

@font-face {
	font-family: "SuperMunchkin";
	src: url("./assets/font/Quasimodo Regular.ttf");
}

::-webkit-scrollbar {
	display: none;
}
</style>
