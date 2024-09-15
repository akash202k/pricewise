import * as cheerio from "cheerio";


export const handleAmazonProduct = async (rowData) => {
    console.log('handler started ...');
    // console.log(rowData);
    const $ = cheerio.load(rowData);
    let title = $('#title').text().trim();
    const price = $('.a-price-whole').first().text().trim().replace(/\.$/, '');
    const imageUrl = $('#imgTagWrapperId img').attr('src');

    console.log(title)
    const data = {
        title: title || 'null',
        price: price || 'null',
        imageUrl: imageUrl || 'null'
    }
    console.log("data : ", data)
    return data;
}
