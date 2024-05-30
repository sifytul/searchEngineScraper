import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    userDataDir: "temp",
  });
  const page = await browser.newPage();
  const searchEngineUrl = "https://duckduckgo.com/";

  await page.goto(searchEngineUrl);

  await page.type("#searchbox_input", "entrptaher", { delay: 100 });
  await page.keyboard.press("Enter");
  const searchResultSelector = ".react-results--main";
  await page.waitForSelector(searchResultSelector);

  const resultsArray = await page.$$eval(".wLL07_0Xnd1QZpzpfR4W", (results) => {
    return results.map((singleResult) => {
      const resultUrl = singleResult.querySelector(
        "a[data-testid='result-title-a']"
      ).href;
      const title = singleResult.querySelector(
        "a[data-testid='result-title-a']"
      ).innerText;
      const desc = singleResult.querySelector(
        ".E2eLOJr8HctVnDOTM8fs"
      ).innerText;

      return { resultUrl, title, description: desc };
    });
  });

  console.log("resultsArray: ", resultsArray);

  console.log("Done!");
  await browser.close();
})();
