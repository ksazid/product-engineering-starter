import fs from 'node:fs';
import {buildDashboardData,loadDelivery,validateDelivery,writeDashboardData} from './governance-lib.mjs';

const checkOnly = process.argv.includes('--check');
const delivery = loadDelivery();
const validation = validateDelivery(delivery);
if (validation.errors.length) {
  for (const error of validation.errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}
for (const required of ['dashboard/index.html','dashboard/app.js','dashboard/styles.css']) {
  if (!fs.existsSync(required)) {
    console.error(`ERROR: missing dashboard asset ${required}`);
    process.exit(1);
  }
}
const data = buildDashboardData(delivery);
if (checkOnly) {
  console.log(`Dashboard check passed for ${data.summary.slices} slice(s) and ${data.notifications.length} notification(s)`);
  process.exit(0);
}
writeDashboardData(data);
console.log(`Dashboard data generated at dashboard/data.json (${data.summary.slices} slice(s))`);
