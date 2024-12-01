import Mailgun from 'mailgun.js';
import formData from 'form-data'; // Make sure to import form-data
import { error } from '@sveltejs/kit';
import axios from 'axios';
import * as cheerio from 'cheerio';

import { VITE_MAILGUN_API_KEY, VITE_EMAIL_TO } from '$env/static/private'; // Import server-side env variables
import { getOrCreateUserProfile } from '$lib/auth/index.js';

// Initialize Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: VITE_MAILGUN_API_KEY });

type Review = {
  comment: string;
  customerName: string;
  carMake: string;
};

type LoadResponse = {
  reviews?: Review[];
  userProfile?: any;
  error?: string;
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
      // Prepare email data
      const mailgunData = {
        from: `${name} <${email}>`,
        to: VITE_EMAIL_TO, // Use the server-side env variable for the recipient
        subject: 'New Contact Form Submission',
        text: `From: ${name} (${email})\nPhone: ${phone}\n\n${message}`
      };

      // Send the email via Mailgun
      await mg.messages.create(
        'sandboxc6fe94f30eb741b4af19a6e43da69e4a.mailgun.org',
        mailgunData
      );

      return { success: true, message: 'Message sent successfully.' };
    } catch (err) {
      console.error(err); // Log the error for debugging
      throw error(500, 'Failed to send message');
    }
  }
};

export async function load({ locals }): Promise<LoadResponse> {
  try {
    // Scraping reviews
    const url =
      'https://www.carwise.com/auto-body-shops/shopPlugin?rfid=555006&re=1&type=f&theme=&size=m&zip=&demo=f&ap=false';
    const { data } = await axios.get<string>(url); // Specify the type of response data

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

    // Loading user profile
    const userProfile = await getOrCreateUserProfile(locals);

    // Return both reviews and userProfile
    return {
      reviews,
      userProfile,
    };
  } catch (error) {
    console.error('Error occurred:', error);
    return {
      error: 'Failed to load data',
    };
  }
}