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

/** Latest Carwise reviews with comments (shop page shows 999 reviews, 4.9 stars). Synced 2026-11-01. */
export const reviews: SiteReview[] = [
	{
		comment: "I have to say, McClinton staff were the most welcoming and friendly staff i have ever experienced at an Auto repair shop, and My 4-Runner looks great! I will definitely go back, if need be. Thank you!",
		customerName: "Stephanie",
		carMake: "Toyota"
	},
	{
		comment: "The repair job was excellent, thanks for doing a little bit of extra on my daughter‘s car. It comes around to help you out as I send all my friends ,workers and family to you guys. Thanks again for the great work. ,",
		customerName: "Pat",
		carMake: "Ford"
	},
	{
		comment: "They did a great job and were very nice . The painter was amazing, hopefully we don't have to go back but if we do we will go there.",
		customerName: "Geri",
		carMake: "Ford"
	},
	{
		comment: "Great service, super friendly, I would definitely refer them",
		customerName: "Kathleen",
		carMake: "Mazda"
	},
	{
		comment: "Thanks so much for your hard work! My car looks great.",
		customerName: "Theodore",
		carMake: "Chevrolet"
	},
	{
		comment: "Did a great job, recommend them anytime.",
		customerName: "Teresa",
		carMake: "Honda"
	},
	{
		comment: "McClinton’s went the extra mile to get my Honda CRV into new condition from the windshield forward. I can’t say enough to recommend this business to anyone needing repair work",
		customerName: "John",
		carMake: "Honda"
	},
	{
		comment: "I would highly recommend McClinton , it was my first experience with them, and they were so friendly and easy to work with . Josh was great . Hopefully won't need to see them anytime soon, 😄 But if I do , that's where I will go Thank you",
		customerName: "Susan",
		carMake: "Volvo"
	},
	{
		comment: "We would TOTALLY recommend McClinton Auto Collision. Full disclosure. We took our vehicle there twice on recommendation from our insurance company. We are very happy with our experience there.\n\nThe repairs to our Hyundai Tucson makes it like new again.\n\nIf I could give McClinton a higher score, I would. Their customer service is excellent!!",
		customerName: "Darlene",
		carMake: "Hyundai"
	},
	{
		comment: "They were very thorough and kept me informed of the progress. They completed the repairs a week ahead of schedule.\n\nGreat work, staff was easy to work with. Kept me informed every step of the way.\n\nVery helpful.",
		customerName: "Lisa",
		carMake: "Chevrolet"
	},
	{
		comment: "The Crew did a wonderful job fixing my rear bumper after getting rear ended. I got the car back 3 days earlier than expected. Everything looks brand new! They all rock 🤘🏼\n\nI would send a friend there\n\nWe are very happy with the outcome of the work done on my 2025 Chevy equinox! We even got the car back a couple day before the initial expected date it would be finished! Good job everyone!\n\nEverything was great, wonderful customer service",
		customerName: "Daniel",
		carMake: "Chevrolet"
	},
	{
		comment: "Absolutely 10/10 experience. Very straightforward, professional and easy process.",
		customerName: "Sheila",
		carMake: "Kia"
	},
	{
		comment: "You guys did an amazing job! The finish on my hood feels like polished glass. You guys are definitely the shop I will be recommending to my friends and family!",
		customerName: "Garrett",
		carMake: "Dodge"
	},
];

export const siteContent = {
	allSections,
	galleryData,
	servicesData,
	settings,
	reviews,
	userProfile: null as null
};
