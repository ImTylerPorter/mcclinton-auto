<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '../../components/Logo.svelte';

	type FormState = {
		email: string;
		password: string;
		confirmPassword: string;
		passphrase: string;
		session: any | null; // Adjust 'any' to a more specific type if possible
		error: string;
		isLogin: boolean;
	};

	let formState = $state<FormState>({
		email: '',
		password: '',
		confirmPassword: '',
		passphrase: '',
		session: null,
		error: '',
		isLogin: true
	});

	function toggleForm(): void {
		formState.isLogin = !formState.isLogin;
	}

	function clearError(): void {
		formState.error = '';
	}

	async function handleSubmit(event: Event): Promise<void> {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const { isLogin, password, email, confirmPassword, passphrase } = formState;

		if (!email) {
			formState.error = 'Email? Never heard of it!';
			return;
		}
		if (!password) {
			formState.error = 'Password? You must be new here.';
			return;
		}
		if (!isLogin) {
			if (!passphrase) {
				formState.error = "Passphrase? It's like a password, but cooler.";
				return;
			}
			if (password !== confirmPassword) {
				formState.error = "Passwords don't match. Did you blink?";
				return;
			}
		}

		if (isLogin) formData.append('isLogin', `${isLogin}`);
		if (!isLogin) formData.append('passphrase', passphrase);

		try {
			const response = await fetch($page.url.pathname, {
				method: 'POST',
				body: formData
			});
			const result = await response.json();
			formState.error = response.ok
				? 'Logged in!'
				: result.error.message || 'Operation failed. Humanity still not advanced enough.';
		} catch (err) {
			formState.error = 'An error occurred. Did we break the space-time continuum?';
		}
	}
</script>

<main>
	<div class="container">
		<div class="card">
			<header>
				<a href="/" class="logo">
					<Logo />
				</a>
			</header>
			<h1>{formState.isLogin ? 'Login' : 'Sign Up'}</h1>
			{#if formState.error}
				<p class="error">{formState.error}</p>
			{/if}
			<form class="form" onsubmit={handleSubmit}>
				<label>
					<span>Email</span>
					<input
						required
						type="email"
						name="email"
						bind:value={formState.email}
						oninput={clearError}
					/>
				</label>
				<label>
					<span>Password</span>
					<input
						required
						type="password"
						name="password"
						bind:value={formState.password}
						oninput={clearError}
					/>
				</label>
				{#if !formState.isLogin}
					<label>
						<span>Confirm Password</span>
						<input
							required
							type="password"
							name="confirmPassword"
							bind:value={formState.confirmPassword}
							oninput={clearError}
						/>
					</label>
					<label>
						<span>Secret Passphrase</span>
						<input
							required
							type="text"
							name="passphrase"
							bind:value={formState.passphrase}
							oninput={clearError}
						/>
					</label>
				{/if}
				<button type="submit">{formState.isLogin ? 'Login' : 'Sign Up'}</button>
			</form>
		</div>
		<div class="details">
			{#if formState.isLogin}
				<button onclick={toggleForm}>Don't have an account?</button>
			{:else}
				<button onclick={toggleForm}>Have an account? Login!</button>
			{/if}
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
	header {
		background: var(--grey);
		padding: 20px;
	}
	h1 {
		font-size: 1.8rem;
		text-transform: uppercase;
		letter-spacing: 2px;
	}
	.logo {
		width: 200px;
		display: block;
		margin: 0 auto;
	}
	.details {
		margin-top: 20px;
	}
	.details > button {
		cursor: pointer;
		border: 1px solid var(--green);
		background: transparent;
		color: var(--green);
	}

	.details > button:hover {
		background: var(--green);
		color: white;
	}
	.error {
		font-weight: bold;
		text-align: center;
		color: var(--orange);
		text-transform: uppercase;
	}

	.form {
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
