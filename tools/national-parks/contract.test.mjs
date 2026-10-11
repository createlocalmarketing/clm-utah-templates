import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const root=new URL('../../',import.meta.url);
const registry=JSON.parse(await readFile(new URL('nationalparksguide.co/data/nps-63-canonical-entities.json',root),'utf8'));
test('registry lists all 63 parks with unique identifiers',()=>{assert.equal(registry.parks.length,63);assert.equal(new Set(registry.parks.map(p=>p.id)).size,63)});
test('source geofence is not falsely marked complete',()=>{for(const p of registry.parks){assert.equal(p.coverageRadiusMiles,25);assert.notEqual(p.merchantCoverage,'COMPLETE')}});
test('NPS official source pipeline protects media rights',async()=>{const t=await readFile(new URL('tools/national-parks/import-nps-official.mjs',root),'utf8');for(const x of ['NPS_API_KEY','RIGHTS','sourceUrl','alerts','campgrounds','events'])assert.ok(t.includes(x))});
