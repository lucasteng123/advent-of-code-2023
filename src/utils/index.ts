

export const sortDesc = (a:number,b:number)=>b-a;
export const sortAsc = (a:number,b:number)=>a-b;

export const findLCM = (range:Array<number>): number => {
  const gcd = (a:number, b:number): number => {
    return !b ? a : gcd(b, a % b);
  };
  const lcm = (a:number, b:number): number => {
    return (a*b) / gcd(a,b);
  };
  range.sort(sortAsc);
  let multiple:number = range[0];
  range.forEach(num=>{
    multiple = lcm(multiple,num);
  });

  return multiple;
};


export interface I2DPoint {
  x: number,
  y: number
}

export const manhattanDistance = (a:I2DPoint, b:I2DPoint):number => {
  return Math.abs(a.x-b.x) + Math.abs(a.y-b.y);
};
