<template>
	<transition name="modal">
		<div class="mask">
			<div class="wrapper">
				<div class="container">
					<div class="container__header">
						<svg class="container__header__svg" viewBox="0 0 300 50">
							<text x="0" y="30">
								<slot name="title"></slot>
							</text>
						</svg>
					</div>

					<div class="container__body">
						<slot name="body"></slot>
					</div>

					<div class="container__footer">
						<button
							v-if="getCancelButton"
							class="container__footer__cancelButton underlineAccent"
							@click="$emit('cancel')"
						>
							CANCEL
						</button>
						<button
							class="container__footer__actionButton underlineAccent"
							@click="$emit('close')"
						>
							<slot name="action"></slot>
						</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
	@Prop()
	active!: Boolean;

	@Prop()
	cancelButton!: Boolean;

	get getCancelButton(): Boolean {
		return this.cancelButton;
	}

	constructor() {
		super();
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/general";

.mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.wrapper {
	display: table-cell;
	vertical-align: middle;
}

.container {
	width: 90vw;
	margin: 0 auto;
	padding: 1em;

	min-width: 15em;
	max-width: 20em;

	background-color: color(primary);
	border: 2px solid color(font);
	border-radius: 0 $border-radius * 4;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);

	transition: all 0.3s ease;

	&__header {
		font-size: 2em;
	}

	&__body {
		overflow-y: auto;
		max-height: 60vh;
		margin: 0 0 1em 0;
	}

	&__footer {
		display: flex;
		justify-content: flex-end;

		&__cancelButton {
			text-align: left;
			float: left;
		}

		&__actionButton {
			text-align: left;
			float: right;
		}
	}
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>
