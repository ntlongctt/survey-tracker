const puppeteer = require("puppeteer");

// export type TrackingType =
//   | 'click'
//   | 'load'
//   | 'text-select'
//   | 'input'
//   | 'submit'
//   | 'resize'
//   | 'focus-in'
//   | 'focus-out'
//   | 'first-interaction'
//   | 'answer-question'
//   | 'answer-select'
//   | 'question-select'
//   | 'answer-copy'
//   | 'question-copy'
//   | 'text-copy'
//   | 'text-paste';

const PAGE_URL =
	"https://tgm.mobi/survey/SSU4002?surveytest=1&bd=0&lang=en&s=test&utm_medium=United+Kingdom&utm_source=Test&c=United+Kingdom+TEST+EN&_a=IO470";

(async () => {
	// Launch a new browser instance with developer tools open
	const browser = await puppeteer.launch({ headless: false, devtools: true });
	// Open a new page
	const page = await browser.newPage();

	// Function to inject the script
	const injectScript = async () => {
		await page.addScriptTag({ path: "./survey-tracker.js" });
	};

	// Listen for navigation events
	page.on("framenavigated", async (frame) => {
		if (frame === page.mainFrame()) {
			console.log("Page navigated to:", frame.url());
			await injectScript();
		}
	});

	// Navigate to the initial page and wait for it to load completely
	await page.goto(PAGE_URL, { waitUntil: "networkidle0" });

	// Initial script injection
	await injectScript();

	// Optionally, wait for the button click and navigation
	await page.waitForSelector("#btn-next");

	// The script will be re-injected automatically after navigation
	// ... additional code if needed ...

	// Close the browser
	// await browser.close();
})();
