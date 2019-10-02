const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const writeStream = fs.createWriteStream('post.csv');

//write headers
writeStream.write(`Title,Link,Date \n`);

request('https://www.docwirenews.com/health-and-wellness/', (error, response, html) => {
if(!error && response.statusCode ==200) {
    const $ = cheerio.load(html);

   // const siteHeading = $('.td-pulldown-size');
   // console.log(siteHeading.text());
   $('.item-details').each((i, el) => {
       const item = $(el).find('h3').text().replace(/\s\s+/g, '');
       const link = $(el).find('a').attr('href');
       const date = $(el).find('.td-module-meta-info').text().replace(/,/,'');
       //write rows to scv 
        writeStream.write(`${item},${link},${date} \n`);
   }); 
   console.log('Scraping is done..')  
}
});