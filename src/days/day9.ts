import { IDay, IPart } from '../internalTypes';

//assume a 3 layer example
// 1,3,6,10,15,21
// first run through will find
// 2,3,4,5,6 as differences. These do not all match, so we need to do another layer
//next layer will be 1,1,1,1,1. We are now there. The next number of this line will be 1
// will need to pass up to the next one

const extrapolateValue = (values: Array<number>, forwards: boolean = true): number => {
  //if they are all equal, return that number
  if(values.every(val=>val===values[0])) return values[0];

  //otherwise recur
  const differences: Array<number> = [];
  for (let idx = 0; idx < values.length-1; idx++) {
    differences.push(values[idx+1]-values[idx]);
  }
  if(forwards) return values[values.length-1]+extrapolateValue(differences, forwards);
  else return values[0]-extrapolateValue(differences, forwards);
};

const part1: IPart = (input) => {
  const valueHistories = input.toLinesAsNumberArray();
  
  return valueHistories.map(history => extrapolateValue(history)).reduce((acc:number, extrapolatedValue)=>acc+extrapolatedValue);
};

const part2: IPart = (input) => {
  const valueHistories = input.toLinesAsNumberArray();
  
  return valueHistories.map(history => extrapolateValue(history, false)).reduce((acc:number, extrapolatedValue)=>acc+extrapolatedValue);
};

export const Day: IDay = {
  part1,
  part2
};

