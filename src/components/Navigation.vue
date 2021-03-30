<template>
	<div>
		<div class="header">
			<div class="header__container">
				<div class="header__container__bar">
					<h1 class="header__container__bar__title">Kwetter</h1>
					<input
						class="header__container__bar__search input-primary"
						type="text"
						placeholder="Search..."
					/>
					<fa-icon
						class="header__container__bar__feather feather-no-stroke"
						:icon="['fas', 'feather-alt']"
					/>
					<fa-icon
						class="header__container__bar__feather feather-stroke"
						:icon="['fas', 'feather-alt']"
					/>
					<div class="background"></div>
				</div>
			</div>

			<button
				class="header__button squareButton"
				@click.stop="drawer = !drawer"
			>
				<fa-icon class="fa-icon" :icon="['fas', 'bars']" />
			</button>
		</div>

		<v-navigation-drawer
			class="drawer"
			v-model="drawer"
			absolute
			temporary
			right
		>
			<div class="user">
				<div class="user__icon">
					<fa-icon :icon="['fas', 'user']" />
				</div>
				<div class="user__username">
					{{ user.username }}
				</div>
			</div>

			<div class="routes">
				<ul>
					<li><router-link :to="{ name: 'Home' }">Home</router-link></li>
					<li><router-link :to="{ name: 'Profile' }">Profile</router-link></li>
				</ul>
			</div>

			<v-divider class="drawer__divider"></v-divider>
		</v-navigation-drawer>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Route } from "vue-router";

//viewmodels
import AuthVM from "@/models/auth.viewmodel";

@Component
export default class Navigation extends Vue {
	private drawer: boolean = false;

	get user(): AuthVM {
		return this.$store.getters.getUser;
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.header {
	display: flex;
	align-items: center;
	width: 100vw;

	&__container {
		display: flex;

		&__bar {
			position: relative;
			display: flex;
			align-items: center;
			width: 85vw;
			height: 7.5vh;
			background-color: color(app-primary);

			border: 0 solid black;
			border-radius: 0 0 100px 0;

			&__title {
				padding: 1em;
			}

			&__input {
				background-color: red;
			}

			&__feather {
				position: absolute;
				right: 0;
				font-size: 7.5vh;
				color: color(app-primary);
				text-shadow: 0 0 3px #000;
			}
		}
	}

	&__button {
		position: absolute;
		right: 1em;
		font-size: 2em;
	}
}

.feather-stroke path {
	stroke: color(app-background);
	stroke-width: 35px;
}

.feather-stroke {
	z-index: 1;
}

.feather-no-stroke {
	z-index: 2;
}

.background {
	position: absolute;
	right: -3.5em;

	width: 0;
	height: 0;

	border-left: 7vh solid transparent;
	border-right: 7vh solid transparent;
	border-bottom: 7.5vh solid color(app-background);
}

.drawer {
	background-color: color(primary);
	border: 2px solid color(font);
	// border-radius: $border-radius;
}

.user {
	display: flex;
	align-items: center;
	padding: 0.5em;

	&__icon {
		font-size: 2em;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2em;
		height: 2em;
		border: 2px solid black;
		border-radius: 50%;
	}

	&__username {
		padding-left: 0.5em;
		font-size: 2em;
		border: 0 0 2px 0 solid black;
	}
}

.router-link {
	text-decoration: none;
	color: color(font);
}
</style>
