<script lang="ts">
	import { page } from '$app/stores';
	let { data } = $props();
	// States for form data
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');
	let messageSent = $state(false);

	// Form error with an initial null value
	let formError = $state<string | null>(null);

	// Submit function with proper TypeScript types
	const submitForm = async (event: Event): Promise<void> => {
		event.preventDefault();

		// Create FormData
		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('phone', phone);
		formData.append('message', message);

		try {
			const response = await fetch($page.url.pathname, {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				const errorData = await response.json();
				formError = errorData?.error?.message || 'An unexpected error occurred';
				return;
			}

			const data = await response.json();
			if (data.status === 200) {
				formError = null;
				messageSent = true;
			} else {
				formError = 'An error occurred';
			}
		} catch (error) {
			formError = 'An unexpected error occurred';
		}
	};
</script>

<section id="contact" data-id="Contact">
	<div class="container">
		<div class="contactBox">
			{#if !messageSent}
				<h3>Contact Us</h3>
				<p>Send us a messsage. We will get back to you as soon as possible!</p>
				<form onsubmit={submitForm}>
					{#if formError}
						<p style="color:red;">{formError}</p>
					{/if}
					<div class="fieldGroup">
						<label>
							<input bind:value={name} type="text" name="name" placeholder="Name" required />
						</label>
						<label>
							<input bind:value={email} type="email" name="email" placeholder="Email" required />
						</label>
						<label>
							<input
								bind:value={phone}
								type="phone"
								name="phone"
								placeholder="Phone Number"
								required
							/>
						</label>
					</div>
					<label>
						<textarea bind:value={message} name="Message" placeholder="Message" required></textarea>
					</label>
					<input type="text" name="_honey_pot" style="display:none" />
					<button class="button" type="submit">SEND</button>
				</form>
			{:else}
				<div class="messageSent">
					<h3>Thank you for your message, {name ? name.split(' ')[0] : 'valued customer'}!</h3>
					<p>We look forward to speaking and will reach out soon!</p>
				</div>
			{/if}
		</div>
	</div>
	<div class="centered-green-bg"></div>
</section>

<style>
	#contact {
		padding: 100px 0;
		position: relative;
		overflow: hidden;
	}
	.container {
		width: 1000px;
		position: relative;
		z-index: 2;
	}
	.contactBox {
		background: white;
		padding: 50px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
	}
	h3,
	p {
		text-align: center;
	}
	h3 {
		color: var(--green);
		font-size: 2.2rem;
		letter-spacing: 2px;
		text-transform: uppercase;
		margin: 0;
	}
	p {
		font-size: 1.2rem;
	}
	.fieldGroup {
		display: flex;
		gap: 20px;
		justify-content: center;
	}
	label {
		width: 100%;
	}
	input {
		width: 99%;
		background: #e9e9e9;
		border: 1px solid #767676;
		text-indent: 10px;
		min-height: 30px;
	}
	input:focus-within,
	textarea:focus-within {
		border-color: var(--green);
		outline-color: var(--green);
	}

	textarea {
		margin-top: 20px;
		width: 100%;
		min-height: 200px;
		background: #e9e9e9;
		border: 1px solid #767676;
		text-indent: 10px;
		padding: 10px 0;
		font-size: 1.1rem;
	}
	.centered-green-bg {
		background: var(--green);
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 30%;
		height: 100vh;
	}
	.button {
		margin: 40px auto 0;
		border: none;
		display: block;
		padding: 14px 48px;
	}

	@media (max-width: 869px) {
		.centered-green-bg {
			width: 60%;
		}
		.fieldGroup {
			flex-direction: column;
		}
	}
	@media (max-width: 480px) {
		.centered-green-bg {
			width: 80%;
		}
	}
</style>
