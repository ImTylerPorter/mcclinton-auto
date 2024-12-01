import axios from 'axios';
import * as cheerio from 'cheerio';


type Review = {
  comment: string;
  customerName: string;
  carMake: string;
};

type LoadResponse = {
  reviews?: Review[];
  error?: string;
};

export async function load(): Promise<LoadResponse> {
  try {
    const url =
      'https://www.carwise.com/auto-body-shops/shopPlugin?rfid=555006&re=1&type=f&theme=&size=m&zip=&demo=f&ap=false';
    const { data } = await axios.get<string>(url); // Specify the type of response data

    const $ = cheerio.load(data);
    let reviews: Review[] = []; // Initialize reviews with the defined type

    // Scrape the reviews and push to the reviews array
    $('#reviewList li.reviewListItem').each((i, elem) => {
      const comment = $(elem).find('.comment').text().trim();
      const customerName = $(elem).find('.customerName').text().trim();
      const carMake = $(elem).find('.carMake').text().trim();

      if (comment !== '') {
        reviews.push({
          comment,
          customerName,
          carMake
        });
      }
    });

    return {
      reviews // Return the reviews array
    };
  } catch (error) {
    console.error('Error scraping the website:', error);
    return {
      error: 'Failed to scrape the website' // Return error message on failure
    };
  }
}
