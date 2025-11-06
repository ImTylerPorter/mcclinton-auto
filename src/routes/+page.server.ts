import { Resend } from 'resend';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { db} from '$lib/db'
import { VITE_RESEND_API_KEY, VITE_EMAIL_TO, VITE_EMAIL_FROM } from '$env/static/private'; // Import server-side env variables
import { getOrCreateUserProfile } from '$lib/auth/index.js';
import { sectionsTable, galleryTable, servicesTable, globalSettingsTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
// Initialize Resend
const resend = new Resend(VITE_RESEND_API_KEY);

type Review = {
  comment: string;
  customerName: string;
  carMake: string;
};

type LoadResponse = {
  reviews?: Review[];
  userProfile?: any;
  allSections?: {
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
  }[];
  galleryData?: Record<string, { imageUrl: string }[]>;
  servicesData?: Record<string, { title: string; imageUrl: string | null }[]>;
  settings?: {
    id: string;
    phoneNumber: string | null;
    email: string | null;
    address: string | null;
    facebookLink: string | null;
    instagramLink: string | null;
  };
  error?: string;
  message?: string | null;
};

export const actions = {
  default: async ({ request }: { request: Request }) => {
    const data = await request.formData();

    // Extract form values
    const name = data.get('name');
    const email = data.get('email');
    const phone = data.get('phone');
    const message = data.get('message');
    const honeyPot = data.get('_honey_pot');

    // Simple bot protection using a honeypot field
    if (honeyPot) {
      throw error(400, 'Sorry, not today bot!');
    }

    // Validate form fields
    if (!name) {
      throw error(400, 'Name is missing');
    }

    if (!email) {
      throw error(400, 'Email is missing');
    }

    if (!phone) {
      throw error(400, 'Phone number is missing');
    }

    if (!message) {
      throw error(400, 'Message is missing');
    }

    try {
      // Send the email via Resend
      await resend.emails.send({
        from: VITE_EMAIL_FROM, // Must be a verified domain in Resend
        to: VITE_EMAIL_TO,
        subject: 'New Contact Form Submission',
        text: `From: ${name} (${email})\nPhone: ${phone}\n\n${message}`,
        replyTo: email as string
      });

      return { success: true, message: 'Message sent successfully.' };
    } catch (err) {
      console.error(err); // Log the error for debugging
      throw error(500, 'Failed to send message');
    }
  }
};

export async function load({ locals, url }): Promise<LoadResponse> {
  try {

    const message = url.searchParams.get('message') || null;

    const apiUrl =
      'https://www.carwise.com/auto-body-shops/shopPlugin?rfid=555006&re=1&type=f&theme=&size=m&zip=&demo=f&ap=false';
    const { data } = await axios.get<string>(apiUrl); // Specify the type of response data

    const $ = cheerio.load(data);
    let reviews: Review[] = []; // Initialize reviews with the defined type

    $('#reviewList li.reviewListItem').each((i, elem) => {
      const comment = $(elem).find('.comment').text().trim();
      const customerName = $(elem).find('.customerName').text().trim();
      const carMake = $(elem).find('.carMake').text().trim();

      if (comment !== '') {
        reviews.push({
          comment,
          customerName,
          carMake,
        });
      }
    });

    // Load user profile, sections and settings
    const userProfile = await getOrCreateUserProfile(locals);
    const allSections = await db.select().from(sectionsTable);
    const settings = await db.select().from(globalSettingsTable)

    // Fetch gallery data
    const gallerySections = allSections.filter((section) => section.sectionName === 'gallery');
    const galleryData: Record<string, { imageUrl: string }[]> = {};
    for (const section of gallerySections) {
      const images = await db
        .select()
        .from(galleryTable)
        .where(eq(galleryTable.sectionId, section.id));
      galleryData[section.id] = images; // Store images by section ID
    }

    // Fetch services data
    const servicesSections = allSections.filter((section) => section.sectionName === 'services');
    const servicesData: Record<string, { title: string; imageUrl: string | null }[]> = {};
    for (const section of servicesSections) {
      const services = await db
        .select()
        .from(servicesTable)
        .where(eq(servicesTable.sectionId, section.id));
      servicesData[section.id] = services; // Store services by section ID
    }

    return {
      reviews,
      userProfile,
      allSections,
      galleryData,
      servicesData,
      settings: settings[0],
      message
    };
  } catch (error) {
    console.error('Error occurred:', error);
    return { error: 'Failed to load data' };
  }
}