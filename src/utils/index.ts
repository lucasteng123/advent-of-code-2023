export const parseInput = (input: string, char:string = '\n')=>{
  return input.split(char);
};

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
