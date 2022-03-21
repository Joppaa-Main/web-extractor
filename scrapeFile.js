const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post4.csv');

// Write Headers
writeStream.write(`Title,imageSrc,Price \n`);

request('https://www.petsathome.com/shop/en/pets/cat/new-cat-products', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $('.product-tile').each((i, el) => {
      const title = $(el)
      .find('h4')
        .text()
        .replace(/\s\s+/g, '');
      const imageSrc = $(el)
      .find('.product-tile__image-wrapper').children('img').eq(0).attr('src');
      const price = $(el)
      .find('.product-tile__price')
      .text()
      

      // Write Row To CSV
      writeStream.write(`${title}, ${imageSrc}, ${price} \n`);
    });

    console.log('Scraping Done...');
  }
});