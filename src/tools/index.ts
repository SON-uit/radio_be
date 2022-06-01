import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { downloadFile } from "./downloadFile";
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://zingmp3.vn/album/Rap-Viet-Nghe-La-Ghien-Karik-Binz-B-Ray-HIEUTHUHAI/ZU6B6FO7.html",
    {
      waitUntil: "networkidle2"
    }
  );
  // get all link audio
  const elHandleArray = await page.$$(".select-item"); //.icon.action-play.ic-play
  const linkAudio = [];
  let count = 0;
  for (const el of elHandleArray) {
    //await el.click();
    const name = await el.$eval(
      ".title span span span",
      (track) => track.textContent
    );
    const actionBtn = await el.$(".icon.action-play.ic-play");
    if (count === 10) break;
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
  console.log(result);

  //download tracks
  await Promise.all(
    result.map(async (trackInfo) => {
      if (trackInfo.linkTrack && trackInfo.nameTrack) {
        await downloadFile(trackInfo.linkTrack, trackInfo.nameTrack);
      }
    })
  );
  //
  await browser.close();
})();
