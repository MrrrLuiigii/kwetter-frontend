<template>
	<div>
		<input
			@focus="focus = true"
			@blur="focus = false"
			v-model="search"
			@input="getProfiles"
			class="input-primary"
			type="text"
			placeholder="Search..."
		/>
		<div
			class="options"
			:class="focus ? 'active' : ''"
			v-if="options.length > 0"
		>
			<div v-for="(profile, index) in options" :key="profile.id">
				<div class="options__option" @mousedown="route(profile.id)">
					<div class="options__option__username">
						{{ profile.username }}
					</div>
					<div class="options__option__name">
						{{ profile.name }}
					</div>
				</div>
				<div
					v-if="index + 1 < options.length"
					class="options__option__divider"
				></div>
			</div>
		</div>
		<div
			class="options no-options"
			:class="focus ? 'active' : ''"
			v-else-if="search.length > 0"
		>
			No results...
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//services
import ProfileService from "@/services/profileService";

//models
import { ProfileSearchVM } from "@/models/viewmodels/profile.viewmodel";

@Component
export default class SearchProfileInput extends Vue {
	private error: string = "";
	private search: string = "";
	private options: ProfileSearchVM[] = [];
	private focus: boolean = false;

	getProfiles() {
		if (this.search.length === 0) return (this.options = []);
		ProfileService.getProfiles(this.search)
			.then((res: ProfileSearchVM[]) => {
				this.error = "";
				this.options = res;
			})
			.catch((err: { message: string }) => {
				if (err && err.message) this.error = err.message;
			});
	}

	route(id: string) {
		this.search = "";
		this.options = [];
		this.focus = false;
		this.$router.replace({ name: "Profile", params: { id } }).catch(() => {});
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.input-primary {
	position: relative;
}

.options {
	z-index: 1;
	display: none;
	position: absolute;
	overflow: hidden;
	max-height: 15em;
	overflow-y: auto;

	width: 500px;
	border: 2px solid color(app-font);
	border-radius: $border-radius-small;

	&__option {
		text-align: left;
		padding: 0.25em;
		padding-left: 1em;

		&__username {
			color: color(app-primary);
			font-size: 1.25em;
		}

		&__name {
			font-size: 0.9em;
		}

		&__divider {
			background-color: color(app-font);
			width: calc(100% + 1em);
			height: 1px;
		}

		&__route {
			color: color(app-font);
		}
	}

	&__option:hover {
		background-color: color(app-gray);
		cursor: pointer;
	}
}

.options.active {
	display: block;
	background-color: color(app-background);
}

.no-options {
	padding: 0.25em;
}
</style>
