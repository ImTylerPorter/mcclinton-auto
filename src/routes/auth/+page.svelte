<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	onMount(() => goto('/'));
</script>

<p>Admin login is disabled on the static site.</p>
