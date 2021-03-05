<template>
	<div>
		<div class="navActions">
			<button
				class="navActions__button squareButton"
				@click.stop="drawer = !drawer"
			>
				<fa-icon class="fa-icon" :icon="['fas', 'bars']" />
			</button>
			<button
				class="navActions__button squareButton"
				v-if="backLocation !== ''"
				@click.stop="routeBack"
			>
				<fa-icon class="fa-icon" :icon="['fas', 'arrow-left']" />
			</button>
		</div>

		<!--  -->

		<v-navigation-drawer class="drawer" v-model="drawer" absolute temporary>
		</v-navigation-drawer>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Route } from "vue-router";

@Component
export default class Navigation extends Vue {
	private drawer: boolean = false;

	@Prop()
	propBackLocation!: string;

	get backLocation(): string {
		return this.propBackLocation ? this.propBackLocation : "";
	}

	routeBack(): void {
		if (this.backLocation !== "") {
			this.$router.replace(this.backLocation);
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.navActions {
	position: absolute;
	bottom: 1em;
	left: 1em;

	&__button {
		margin-right: 0.5em;
	}
}

.drawer {
	background-color: color(primary);
	border: 2px solid color(font);
	border-left: none;
	border-radius: 0 10px 10px 0;
}

.router-link {
	text-decoration: none;
	color: color(font);
}
</style>
