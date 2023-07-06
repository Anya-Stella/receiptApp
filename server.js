const puppeteer = require("puppeteer");

const generatePDF = async () => {
  // DOMの取得
  let receiptDOM = document.getElementById("output");

  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.setContent(receiptDOM);
  const buffer = await page.pdf({
    printBackground:true,
    format: 'A4',
    margin:{
      top:0,
      right:0,
      bottom:0,
      left:0
    }
  })
  await browser.close();
  return buffer
}