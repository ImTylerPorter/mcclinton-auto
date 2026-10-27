<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	onMount(() => goto('/'));
</script>

<p>Settings are disabled on the static site.</p>
