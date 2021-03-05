<template>
	<h1 class="pageTitle">
		{{ getTitle }}
	</h1>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class PageTitle extends Vue {
	@Prop()
	title!: string;

	get getTitle(): string {
		return this.title;
	}
}
</script>

<style lang="scss" scoped>
.pageTitle {
	margin: 1em 0 0 0;
}
</style>
