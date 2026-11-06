const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');
const A=require('./analytics.js');const {records:r,meta}=JSON.parse(fs.readFileSync(path.join(__dirname,'./data.json'),'utf8'));
const all=A.summary(r);assert.equal(all.n,7043);assert.equal(all.k,1869);assert.equal(all.tenure,29);assert.ok(Math.abs(all.monthly-64.76169246059918)<1e-8);
for(const [col,values]of [[0,A.CONTRACTS],[1,A.INTERNET],[2,A.PAYMENTS],[6,[1,2,3,4,5,6,7,8,9]]]){const g=A.groups(r,col,values);assert.equal(g.reduce((s,g)=>s+g.n,0),7043);assert.equal(g.reduce((s,g)=>s+g.k,0),1869);}
const mt=A.filter(r,{contract:'Month-to-month',min:0,max:72});assert.equal(mt.length,3875);assert.equal(A.summary(mt).k,1655);
const early=A.summary(r.filter(x=>x[3]===1));assert.equal(early.n,613);assert.equal(early.k,380);assert.equal((early.rate*100).toFixed(1),'62.0');
const empty=A.summary(A.filter(r,{contract:'Two year',internet:'No',payment:'Electronic check',min:0,max:0}));assert.equal(empty.n,0);assert.equal(empty.rate,null);assert.equal(empty.monthly,null);assert.deepEqual(empty.ci,[null,null]);
assert.deepEqual([0,12,13,24,25,48,49,72].map(A.band),[0,0,1,1,2,2,3,3]);
for(const [n,expected]of [[1,'10.9'],[3,'44.9'],[9,'5.3']])assert.equal((A.summary(r.filter(x=>x[6]===n)).rate*100).toFixed(1),expected);
const ci=A.wilson(0,1);assert.equal(ci[0],0);assert.ok(ci[1]>.79&&ci[1]<.80);assert.deepEqual(A.wilson(0,0),[null,null]);
const [[tn,fp],[fn,tp]]=meta.confusion;assert.equal(tn+fp+fn+tp,1409);assert.equal(fn+tp,374);assert.equal(tn+fp,1035);const lr=meta.models[0];assert.equal((tp/(tp+fn)).toFixed(3),lr.recall.toFixed(3));assert.equal((tp/(tp+fp)).toFixed(3),lr.precision.toFixed(3));assert.equal((2*tp/(2*tp+fp+fn)).toFixed(3),lr.f1.toFixed(3));
assert.ok(r.every(x=>x.length===9&&x[3]>=0&&x[3]<=72));console.log('Passed: sample, group partitions, filters, boundaries, nonlinear pattern, Wilson intervals, and saved confusion metrics.');
