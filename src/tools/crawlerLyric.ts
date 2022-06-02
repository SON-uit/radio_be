import puppeteer from "puppeteer";
const crawlerLyric = async (url: string): Promise<string[]> => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2"
  });
  const lyrics = await page.evaluate(() => {
    const lyricDetails = document.querySelector(".lyrics_details > span")?.textContent;
    const result: string[] = lyricDetails?.split("\n") || [];
    return result;
  });
  await browser.close();
  return Promise.resolve(lyrics);
};
export default crawlerLyric;
