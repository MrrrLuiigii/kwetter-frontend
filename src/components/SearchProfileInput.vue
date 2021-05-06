<template>
	<div>
		<input
			@focus="focus = true"
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
			<div
				class="options__option"
				v-for="profile in options"
				:key="profile.id"
				@mousedown="route(profile.id)"
			>
				{{ profile.name }} ({{ profile.username }}) {{ profile.following }}
			</div>
		</div>
		<div class="options" :class="focus ? 'active' : ''" v-else>
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
				this.error = err.message;
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
		padding: 0.25em;

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
</style>
