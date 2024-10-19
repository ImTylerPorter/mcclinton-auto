import axios from 'axios';
import * as cheerio from 'cheerio';

export async function load() {
  try {
    const url = 'https://www.carwise.com/auto-body-shops/shopPlugin?rfid=555006&re=1&type=f&theme=&size=m&zip=&demo=f&ap=false';
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    let reviews = [];

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

    return {
      reviews
    };
  } catch (error) {
    console.error('Error scraping the website:', error);
    return {
      error: 'Failed to scrape the website'
    };
  }
}


