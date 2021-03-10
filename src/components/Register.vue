<template>
	<div class="register">
		<h1>Sign up to Kwetter</h1>
		<div>
			<input
				class="input-primary passManager"
				type="text"
				placeholder="Username..."
			/>
		</div>
		<div>
			<input
				class="input-primary passManager"
				type="password"
				placeholder="Password..."
			/>
		</div>
		<div>
			<input
				class="input-primary passManager"
				type="password"
				placeholder="Repeat password..."
			/>
		</div>
		<div><button class="button-primary">Sign up</button></div>
	</div>
</template>

<script lang="ts">
import FeatherBackground from "../components/FeatherBackground.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({ components: { FeatherBackground } })
export default class Register extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.register {
	text-align: right;
	margin-right: 10vw;
}

.register div input,
button {
	margin: 0.5em;
}

.register h1 {
	font-size: 3vw;
}
</style>
