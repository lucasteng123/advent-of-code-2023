export const parseInput = (input: string, char:string = '\n')=>{
  return input.split(char);
};

export const sortDesc = (a:number,b:number)=>b-a;
export const sortAsc = (a:number,b:number)=>a-b;
