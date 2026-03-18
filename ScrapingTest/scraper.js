const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Enable stealth plugin with all evasion techniques
puppeteer.use(StealthPlugin());

async function scrapeZomato() {
    console.log('🤖 Starting Isolated Scraping Experiment...');

    // Launch browser in non-headless mode so you can see what it does
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });

    const page = await browser.newPage();

    try {
        console.log('🌐 Navigating to a Zomato Pune restaurant page...');
        // Going to a popular restaurant in Pune
        await page.goto('https://www.zomato.com/pune/kayani-bakery-east-street/order', {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        console.log('⏳ Waiting for the menu to load...');

        // Wait for a food item title to appear - Zomato uses dynamic classes like 'sc-1s0saks-11'
        // But an h4 usually contains the item name.
        await page.waitForSelector('h4', { timeout: 15000 });

        console.log('🔎 Searching for items and prices...');
        // Extract the first 3 items we see
        const items = await page.evaluate(() => {
            const results = [];
            // Zomato usually wraps items in specific div structures.
            // We'll grab h4s and try to find the price next to them.
            const itemNodes = document.querySelectorAll('h4');

            for (let i = 0; i < Math.min(itemNodes.length, 3); i++) {
                const nameNode = itemNodes[i];
                const name = nameNode.innerText.trim();

                // Climb up and then find the price span (usually contains ₹)
                const container = nameNode.closest('div').parentElement;
                const priceMatch = container ? container.innerText.match(/₹\d+/) : null;
                const price = priceMatch ? priceMatch[0] : 'Price Not Found';

                results.push({ name, price });
            }
            return results;
        });

        console.log('\n✅ Extraction Complete! Here is what we found live:');
        console.table(items);

        console.log('\nClosing browser in 10 seconds...');
        await new Promise(r => setTimeout(r, 10000));

    } catch (err) {
        console.error('\n❌ Scraping Failed or Blocked by Anti-Bot Protection!');
        console.error('Error Details:', err.message);

        // Take a screenshot to see if it was a CAPTCHA
        await page.screenshot({ path: 'blocked-screenshot.png' });
        console.log('\n📸 Saved a screenshot to "blocked-screenshot.png" so you can see what stopped us.');
    } finally {
        await browser.close();
        console.log(' shutting down.');
    }
}

scrapeZomato();
