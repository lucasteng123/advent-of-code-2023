import { IDay, IPart } from '../internalTypes';
import { parseInput } from '../utils/inputParsing';

interface Record { 
  positions: string
  configuration: number[]
}

interface Queue {
  partialPositionArray: string, numberOfBranches:number
}

const getArrangements = ({positions, configuration}: Record): number => {
  const createConfiguration = (positions: string): number[] => {
    const counts = positions.split('.').filter(x=>x.length>0).map(x=>x.length);
    return counts;
  };

  const totalAmountOfSprings = configuration.reduce((acc,group)=>group+acc, 0);
  
  let queue: Queue[] = [
    { 
      partialPositionArray: '',
      numberOfBranches:1
    }
  ];

  //step through the positions input
  for(const chr of positions) {
    let buffer: Queue[] = [];

    while (queue.length > 0) {
      const workItem = queue.pop()!;


      //create 2 branches to check if it is a ?
      if (chr === '?') buffer.push({
        partialPositionArray: workItem.partialPositionArray + ',',
        numberOfBranches: workItem.numberOfBranches
      },
      {
        partialPositionArray: workItem.partialPositionArray + '.',
        numberOfBranches: workItem.numberOfBranches
      });

      //otherwise add just the character
      else buffer.push({
        partialPositionArray: workItem.partialPositionArray + chr,
        numberOfBranches: workItem.numberOfBranches
      });
    }

    for(const item of buffer){
      const partialConfiguration = createConfiguration(item.partialPositionArray);

      let lastElementInPartialConfiguration: number | undefined;
      const isComplete = item.partialPositionArray.length === positions.length;

      //if processing is unfinished, we can still check the final item to see if it is too big. 
      if(!isComplete) lastElementInPartialConfiguration = partialConfiguration.pop();

      let keep = true;

      //check last element
      if(lastElementInPartialConfiguration && lastElementInPartialConfiguration > configuration[partialConfiguration.length]) keep=false;

      for( let index = 0; index < partialConfiguration.length; index++){
        if(keep && partialConfiguration[index] !== configuration[index]) keep = false;
        else if(keep && isComplete && partialConfiguration.length !== configuration.length) keep = false; 
      }

      //check to see if there is enough room left to put all of the required groups
      if(keep 
        && 
        totalAmountOfSprings - [...item.partialPositionArray.matchAll(/#/g)].length 
        > 
        positions.length - item.partialPositionArray.length
      ) keep = false;

      keep && queue.push(item);
    }

    buffer = [];
    const memo: {[key: string]: Queue} = {};

    //we keep the ones that are in the middle of building a group
    for(let index = 0; index < queue.length; index++){
      if(queue[index].partialPositionArray.slice(-1) === '#'){
        buffer.push(queue[index]);
      } else {
        //prune identical branches
        const key = queue[index].partialPositionArray.split('.').filter(x=>x.length>0).length.toString();
        const existingBranches = queue[index].numberOfBranches;
        if(!memo[key]) memo[key] = {...queue[index], numberOfBranches: 0};

        memo[key] = {...memo[key], numberOfBranches: memo[key].numberOfBranches+existingBranches};
      }
    }

    buffer.push(...Object.values(memo));
    queue = [...buffer];
  }
  let answer = 0;
  for(const item of queue) {
    if(createConfiguration(item.partialPositionArray).length === configuration.length) answer += item.numberOfBranches;
  }
  return answer;
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

