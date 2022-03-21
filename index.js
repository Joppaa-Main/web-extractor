
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('Products11.csv');
const axios = require('axios');

// Write Headers
writeStream.write(`Title,imageSrc,Price \n`);
const extUrl = 'https://www.petsathome.com/shop/en/pets/cat/new-cat-products';
axios(extUrl)
.then (response  => {
 const html = response.data 
    const $ = cheerio.load(html)
// parent division
    $('.product-tile').each((i, el) => {
      const title = $(el)
      // parent division children
      .find('h4')
        .text()
        .replace(/\s\s+/g, '');
      const imageSrc = $(el)
      // image is a bit of a headche ngl, need to use children keyword only if using src images
      .find('.product-tile__image-wrapper').children('img').eq(0).attr('src');
      const price = $(el)
      .find('.product-tile__price')
      .text()
      

      // Write Row To CSV
      writeStream.write(`${title}, ${imageSrc}, ${price} \n`);
    })

    console.log('Scraping Done...')
  }
);