import { IDay, IPart } from '../internalTypes';

const extractNumbersFromLine = (line: string) => {
  const chars = line.split('');
  const digits = chars.filter(c=>/^\d$/.test(c));  
  return Number([digits[0],digits[digits.length-1]].join('')); 
};

//input will be in the form of lines of text, each with its own 
const part1: IPart = (aocInput) => {
  const input = aocInput.string;
  const lines = input.split('\n');
  const digits = lines.map((line)=>extractNumbersFromLine(line));
  const sum = digits.reduce((acc, cv)=> acc+cv, 0);

  return sum;
};

const part2: IPart = (aocInput) => {
  const input = aocInput.string;

  const lines = input.split('\n');
  const extractedLines = lines.map(line => {
    return line.split('')
      .map((char, idx)=>{
        const frame = line.slice(idx);
        if (frame.startsWith('one')) return '1';
        if (frame.startsWith('two')) return '2';
        if (frame.startsWith('three')) return '3';
        if (frame.startsWith('four')) return '4';
        if (frame.startsWith('five')) return '5';
        if (frame.startsWith('six')) return '6';
        if (frame.startsWith('seven')) return '7';
        if (frame.startsWith('eight')) return '8';
        if (frame.startsWith('nine')) return '9';
        return char;
      }).join('');

  });
  const digits = extractedLines.map((line)=>extractNumbersFromLine(line));
  const sum = digits.reduce((acc, cv)=> acc+cv, 0);

  return sum;
};

export const Day: IDay = {
  part1,
  part2
};

