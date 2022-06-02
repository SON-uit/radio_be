import puppeteer from "puppeteer";
import { downloadFile } from "./downloadFile";
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://zingmp3.vn/album/Top-100-Pop-Au-My-Hay-Nhat-Adele-The-Kid-LAROI-Justin-Bieber-DJ-Snake/ZWZB96AB.html",
    {
      waitUntil: "networkidle2"
    }
  );
  // get all track element
  const elHandleArray = await page.$$(".select-item"); //.icon.action-play.ic-play
  //filter vip tracks -> only get not vip track
  const notVipItems = [];
  for (const item of elHandleArray) {
    const isVipRequired = await item.$(".ic-svg-vip-label");
    if (!isVipRequired) {
      notVipItems.push(item);
    }
  }
  const linkAudio = [];
  let count = 0; // get 10 tracks
  for (const el of notVipItems) {
    const name = await el.$eval(".title span span span", (track) => track.textContent);
    const actionBtn = await el.$(".icon.action-play.ic-play");
    if (count === 5) break;
    await actionBtn?.click();
    await page.waitForTimeout(5000);
    const url = await page.evaluate(() => {
      const linkTrack = document.querySelector("audio")?.src;
      return linkTrack;
    });
    linkAudio.push({
      nameTrack: name,
      linkTrack: url
    });
    count++;
  }
  const result = [...new Set(linkAudio)]; // remove duplicates
  await browser.close();
  //download tracks
  await Promise.all(
    result.map(async (trackInfo) => {
      if (trackInfo.linkTrack && trackInfo.nameTrack) {
        await downloadFile(trackInfo.linkTrack, trackInfo.nameTrack);
      }
    })
  );
  //
})();
