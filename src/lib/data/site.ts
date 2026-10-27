/**
 * Hard-coded site content exported from Supabase project ceugkpdqcpqktznfxykd
 * on 2026-10-27. Public pages read from this module — no runtime DB/Supabase.
 * Image URLs point at files already in static/images/ (same assets as Storage).
 */

export type SiteSection = {
	id: string;
	sectionName: string;
	title: string | null;
	subTitle: string | null;
	content: string | null;
	tagline: string | null;
	buttonText: string | null;
	buttonLink: string | null;
	image: string | null;
	extraData: unknown;
};

export type SiteSettings = {
	id: string;
	phoneNumber: string | null;
	email: string | null;
	address: string | null;
	facebookLink: string | null;
	instagramLink: string | null;
};

export type SiteReview = {
	comment: string;
	customerName: string;
	carMake: string;
};

const GALLERY_SECTION_ID = '71ca4a5d-a550-46f0-9c46-9d9834ea4c55';
const SERVICES_SECTION_ID = '4bd8e138-14ec-4316-a23c-6f403beb2b2f';

export const settings: SiteSettings = {
	id: '2b9f0df6-8333-485b-8c70-6dac30d9768c',
	phoneNumber: '541•967•9528',
	email: 'info@mcclintonauto.com',
	address: '3960 E Commercial Way SE Albany, OR 97322',
	facebookLink: 'https://www.facebook.com/mcclintonautocollision',
	instagramLink: 'https://www.instagram.com/mcclintonauto'
};

export const allSections: SiteSection[] = [
	{
		id: 'a7c40300-6a44-41e3-be6f-642995558c68',
		sectionName: 'hero',
		title: 'AUTO COLLISION SPECIALIST AT COMPETITIVE PRICING!',
		subTitle: null,
		content: '<p><strong><em>Providing the best possible service for your vehicle.</em></strong></p>',
		tagline: null,
		buttonText: 'Contact Us!',
		buttonLink: '#contact',
		image: '/images/hero-bg.jpg',
		extraData: null
	},
	{
		id: SERVICES_SECTION_ID,
		sectionName: 'services',
		title: 'MCCLINTON AUTO COLLISION',
		subTitle: 'WELCOME TO',
		content:
			"<p>McClinton Auto Collision is your late model, collision repair specialist. We repair all makes and models for all insurance companies and those paying out of pocket! If you've been in an auto accident, call us today!</p>",
		tagline: 'Auto & Body Repair Specialist',
		buttonText: 'Contact Us',
		buttonLink: '#contact',
		image: '/images/building.jpg',
		extraData: null
	},
	{
		id: 'e85fd60f-ac78-4f06-a7dd-5389c472b382',
		sectionName: 'about',
		title: 'MCCLINTON AUTO COLLISION',
		subTitle: 'ABOUT',
		content:
			"<p>McClinton Auto Collision was started by owner Mark McClinton in 1997 when he decided it was time to provide Albany with quality repairs and quick turnaround. Mark has been in the business for over 40 years. Today Mark's son Aaron is in control of operations and has continued to grow the company to be competitive and relevant in todays market. With new flare mixed with significant experience McClinton Auto Collision is sure to be your best bet for vehicle repair and restoration. Call us today!</p>",
		tagline: null,
		buttonText: null,
		buttonLink: null,
		image: '/images/us.jpg',
		extraData: null
	},
	{
		id: 'af5f5c34-1057-40e6-bebd-09ca9df5e005',
		sectionName: 'testimonials',
		title: 'Client Reviews',
		subTitle: null,
		content: '',
		tagline: null,
		buttonText: null,
		buttonLink: null,
		image: '/images/reviews.jpg',
		extraData: null
	},
	{
		id: GALLERY_SECTION_ID,
		sectionName: 'gallery',
		title: 'Our Gallery',
		subTitle: null,
		content: '',
		tagline: null,
		buttonText: null,
		buttonLink: null,
		image: null,
		extraData: null
	},
	{
		id: '031201d7-761a-46e0-8e7f-5dea9e821ba1',
		sectionName: 'outro',
		title: 'Years in Business',
		subTitle: null,
		content:
			'<p>We are your local, family owned collision repair facility. We offer complete, high-quality repairs on all 2009 and newer vehicles, for all insurance companies and those paying out of pocket! We offer the latest auto body technology. You always have a choice when choosing your repair shop! Call us today for more information about having your damaged vehicle repaired.</p>',
		tagline: null,
		buttonText: 'Contact Us: 541•967•9528',
		buttonLink: 'tel:5419679528',
		image: null,
		extraData: null
	},
	{
		id: '5ac6e72b-c64d-46a2-bd4b-efc7f02e8406',
		sectionName: 'contact',
		title: 'Contact Us',
		subTitle: null,
		content: '<p>Send us a message. We will get back to you as soon as possible!</p>',
		tagline: null,
		buttonText: null,
		buttonLink: null,
		image: null,
		extraData: null
	}
];

export const galleryData: Record<string, { imageUrl: string }[]> = {
	[GALLERY_SECTION_ID]: [
		{ imageUrl: '/images/two.jpg' },
		{ imageUrl: '/images/three.jpg' },
		{ imageUrl: '/images/one.jpg' }
	]
};

export const servicesData: Record<string, { title: string; imageUrl: string | null }[]> = {
	[SERVICES_SECTION_ID]: [
		{ title: 'Auto Body Painting', imageUrl: '/images/paint.jpg' },
		{ title: 'Dent Repair', imageUrl: '/images/dent.jpg' },
		{ title: 'Collision Repair', imageUrl: '/images/paint.jpg' }
	]
};

/** Carwise scrape was empty/403 at export time; section still renders with Carwise link. */
export const reviews: SiteReview[] = [];

export const siteContent = {
	allSections,
	galleryData,
	servicesData,
	settings,
	reviews,
	userProfile: null as null
};
