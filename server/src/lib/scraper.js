import fs from 'fs';
import puppeteer from 'puppeteer';
import { autoScroll } from './helper.js';

export async function scrapeAmazonProduct(url) {
    if (!url) {
        console.error("URL is not provided.");
        return;
    }

    try {
        // BrightData proxy configuration
        const username = String(process.env.BRIGHT_DATA_USERNAME);
        const password = String(process.env.BRIGHT_DATA_PASSWORD);
        const port = 22225;
        // const proxy = `http://${username}:${password}@brd.superproxy.io:${port}`;
        const proxyHost = `brd.superproxy.io:${port}`

        console.log(`Using proxy: ${proxyHost}`);

        const browser = await puppeteer.launch({
            // args: [`--proxy-server=${proxyHost}`],
            headless: true,
            ignoreHTTPSErrors: true
        });

        const page = await browser.newPage();
        // await page.authenticate({
        //     username: process.env.BRIGHT_DATA_USERNAME,
        //     password: process.env.BRIGHT_DATA_PASSWORD
        // });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        console.log("Navigating to page ...");
        await page.goto(url, { waitUntil: 'networkidle2' });

        console.log("Scrolling the page ...");
        await autoScroll(page);

        // Optional wait to ensure content loads properly
        console.log('Waiting for 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Capture page content
        const html = await page.content();
        // await browser.close();

        if (!html || html.trim().length === 0) {
            throw new Error("No content loaded from the page.");
        }

        console.log('HTML content length:', html.length);
        fs.writeFileSync('html.html', html, 'utf8');
        return html;

    } catch (error) {
        console.error("Something went wrong in the scraper :( ");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
    }
}
