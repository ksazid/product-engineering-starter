import fs from 'node:fs';
import {json,writeJson,fail} from './lib.mjs';
import {loadDelivery,validateDelivery} from './governance-lib.mjs';

const [action,arg] = process.argv.slice(2);
const currentPath = 'delivery/current-slice.json';

function titleFromMarkdown(file,id) {
  const markdown = fs.readFileSync(file,'utf8');
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || id;
}
function ensureValid() {
  const result = validateDelivery(loadDelivery());
  if (result.errors.length) fail(result.errors.map(error => `- ${error}`).join('\n'));
  for (const warning of result.warnings) console.warn(`WARN: ${warning}`);
}

if (action === 'status') {
  const delivery = loadDelivery();
  const active = delivery.current;
  const linked = (delivery.decisions.decisions ?? []).filter(item => (active.decisionIds ?? []).includes(item.id));
  console.log(JSON.stringify({slice:active,decisions:linked},null,2));
  process.exit(0);
}

if (action === 'activate') {
  const id = arg;
  if (!id || !/^VS-\d+$/.test(id)) fail('Usage: slice activate VS-01');
  const file = `docs/slices/${id}.md`;
  if (!fs.existsSync(file)) fail(`${file} does not exist`);
  const current = json(currentPath);
  if (current.sliceId && current.status === 'active' && current.sliceId !== id) fail(`${current.sliceId} is already active`);
  Object.assign(current,{
    schemaVersion:2,
    sliceId:id,
    title:titleFromMarkdown(file,id),
    status:'active',
    lifecycle:current.sliceId === id ? current.lifecycle : 'approved',
    implementationMode:current.sliceId === id ? current.implementationMode : 'specification-only',
    links:{...(current.links ?? {}),specification:file}
  });
  writeJson(currentPath,current);
  console.log(`${id} activated at approved/specification-only. Record typed approvals before runtime implementation.`);
  process.exit(0);
}

if (action === 'transition') {
  const target = arg;
  const delivery = loadDelivery();
  const current = delivery.current;
  if (!current.sliceId || current.status !== 'active') fail('No active slice');
  if (!delivery.governance.lifecycleStates.includes(target)) fail(`Unknown lifecycle state: ${target}`);
  const allowed = delivery.governance.transitions[current.lifecycle] ?? [];
  if (!allowed.includes(target)) fail(`Transition ${current.lifecycle} → ${target} is not allowed`);
  const previous = structuredClone(current);
  current.lifecycle = target;
  current.status = ['validated','rejected','superseded','rolled-back'].includes(target) ? 'completed' : 'active';
  writeJson(currentPath,current);
  const validation = validateDelivery(loadDelivery());
  if (validation.errors.length) {
    writeJson(currentPath,previous);
    fail(`Transition rejected:\n${validation.errors.map(error => `- ${error}`).join('\n')}`);
  }
  console.log(`${current.sliceId} transitioned ${previous.lifecycle} → ${target}`);
  process.exit(0);
}

if (action === 'validate') {
  const current = json(currentPath);
  if (current.status !== 'active' || !current.sliceId) fail('No active slice');
  if (!Array.isArray(current.requirements) || !current.requirements.length) fail('Active slice has no requirement IDs');
  ensureValid();
  console.log(`Slice validation passed (${current.sliceId}, ${current.lifecycle}, ${current.implementationMode})`);
  process.exit(0);
}

fail('Use: slice status | activate VS-01 | transition <state> | validate');
