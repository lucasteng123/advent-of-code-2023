import { IDay, IPart } from '../internalTypes';

const part1: IPart = (input) => {
  
  const lines = input.split('\n');
  let partNumberSum = 0;

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const thisLine = lines[lineIndex];
    const matches = [...thisLine.matchAll(/(\d+)/g)];
    
    const previousLine = lines[lineIndex-1] || '';
    const nextLine = lines[lineIndex+1] || '';

    for(const match of matches){

      const textBlock = [
        previousLine.substring(match.index!-1, match.index!+match[0].length+1), 
        lines[lineIndex].substring(match.index!-1, match.index!+match[0].length+1), 
        nextLine.substring(match.index!-1, match.index!+match[0].length+1)
      ];

      const findSymbol = textBlock.join('').match(/[^\d.]/);
      if(findSymbol) partNumberSum+=Number(match[0]);
    }
  }
 
  return partNumberSum;
};

interface IPartNumber {
  value: number
  start: number
  end: number
}

const isPartAdjacent = (part: IPartNumber, index:number)=>{
  return part.start-1 <= index && index <= part.end+1;
};

const part2: IPart = (input) => {
  const lines = input.split('\n');

  let gearRatios = 0;

  const partNumbersByLine = lines.map(line=>{
    const matches = line.matchAll((/(\d+)/g));
    const partNumbers: Array<IPartNumber> = [];
    
    for(const match of matches){
      partNumbers.push({
        value: Number(match[0]),
        start: match.index!,
        end: match.index!+match[0].length-1
      });
    }

    return partNumbers;
  });

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const thisLine = lines[lineIndex];
    const matches = [...thisLine.matchAll(/\*/g)];

    for (const match of matches) {
      let parts = [...partNumbersByLine[lineIndex], ...partNumbersByLine[lineIndex-1], ...partNumbersByLine[lineIndex+1] ];

      parts = parts.filter(part=>isPartAdjacent(part, match.index!));

      if(parts.length === 2){
        gearRatios += parts[0].value * parts[1].value;
      }
    }
  }

  return gearRatios;
};

export const Day: IDay = {
  part1,
  part2
};

