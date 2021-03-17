<template>
	<div class="postRegister">
		<h1>Welcome {{ username }}</h1>
		<p>Complete your profile with the following information...</p>
		<div class="postRegister__inputs">
			<div>
				<input class="input-primary" type="text" placeholder="Full name..." />
			</div>
			<div>
				<input class="input-primary" type="text" placeholder="Place..." />
			</div>
			<div>
				<input class="input-primary" type="text" placeholder="Web..." />
			</div>
			<div>
				<textarea class="input-bio input-primary" placeholder="Biography..." />
			</div>

			<div class="postRegister__inputs__buttons">
				<button class="button-alt button-small">Skip</button
				><button class="button-primary">Save</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import FeatherBackground from "@/components/FeatherBackground.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: { FeatherBackground } })
export default class PostRegister extends Vue {
	@Prop()
	propUsername!: string;

	get username() {
		return this.propUsername;
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.postRegister {
	text-align: right;
	margin-right: 10vw;

	&__inputs {
		width: 500px;
		float: right;

		&__buttons {
			display: flex;
			justify-content: space-between;
			margin-right: -1em;
		}
	}
}

.postRegister div textarea,
input,
button {
	margin: 0.5em;
}

.postRegister h1 {
	font-size: 3vw;
}

.input-bio {
	height: 7.5em;
}

.button-small {
	width: 150px;
}
</style>
