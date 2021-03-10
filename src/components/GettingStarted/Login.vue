<template>
	<div class="login">
		<h1>Login to Kwetter</h1>
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
		<div><button class="button-alt">Login</button></div>
	</div>
</template>

<script lang="ts">
import FeatherBackground from "../FeatherBackground.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({ components: { FeatherBackground } })
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.login {
	text-align: right;
	margin-right: 10vw;
}

.login div input,
button {
	margin: 0.5em;
}

.login h1 {
	font-size: 3vw;
}
</style>
