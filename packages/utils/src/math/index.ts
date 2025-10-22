export const randomInRange = (min:number,max:number)=>Math.random()*(max-min)+min;
export const formatPercent = (x:number)=> (x*100).toFixed(2)+'%';