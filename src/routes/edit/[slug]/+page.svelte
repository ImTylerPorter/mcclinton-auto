<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { capitalize } from '$lib/helpers/index';
	import TextEditor from '../../../components/TextEditor.svelte';

	let { data } = $props();
	let { sectionData: section } = data;

	let sectionState = $state({
		id: section.id,
		title: section.title || '',
		subTitle: section.subTitle || '',
		tagline: section.tagline || '',
		content: section.content || '',
		buttonText: section.buttonText || '',
		buttonLink: section.buttonLink || ''
	});

	let formError = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		formData.append('id', sectionState.id);
		formData.append('content', sectionState.content); // Append updated content
		console.log(sectionState.content);
		try {
			const response = await fetch($page.url.pathname, {
				method: 'POST',
				body: formData
			});
			const result = await response.json();

			if (response.ok) {
				window.location.href = `/?message=${capitalize(section.sectionName)}%20Successfully%20Updated`;
			} else {
				formError = result.error?.message || 'Operation failed.';
			}
		} catch (err) {
			formError = 'An error occurred.';
		}
	}
</script>

<main>
	<div class="container">
		<div class="card">
			<h1>Editing {section.sectionName}</h1>
			<form onsubmit={handleSubmit}>
				{#if formError}
					<p class="error">{formError}</p>
				{/if}
				<label>
					<span>Title:</span>
					<input type="text" name="title" bind:value={sectionState.title} />
				</label>

				<label>
					<span>Sub-Title:</span>
					<input type="text" name="sub_title" bind:value={sectionState.subTitle} />
				</label>

				<label>
					<span>Tagline:</span>
					<input type="text" name="tagline" bind:value={sectionState.tagline} />
				</label>
				{#if browser}
					<fieldset>
						<span>Content:</span>
						<TextEditor bind:content={sectionState.content} />
					</fieldset>
				{/if}

				<label>
					<span>Button Text:</span>
					<input type="text" name="button_text" bind:value={sectionState.buttonText} />
				</label>

				<label>
					<span>Button Link:</span>
					<input type="url" name="button_link" bind:value={sectionState.buttonLink} />
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	</div>
</main>

<style>
	main {
		background: linear-gradient(135deg, var(--tan-light) 50%, var(--green-light) 100%);
	}
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 400px;
		min-height: 100vh;
		max-width: 90%;
	}
	.card {
		margin: 50px auto;
		background: var(--background-light);
		width: 100%;
		box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.5);
	}
	h1 {
		text-transform: capitalize;
	}
	form {
		margin: 20px auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	label {
		display: flex;
		flex-direction: column;
		padding: 0 20px;
	}

	fieldset {
		padding: 0 20px;
		border: 0;
	}

	fieldset span,
	label span {
		font-size: 1rem;
	}
	input {
		min-height: 30px;
		border: 1px solid var(--green);
		text-indent: 5px;
	}
	input:focus-within,
	input:focus {
		outline-color: var(--tan);
	}

	button {
		border: none;
		display: block;
		margin: 20px auto;
	}
</style>
