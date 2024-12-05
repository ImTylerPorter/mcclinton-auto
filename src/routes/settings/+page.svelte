<script lang="ts">
	import { page } from '$app/stores';
	import { goto, afterNavigate } from '$app/navigation';
	import type { PageData } from './$types';
	import type { Settings } from '../../types';
	import { handleSubmit } from './formHandlers';

	let { data } = $props<{ data: PageData }>();

	let { settings } = data;

	let settingsState = $state<Settings>({
		id: settings.id,
		phoneNumber: settings.phoneNumber || '',
		email: settings.email || '',
		address: settings.address || '',
		facebookLink: settings.facebookLink || '',
		instagramLink: settings.instagramLink || ''
	});

	let formError = $state('');
	let previousPath = $state('');

	afterNavigate(({ from }) => {
		previousPath = from?.url.pathname || '';
	});

	const goBack = () => {
		goto(previousPath);
	};

	function handleFormSubmit(event: SubmitEvent) {
		handleSubmit(event, settingsState, formError, $page.url.pathname);
	}
</script>

<main>
	<div class="container">
		<div class="card">
			<button class="back" onclick={goBack}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
					<path
						d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
					/>
				</svg>
				<span>Go Back</span>
			</button>
			<h1>Settings</h1>
			<form onsubmit={handleFormSubmit} enctype="multipart/form-data">
				{#if formError}
					<p class="error">{formError}</p>
				{/if}

				<label>
					<span>Phone Number:</span>
					<input type="text" name="phone_number" bind:value={settingsState.phoneNumber} />
				</label>

				<label>
					<span>Email:</span>
					<input type="email" name="email" bind:value={settingsState.email} />
				</label>

				<label>
					<span>Address:</span>
					<input type="address" name="address" bind:value={settingsState.address} />
				</label>

				<label>
					<span>Facebook Link:</span>
					<input type="url" name="facebook_link" bind:value={settingsState.facebookLink} />
				</label>

				<label>
					<span>Instagram Link:</span>
					<input type="url" name="instagram_link" bind:value={settingsState.instagramLink} />
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
