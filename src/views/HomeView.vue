<template>
	<div>
		WELKOM OP DE HOME PAGINA!
		{{ user }}
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AuthVM from "@/models/auth.viewmodel";

@Component({
	components: {}
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
