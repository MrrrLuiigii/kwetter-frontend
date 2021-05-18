<template>
	<div class="follow-card">
		<div class="flex">
			<div class="avatar">
				<img
					class="avatar__img"
					src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/user-512.png"
				/>
			</div>
			<div class="names">
				<h2 class="names__username">
					{{ follow.username }}
				</h2>
				<p class="names__name" v-if="follow.name && follow.name !== ''">
					({{ follow.name }})
				</p>
			</div>
		</div>

		<button
			@click="viewProfile"
			class="view-profile-button button-primary-small"
		>
			View Profile
		</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Follow extends Vue {
	//TODO: type
	@Prop()
	follow: any;

	viewProfile() {
		this.$router
			.replace({ name: "Profile", params: { id: this.follow.id } })
			.catch(() => {});
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.follow-card {
	position: relative;
	background-color: color(app-gray);
	border-radius: $border-radius;
	padding: 1em;
}

.avatar {
	width: 5em;
	height: 5em;
	border: 4px solid color(app-font);
	border-radius: $border-radius-small;
	background-color: color(app-background);

	&__img {
		width: 100%;
	}
}

.names {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	text-align: left;
	margin-left: 1em;
}

.view-profile-button {
	position: absolute;
	bottom: 0;
	right: 0;
	margin: 1em;
}

.flex {
	display: flex;
	align-content: flex-start;
}
</style>
