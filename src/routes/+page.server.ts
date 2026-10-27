import { Resend } from 'resend';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { siteContent } from '$lib/data/site';

type Review = {
	comment: string;
	customerName: string;
	carMake: string;
};

type LoadResponse = {
	reviews: Review[];
	userProfile: null;
	allSections: typeof siteContent.allSections;
	galleryData: typeof siteContent.galleryData;
	servicesData: typeof siteContent.servicesData;
	settings: typeof siteContent.settings;
	message: string | null;
};

export const actions = {
	default: async ({ request }: { request: Request }) => {
		const data = await request.formData();

		const name = data.get('name');
		const email = data.get('email');
		const phone = data.get('phone');
		const message = data.get('message');
		const honeyPot = data.get('_honey_pot');

		if (honeyPot) {
			throw error(400, 'Sorry, not today bot!');
		}

		if (!name) throw error(400, 'Name is missing');
		if (!email) throw error(400, 'Email is missing');
		if (!phone) throw error(400, 'Phone number is missing');
		if (!message) throw error(400, 'Message is missing');

		const apiKey = env.VITE_RESEND_API_KEY;
		const emailFrom = env.VITE_EMAIL_FROM;
		const emailTo = env.VITE_EMAIL_TO;

		if (!apiKey || !emailFrom || !emailTo) {
			console.error('Resend env vars missing; contact form unavailable on this deploy');
			throw error(503, 'Contact form temporarily unavailable');
		}

		try {
			const resend = new Resend(apiKey);
			await resend.emails.send({
				from: emailFrom,
				to: emailTo,
				subject: 'New Contact Form Submission',
				text: `From: ${name} (${email})\nPhone: ${phone}\n\n${message}`,
				replyTo: email as string
			});

			return { success: true, message: 'Message sent successfully.' };
		} catch (err) {
			console.error(err);
			throw error(500, 'Failed to send message');
		}
	}
};

export async function load({ url }): Promise<LoadResponse> {
	const message = url.searchParams.get('message') || null;

	return {
		reviews: siteContent.reviews,
		userProfile: null,
		allSections: siteContent.allSections,
		galleryData: siteContent.galleryData,
		servicesData: siteContent.servicesData,
		settings: siteContent.settings,
		message
	};
}
