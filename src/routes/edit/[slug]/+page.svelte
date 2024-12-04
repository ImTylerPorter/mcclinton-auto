<script lang="ts">
	import { page } from '$app/stores';
	import { capitalize } from '$lib/helpers/index';
	let { data } = $props();
	let { sectionData: section } = data;

	let sectionState = $state({
		id: section.id,
		title: section.title || ''
	});

	let formError = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		formData.append('id', sectionState.id);

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
		height: 100vh;
		max-width: 90%;
	}
	.card {
		margin: 0 auto;
		background: var(--background-light);
		width: 100%;
		box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.5);
	}
	h1 {
		text-transform: capitalize;
	}
	form {
		margin: 20px auto;
	}
	label {
		display: flex;
		flex-direction: column;
		padding: 0 20px;
	}

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
