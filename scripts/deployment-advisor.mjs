import { readFile } from 'node:fs/promises';
import process from 'node:process';

const profilePath = new URL('../deployment/PROFILE.json', import.meta.url);

function scoreProviders(profile) {
  const scores = new Map([
    ['cloudflare', { score: 0, reasons: [] }],
    ['netlify', { score: 0, reasons: [] }],
    ['vercel', { score: 0, reasons: [] }],
    ['render', { score: 0, reasons: [] }],
  ]);

  const add = (provider, points, reason) => {
    const entry = scores.get(provider);
    entry.score += points;
    entry.reasons.push(reason);
  };

  if (profile.frontend === 'static' || profile.frontend === 'spa') {
    add('cloudflare', 4, 'Strong fit for static or edge-delivered frontend assets.');
    add('netlify', 3, 'Good fit for static sites and preview workflows.');
  }

  if (profile.frontend === 'nextjs') {
    add('vercel', 4, 'Native Next.js deployment experience.');
    add('netlify', 2, 'Supports Next.js and preview deployments.');
    add('cloudflare', 2, 'Can fit when the application is compatible with edge/serverless constraints.');
  }

  if (profile.backend === 'aspnet-container' || profile.backend === 'container') {
    add('render', 5, 'Direct fit for containerized APIs and long-running services.');
  }

  if (profile.edgeExecutionRequired) {
    add('cloudflare', 5, 'Edge execution is a primary requirement.');
    add('vercel', 2, 'Supports edge-oriented workloads where framework-compatible.');
  }

  if (profile.previewDeploymentsRequired) {
    add('vercel', 3, 'Strong pull-request preview workflow.');
    add('netlify', 3, 'Strong deploy-preview workflow.');
  }

  if (profile.backgroundJobsRequired) {
    add('render', 3, 'Better fit for persistent workers and background processing.');
    add('cloudflare', -1, 'May require additional platform-specific queue or workflow design.');
  }

  if (profile.coldStartsAccepted === false) {
    add('render', 2, 'A continuously running paid service can avoid serverless cold-start trade-offs.');
    add('cloudflare', -1, 'Serverless/edge execution constraints need explicit validation.');
    add('vercel', -1, 'Function execution characteristics need explicit validation.');
    add('netlify', -1, 'Function execution characteristics need explicit validation.');
  }

  if (profile.stage === 'prototype' || profile.stage === 'pilot') {
    add('cloudflare', 1, 'Often cost-effective for low-traffic edge/static pilots.');
    add('netlify', 1, 'Useful for controlled frontend pilots and previews.');
    add('vercel', 1, 'Useful for fast Next.js pilots.');
    add('render', 1, 'Useful for pilot APIs, subject to free-tier limitations.');
  }

  if (profile.commercialUse) {
    add('vercel', -1, 'Confirm plan terms and commercial-use suitability before selection.');
    add('render', 1, 'Paid service plans can suit commercial container workloads.');
  }

  return [...scores.entries()]
    .map(([provider, value]) => ({ provider, ...value }))
    .sort((a, b) => b.score - a.score);
}

function validate(profile) {
  const required = ['stage', 'frontend', 'backend', 'traffic', 'monthlyBudgetUsd'];
  const missing = required.filter((key) => profile[key] === undefined || profile[key] === '');
  if (missing.length) {
    throw new Error(`Deployment profile missing: ${missing.join(', ')}`);
  }
}

try {
  const raw = await readFile(profilePath, 'utf8');
  const profile = JSON.parse(raw);
  validate(profile);
  const ranked = scoreProviders(profile);

  console.log('PES deployment cost advisor');
  console.log('Recommendation only — no provider is enabled and no deployment is performed.\n');

  for (const [index, result] of ranked.entries()) {
    console.log(`${index + 1}. ${result.provider} (fit score ${result.score})`);
    for (const reason of result.reasons) console.log(`   - ${reason}`);
  }

  console.log('\nRequired human checks before selection:');
  console.log('- Verify current pricing, quotas, commercial-use terms, regions, egress and database costs.');
  console.log('- Validate runtime compatibility, cold starts, observability, backups and rollback.');
  console.log('- Record the final provider decision in an ADR when it becomes durable.');
} catch (error) {
  console.error(`Deployment advisor failed: ${error.message}`);
  process.exitCode = 1;
}
