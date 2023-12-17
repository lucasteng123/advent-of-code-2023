import { IDay, IPart } from '../internalTypes';
import { parseInput } from '../utils/inputParsing';

interface Record { 
  positions: string
  configuration: number[]
}

const getArrangements = ({positions, configuration}: Record): number => {
  const createConfiguration = (positions: string): number[] => {
    const counts = positions.split('.').filter(x=>x.length>0).map(x=>x.length);
    return counts;
  };

  const memo = {};
  
  const recur = (positions: string, configuration: string, memo: {[key: string]: number}) => {
    if(!positions.includes('?')){
      if(createConfiguration(positions).join(',')===configuration){
        return 1;
      }
      return 0; 
    }
    // this can be 0
    if(memo[positions] !== undefined) return memo[positions];

    let sum = 0;
    sum += recur(positions.replace('?', '.'), configuration, memo);
    sum += recur(positions.replace('?', '#'), configuration, memo);

    memo[positions] = sum;
    return sum;
  };

  // ..... == . 
  positions = positions.replaceAll(/\.+/g, '.');

  if(createConfiguration(positions.replaceAll(/\?/g, '#')).join(',') === configuration.join(',')) return 1;

  return recur(positions, configuration.join(','), memo);

};

const part1: IPart = (input) => {

  // operational . damaged # unknown ? 
  const records: Record[] = parseInput(input).toLines().map(line=>{
    const [positions, hash] = line.split(' ');
    return {positions, configuration: hash.split(',').map(x=>parseInt(x))};
  });

  
  

  return records.reduce((acc: number,record)=>acc+getArrangements(record), 0);
};

const part2: IPart = (input) => {
  const records: Record[] = parseInput(input).toLines().map(line=>{
    let [positions, hash] = line.split(' ');
    
    positions=positions+'?'+positions+'?'+positions+'?'+positions+'?'+positions;
    hash=hash+','+hash+','+hash+','+hash+','+hash;
    return {positions, configuration: hash.split(',').map(x=>parseInt(x))};
  });

  return records.reduce((acc: number, record)=>{
    console.log(`checking record starting with ${record.positions.slice(0,3)}`);
    return acc+getArrangements(record);
  }, 0);
};

export const Day: IDay = {
  part1,
  part2
};

