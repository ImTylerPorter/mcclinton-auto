<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { capitalize } from '$lib/helpers/index';
	import TextEditor from '../../../components/TextEditor.svelte';
	import { goto, afterNavigate } from '$app/navigation';

	let { data } = $props();
	let { sectionData: section, servicesData: services } = data;

	let sectionState = $state({
		id: section.id,
		title: section.title || '',
		subTitle: section.subTitle || '',
		tagline: section.tagline || '',
		content: section.content || '',
		buttonText: section.buttonText || '',
		buttonLink: section.buttonLink || '',
		image: section.image || null
	} as {
		id: string;
		title: string;
		subTitle: string;
		tagline: string;
		content: string;
		buttonText: string;
		buttonLink: string;
		image: File | string | null;
	});

	let servicesState = $state(
		services.map(
			(service) =>
				({
					id: service.id,
					title: service.title || '',
					imageUrl: service.imageUrl || null,
					previewSrc: service.imageUrl || null
				}) as {
					id: string;
					title: string;
					imageUrl: File | string | null;
					previewSrc: string | null;
				}
		)
	);

	let formError = $state('');
	let previewSrc = $state('');

	let previousPath = '';

	afterNavigate(({ from }) => {
		// Store the path of the page we came from
		previousPath = from?.url.pathname || '';
	});

	const handleFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const file = target.files ? target.files[0] : null;

		if (file) {
			sectionState.image = file; // Store the file directly, not the Blob URL
		} else {
			sectionState.image = null;
		}
		// Only set the previewSrc for displaying the image preview
		previewSrc = file ? URL.createObjectURL(file) : '';
	};

	const handleServiceFileChange = (event: Event, index: number) => {
		const target = event.target as HTMLInputElement;
		const file = target.files ? target.files[0] : null;

		if (file) {
			servicesState[index].imageUrl = file; // Assign the file
			servicesState[index].previewSrc = URL.createObjectURL(file); // Optional: for preview
		} else {
			servicesState[index].imageUrl = null;
			servicesState[index].previewSrc = null; // Optional
		}
	};

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		formData.append('id', sectionState.id);
		formData.append('content', sectionState.content); // Append updated content

		if (sectionState.image && sectionState.image instanceof File) {
			formData.set('image', sectionState.image); // Send the actual file object
		}

		// Iterate over servicesState and append each service data individually
		servicesState.forEach((service, index) => {
			formData.append(`services[${index}][id]`, service.id);
			formData.append(`services[${index}][title]`, service.title);

			// Append the image file if it's a File object
			if (service.imageUrl && service.imageUrl instanceof File) {
				formData.append(`services[${index}][image]`, service.imageUrl);
			}
		});

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

	const goBack = () => {
		goto(previousPath);
	};
</script>

<main>
	<div class="container">
		<div class="card">
			<button class="back" onclick={() => goBack()}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
					><path
						d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
					/></svg
				>
				<span>Go Back</span>
			</button>
			<h1>Editing {section.sectionName}</h1>
			<form onsubmit={handleSubmit} enctype="multipart/form-data">
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
					<input type="text" name="button_link" bind:value={sectionState.buttonLink} />
				</label>

				<label>
					<span>Image:</span>
					{#if previewSrc}
						<div class="preview">
							<img src={previewSrc} alt="Preview" />
						</div>
					{:else if sectionState.image && typeof sectionState.image === 'string'}
						<div class="preview">
							<img src={sectionState.image} alt="Section" />
						</div>
					{/if}
					<input type="file" accept="image/*" onchange={handleFileChange} />
				</label>

				{#if section.sectionName === 'services' && services.length}
					<h3>Services:</h3>
					{#each servicesState as service, index}
						<label>
							<span>Title:</span>
							<input
								type="text"
								name={'service_' + index}
								bind:value={servicesState[index].title}
							/>
						</label>
						<label>
							<span>Image:</span>
							{#if servicesState[index].previewSrc}
								<div class="preview">
									<img src={servicesState[index].previewSrc} alt="Preview" />
								</div>
							{:else if servicesState[index].imageUrl && typeof servicesState[index].imageUrl === 'string'}
								<div class="preview">
									<img src={servicesState[index].imageUrl} alt="Section" />
								</div>
							{/if}
							<input
								type="file"
								accept="image/*"
								onchange={(e) => handleServiceFileChange(e, index)}
							/>
						</label>
					{/each}
				{/if}

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
	.back {
		margin: 10px 10px;
		padding: 0;
		width: auto;
		color: #515151c3;
		background: none;
		font-weight: normal;
		border-radius: 0;
		display: flex;
		align-items: center;
	}
	.back:hover {
		color: black;
	}
	.back svg {
		width: 12px;
		height: auto;
	}
	.back svg path {
		fill: #515151c3;
	}
	.back:hover svg path {
		fill: black;
	}

	h1 {
		text-transform: capitalize;
	}
	h3 {
		margin-inline: 20px;
		margin-bottom: 0;
		color: var(--green);
		border-bottom: 1px solid var(--green);
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

	.preview {
		width: 100%;
		height: auto;
		/* margin-top: 20px; */
	}

	.preview img {
		width: 200px;
		max-width: 100%;
	}
</style>
