import { IDay, IPart } from '../internalTypes';


type Direction = 'north' | 'south' | 'east' | 'west';
type Rock = '#' | 'O' | '.'


const solve = (inputStringArray: string[][], cycleSteps: Direction[], cycles: number=1): number => {
  let gridBuffer = [...inputStringArray];

  const gridBufferHistory: string[] = [];

  const sortRocks = (a:string, b:string) => {
    if(a===b) return 0;
    if(a==='O') return -1;
    if(b==='O') return 1;
    return 0;
  };
  //not a huge fan of going back and forth to strings for this, but it works
  for(let cycleCount = 0; cycleCount < cycles; cycleCount++ ){
    cycleSteps.forEach(direction=>{
      switch (direction) {
      case 'north':

        for (let column = 0; column < gridBuffer[0].length; column++) {
          const columnArray: Rock[] = gridBuffer.map(row=>row[column] as Rock);
          const split = columnArray.join('').split('#').map(cs=>cs.split('').sort(sortRocks).join(''));
          const newColumn = split.join('#');

          gridBuffer = gridBuffer.map((row, index)=> {
            const newRow = row;
            newRow[column] = newColumn[index];
            return newRow;
          });
        
        }
        break;

      case 'south':
        for (let column = 0; column < gridBuffer[0].length; column++) {
          const columnArray: Rock[] = gridBuffer.map(row=>row[column] as Rock);
          const split = columnArray.join('').split('#').map(cs=>cs.split('').sort((a,b)=>sortRocks(a,b)*-1).join(''));
          const newColumn = split.join('#');

          gridBuffer = gridBuffer.map((row, index)=> {
            const newRow = row;
            newRow[column] = newColumn[index];
            return newRow;
          });
        
        }
        break;

      case 'east':
        gridBuffer = gridBuffer.map(row=>{
          return row.join('').split('#').map(cs=>cs.split('').sort((a,b)=>sortRocks(a,b)*-1).join('')).join('#').split('');
        });
        break;

      case 'west':
        gridBuffer = gridBuffer.map(row=>{
          return row.join('').split('#').map(cs=>cs.split('').sort(sortRocks).join('')).join('#').split('');
        });
        break;
    
      }
    });

    // the regular method would take a month to brute force
    // we do enter a loop, and can skip a huge amount of the loops
    const gridJson = JSON.stringify(gridBuffer);
    const loopStartIndex = gridBufferHistory.indexOf(gridJson);
    if(loopStartIndex>=0 && cycleCount < 1000){
      const loopLength = cycleCount - loopStartIndex;
      const jumpTarget = cycles - cycleCount;
      console.log('we have found a loop, we can skip forward');
      console.log('loop start: ' + loopStartIndex );
      console.log('loop length: ' +loopLength);
      console.log(`jumping forward ${Math.floor(jumpTarget/loopLength)} loops`);
      console.log(`we will resume at ${cycles - jumpTarget % loopLength}`);


      cycleCount = cycles - jumpTarget % loopLength;
    }

    gridBufferHistory[cycleCount] = gridJson;
  }
  return gridBuffer.map(row=>row.filter(rock=>rock==='O') || []).reduce((acc, val, index): number=>{
    return acc + val.length*(gridBuffer.length-index);
  }, 0);

};


const part1: IPart = (input) => {
  return solve(input.toLinesAsStringArray(), ['north']);
 
};

const part2: IPart = (input) => {
  return solve(input.toLinesAsStringArray(), ['north', 'west', 'south', 'east'], 1000000000);
};

export const Day: IDay = {
  part1,
  part2
};

