<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import TextEditor from '../../../components/TextEditor.svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import type { PageData } from './$types';
	import type { SectionState, ServiceState, Service } from '../../../types';
	import { handleFileChange, handleServiceFileChange, handleSubmit } from './formHandlers';

	let { data } = $props<{ data: PageData }>();
	let { sectionData: section, servicesData: services } = data;

	let sectionState = $state<SectionState>({
		id: section.id,
		title: section.title || '',
		subTitle: section.subTitle || '',
		tagline: section.tagline || '',
		content: section.content || '',
		buttonText: section.buttonText || '',
		buttonLink: section.buttonLink || '',
		image: section.image || null,
		sectionName: section.sectionName
	});

	let servicesState = $state<ServiceState[]>(
		services.map((service: Service) => ({
			id: service.id,
			title: service.title || '',
			imageUrl: service.imageUrl || null,
			previewSrc: service.imageUrl || null
		}))
	);

	let formError = $state('');
	let previewSrc = $state('');

	let previousPath = $state('');

	afterNavigate(({ from }) => {
		previousPath = from?.url.pathname || '';
	});

	const goBack = () => {
		goto(previousPath);
	};

	function handleFormSubmit(event: SubmitEvent) {
		handleSubmit(event, sectionState, servicesState, formError, $page.url.pathname);
	}
</script>

<main>
	<div class="container">
		<div class="card">
			<button class="back" on:click={goBack}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
					<path
						d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
					/>
				</svg>
				<span>Go Back</span>
			</button>
			<h1>Editing {sectionState.sectionName}</h1>
			<form on:submit={handleFormSubmit} enctype="multipart/form-data">
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
					<input
						type="file"
						accept="image/*"
						on:change={(e) => handleFileChange(e, sectionState, previewSrc)}
					/>
				</label>

				{#if sectionState.sectionName === 'services' && servicesState.length}
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
								on:change={(e) => handleServiceFileChange(e, index, servicesState)}
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
