import fs from 'node:fs';
import {json, writeJson, fail} from './lib.mjs';
const [action,id]=process.argv.slice(2);
if(action==='status'){console.log(JSON.stringify(json('delivery/current-slice.json'),null,2));process.exit(0);}
if(action==='activate'){ if(!id || !/^VS-\d+$/.test(id)) fail('Usage: slice activate VS-01'); const file=`docs/slices/${id}.md`; if(!fs.existsSync(file)) fail(`${file} does not exist`); const s=json('delivery/current-slice.json'); Object.assign(s,{sliceId:id,status:'active'}); writeJson('delivery/current-slice.json',s); console.log(`${id} activated`); process.exit(0); }
if(action==='validate'){ const s=json('delivery/current-slice.json'); if(s.status!=='active'||!s.sliceId) fail('No active slice'); if(!Array.isArray(s.requirements)||!s.requirements.length) fail('Active slice has no requirement IDs'); console.log('Slice validation passed'); process.exit(0); }
fail('Use: slice status | activate VS-01 | validate');
