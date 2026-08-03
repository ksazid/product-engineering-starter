import {json} from './lib.mjs';
const s=json('delivery/current-slice.json'); const st=json('.engineering/STATE.json');
console.log(JSON.stringify({slice:s,state:st},null,2));
