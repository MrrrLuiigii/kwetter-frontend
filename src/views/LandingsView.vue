<template>
	<div class="flex">
		<div class="buttons">
			<button class="button-alt button-login">Login</button>
			<button class="button-primary button-signup">Sign up</button>
		</div>
		<GettingStarted />
		<!-- <Login /> -->
		<!-- <Register /> -->
		<FeatherBackground />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//components
import FeatherBackground from "../components/FeatherBackground.vue";
import GettingStarted from "../components/GettingStarted.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

@Component({
	components: { FeatherBackground, GettingStarted, Login, Register }
})
export default class LandingsView extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.flex {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.buttons {
	position: absolute;
	top: 1em;
	right: 1em;
}

.buttons button {
	margin-left: 0.5em;
}
</style>
