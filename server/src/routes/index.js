import { Router } from "express";
import { scrapeAmazonProduct } from "../lib/scraper.js"
import { handleAmazonProduct } from "../lib/handler.js";

const router = Router();

router.post('/scrape', async (req, res) => {
    try {
        const rowData = await scrapeAmazonProduct(req?.body?.url);
        const data = await handleAmazonProduct(rowData);
        return res.json(data);
    } catch (error) {
        console.log('Something went wrong in scraping API .');
        console.log('ERROR : ', error);
    }
})

export default router;