(function(root){'use strict';
const CONTRACTS=['Month-to-month','One year','Two year'],INTERNET=['DSL','Fiber optic','No'],PAYMENTS=['Electronic check','Mailed check','Bank transfer (automatic)','Credit card (automatic)'],BANDS=['0–12','13–24','25–48','49–72'];
function wilson(k,n){if(!n)return[null,null];const z=1.95996398454,p=k/n,a=1+z*z/n,b=(p+z*z/(2*n))/a,c=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/a;return[Math.max(0,b-c),Math.min(1,b+c)];}
function summary(rows){const n=rows.length,k=rows.reduce((s,r)=>s+r[5],0),ten=rows.map(r=>r[3]).sort((a,b)=>a-b);return{n,k,rate:n?k/n:null,ci:wilson(k,n),tenure:n?(ten[(n-1)>>1]+ten[n>>1])/2:null,monthly:n?rows.reduce((s,r)=>s+r[4],0)/n:null};}
function filter(rows,f){return rows.filter(r=>(!f.contract||r[0]===f.contract)&&(!f.internet||r[1]===f.internet)&&(!f.payment||r[2]===f.payment)&&r[3]>=f.min&&r[3]<=f.max);}
function groups(rows,col,values){return values.map(label=>({label,...summary(rows.filter(r=>r[col]===label))}));}
function band(t){return t<=12?0:t<=24?1:t<=48?2:3;}
const api={CONTRACTS,INTERNET,PAYMENTS,BANDS,wilson,summary,filter,groups,band};root.ChurnAnalytics=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
