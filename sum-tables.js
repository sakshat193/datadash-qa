const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 18 + i);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (const seed of seeds) {
    const url = `https://datadash-iitm.github.io/reports/seed${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.textContent.replace(/,/g, '')))
        .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum:`, pageSum);

    totalSum += pageSum;
  }

  console.log(`✅ FINAL TOTAL SUM: ${totalSum}`);
  await browser.close();
})();
