import fs from 'node:fs';
const files=['delivery/requirements.json','delivery/epics.json','delivery/backlog.json','delivery/traceability.json','delivery/current-slice.json','delivery/completed-slices.json','.engineering/STATE.json'];
for(const f of files) JSON.parse(fs.readFileSync(f,'utf8'));
console.log('JSON validation passed');
