<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment'; // Import the browser check
	let { content = $bindable() } = $props();
	let editorContainer: HTMLDivElement;
	let editor: any;

	onMount(async () => {
		if (browser) {
			// Ensure this runs only in the browser
			const Quill = (await import('quill')).default; // Dynamically import Quill
			import('quill/dist/quill.snow.css'); // Dynamically load CSS

			editor = new Quill(editorContainer, {
				theme: 'snow',
				modules: {
					toolbar: [
						['bold', 'italic', 'underline'],
						[{ list: 'ordered' }, { list: 'bullet' }],
						['link']
					]
				}
			});

			editor.setContents(editor.clipboard.convert(content));

			editor.on('text-change', () => {
				const html = editor.root.innerHTML;
				content = html; // Update the content variable
			});
		}
	});
</script>

<div bind:this={editorContainer}></div>

<style>
	div {
		min-height: 200px;
		border-radius: 0px;
	}
</style>
