// estimate-quotes.mjs
import fetch from 'node-fetch';

const seen = new Set();
const maxAttempts = 1000;

for (let i = 0; i < maxAttempts; i++) {
  try {
    const response = await fetch(`https://ue-code.eu/api/randomquote?nocache=${Date.now()}`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });

    const data = await response.json();

    if (data.Quote) {
      seen.add(data.Quote); // Capitalized key
    }

    if (i % 100 === 0) {
      console.log(`Attempt ${i}: Unique quotes so far = ${seen.size}`);
    }

    // Optional: Throttle a little to avoid server issues
    if (i % 50 === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (error) {
    console.error(`Error at attempt ${i}:`, error);
  }
}

console.log(`✅ Finished! Estimated number of unique quotes: ${seen.size}`);

