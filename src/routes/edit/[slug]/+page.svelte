<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	onMount(() => goto('/'));
</script>

<p>CMS editing is disabled on the static site.</p>
