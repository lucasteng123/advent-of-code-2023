import { IDay, IPart } from '../internalTypes';
import { AOCInput } from '../utils/inputParsing';

const findMirroredRow = (inputGrid: string[], correctSmudges: boolean = false): number | undefined => {
  const isEqual = (a: number, b: number) =>{

    //looking at this like a bitmask would be an amazing way of doing this

    //especially looking back after part 2, 
    //with part 2 any flipped bit will end up with a difference of an exact power of 2

  
    if(correctSmudges){
    
      if(a===b) return true;
      const diff = Math.abs(a-b);
      return diff > 0 && Math.sqrt(diff) % 1 === 0;
    } else {
      return a === b;
    }
  };
  
  const inputNumbers = inputGrid.map((string: string)=>{
    const bin = string.replaceAll('#','1').replaceAll('.','0');
    return parseInt(bin, 2);
  });


  for (let rowIndex = 0; rowIndex < inputNumbers.length; rowIndex++) {
    if(!isEqual(inputNumbers[rowIndex], inputNumbers[rowIndex+1])) continue;
    
    for(let ref = 0; ref<inputNumbers.length; ref++){
      if(inputNumbers[rowIndex-ref] == undefined) return rowIndex+1;
      if(inputNumbers[rowIndex+1+ref] == undefined) return rowIndex+1;

      if(!isEqual(inputNumbers[rowIndex-ref], inputNumbers[rowIndex+1+ref])) break;
    }
    
  }
};

const rotateArray = (inputGrid: string[]): string[] => {
  const rotatedArray: string[] = [];

  for(let subStringIndex = 0; subStringIndex<inputGrid[0].length; subStringIndex++) {
    let string = '';
    for(let gridIndex = 0; gridIndex<inputGrid.length; gridIndex++){
      string += inputGrid[gridIndex][subStringIndex];
    }
    rotatedArray.push(string);
  }

  return rotatedArray;
};



const solve = (input: AOCInput, correctSmudge: boolean): number => {
  const patterns = input.toLines('\n\n').map(pattern => pattern.split('\n'));

  let answer = 0;
  patterns.forEach(pattern => {
    const row = findMirroredRow(pattern, correctSmudge);
    if(row !== undefined) {
      answer += row*100;
    }
    else {
      const column = findMirroredRow(rotateArray(pattern), correctSmudge);
      if(column !== undefined) {
        answer += column;
      }
    }
  });

  
  return answer;
};

const part1: IPart = (input) => {
  return solve(input, false);
};

const part2: IPart = (input) => {
  return solve(input, true);

};

export const Day: IDay = {
  part1,
  part2
};

