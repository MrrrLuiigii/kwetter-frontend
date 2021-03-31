<template>
	<div v-if="user">
		<Navigation />

		WELKOM OP DE HOME PAGINA,
		{{ user.username }}!
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//components
import Navigation from "@/components/Navigation.vue";

import AuthVM from "@/models/auth.viewmodel";

@Component({
	components: { Navigation }
})
export default class HomeView extends Vue {
	get user(): AuthVM {
		return this.$store.getters.getUser;
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";
</style>
