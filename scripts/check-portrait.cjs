const { chromium } = require('@playwright/test')
const assert = require('node:assert/strict')
const path = require('node:path')
const os = require('node:os')

const url = process.env.URL || 'http://localhost:3001'
const out = name => path.join(os.tmpdir(), `neural-${name}.png`)

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  const panel = page.getByRole('img', { name: /neural network reconstructing a portrait/ }).locator('..')
  await panel.locator('canvas').waitFor()
  const start = Date.now()
  for (const ms of [700, 2200, 3600, 5200, 6300, 7300, 8200]) {
    await page.waitForTimeout(Math.max(0, ms - (Date.now() - start)))
    await panel.screenshot({ path: out(`t${ms}`) })
  }
  await page.waitForFunction(() => document.querySelector('[data-phase="complete"]'), null, { timeout: 15000 })
  await page.waitForTimeout(2500)
  await panel.screenshot({ path: out('complete') })
  await page.screenshot({ path: out('hero') })

  const { data, info } = await require('sharp')(await panel.locator('canvas').screenshot()).raw().toBuffer({ resolveWithObject: true })
  let glowing = 0
  for (let i = 0; i < data.length; i += info.channels) if (data[i + 2] > 150 && data[i] < 150) glowing++
  console.log({ glowing, errors })
  assert(glowing > 500, 'Network must render visible glowing pixels')

  await panel.getByRole('button', { name: /Re-run/ }).click()
  await page.waitForFunction(() => document.querySelector('[data-phase="boot"], [data-phase="forward"]'))
  assert.equal(errors.length, 0)

  await page.setViewportSize({ width: 390, height: 844 })
  await panel.scrollIntoViewIfNeeded()
  await page.waitForTimeout(4000)
  await page.screenshot({ path: out('mobile') })
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile must not overflow')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => document.querySelector('[data-phase="complete"]'), null, { timeout: 5000 })
  await page.waitForTimeout(500)
  await panel.screenshot({ path: out('reduced') })
  assert.equal(errors.length, 0)
  console.log('screenshots in', os.tmpdir())
  await browser.close()
})().then(() => process.exit(0)).catch(error => { console.error(error); process.exit(1) })
