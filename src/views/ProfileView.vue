<template>
	<div>
		<Navigation />
		WELKOM OP DE PROFIEL PAGINA!
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//components
import Navigation from "@/components/Navigation.vue";

@Component({
	components: { Navigation }
})
export default class ProfileView extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/general";
</style>
