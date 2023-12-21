import { IDay, IPart } from '../internalTypes';

import {hashString, parseLens, Box, Lens} from './day15Helpers';

//this is too simple for part 1, there is going to be a lot more parsing of steps in part 2. 
const part1: IPart = (input) => {
  const steps = input.string.split(',');
  let results = 0;
  for(const step of steps) {
    results += hashString(step);
  }
  return results;
};




const part2: IPart = (input) => {
  const boxes = new Array<Box>(256).fill({lenses:[]});
  
  const lensDirections = input.string.split(',');
  lensDirections.forEach(lensString=> {
    const [lens, operation] = parseLens(lensString);
    
    const targetBox = hashString(lens.label);

    // deep copy
    const boxBuffer = JSON.parse(JSON.stringify(boxes[targetBox]));
    let lensIndex = -1;
    //check to see if this lens is anywhere in the box. 
    boxBuffer.lenses.some((l: Lens,idx: number)=>{
      if(l.label === lens.label ) {
        lensIndex = idx;
        return true;
      }
      return false;
    });

    if(operation === '-'){
      if(lensIndex !== -1) boxBuffer.lenses.splice(lensIndex,1);
    } else if (operation === '='){
      if(lensIndex !== -1) boxBuffer.lenses[lensIndex] = lens;
      else boxBuffer.lenses.push(lens);
    }

    boxes[targetBox] = boxBuffer;

  });
  let focusingPower = 0;
  boxes.forEach((box, boxIndex)=>{
    box.lenses.forEach((lens, lensIndex)=>{
      focusingPower+=(boxIndex+1)*(lensIndex+1)*(lens.focalLength!);
    });
  });
  return focusingPower;
};

export const Day: IDay = {
  part1,
  part2
};

