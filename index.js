const puppeteer = require("puppeteer-core");


async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
  console.log('init');
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false, // Set to `true` if you want to run in headless mode
    // args: ["--start-fullscreen"],
    defaultViewport: null,
    args: ['--start-maximized'],
    ignoreDefaultArgs: ['--enable-automation']
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1366,
    height: 768,
  });
  await page.goto("https://panjiachen.github.io/vue-element-admin/#/login");
  // 等待登录按钮加载完成
  await page.waitForSelector(".el-button.el-button--primary.el-button--medium");
  // 点击登录按钮
  await page.click(".el-button.el-button--primary.el-button--medium");
  // 等待导航完成
  await page.waitForNavigation();

  await page.goto(
    "https://panjiachen.github.io/vue-element-admin/#/table/inline-edit-table"
  );
  await delay(2000);
  // await page.click("tbody tr:nth-child(1) td:last-child div .el-button");

  const rows = await page.$$("tbody tr");
  // 点击每个按钮
  for (const row of rows) {
    const button = await row.$("td:last-child div .el-button");
    if (button) {
      // console.log(button); // 打印按钮元素
      await button.click(); // 点击按钮
    }
  }
  // await browser.close();
})();
