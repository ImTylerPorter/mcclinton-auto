<script lang="ts">
	import { onMount } from 'svelte';

	let { message } = $props();
	let visible = $state(false);

	onMount(() => {
		if (message) {
			visible = true;
			// Hide after 3 seconds
			setTimeout(() => {
				visible = false;
			}, 3000);
		}
	});
</script>

{#if visible}
	<div class="flash">
		<p>{message}</p>
	</div>
{/if}

<style>
	.flash {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background-color: var(--green);
		color: white;
		padding: 15px 25px;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
		animation:
			slideIn 0.3s ease-out,
			fadeOut 0.5s ease-in 2.5s;
		z-index: 1000;
	}
	p {
		font-weight: bold;
	}

	@keyframes slideIn {
		from {
			transform: translateY(100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
