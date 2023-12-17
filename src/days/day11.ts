import { IDay, IPart } from '../internalTypes';
import { I2DPoint, manhattanDistance, sortAsc } from '../utils';

import { parseInput } from '../utils/inputParsing';

interface IExpandedUniverse {
  grid: string[][],
  expansion: {
    x: number[]
    y: number[]
  }
}

const expandUniverse = (grid: Array<Array<string>>, quantity: number): IExpandedUniverse => {
  const rowsToAdd:Array<number> = [];
  const columnsToAdd:Array<number> = Array.from(Array(grid[0].length).keys());
  grid.forEach((row, index)=>{
    if(row.every(v=>v==='.')) rowsToAdd.push(index);
    row.forEach((cell,index)=>{
      if(cell !== '.' && columnsToAdd.includes(index)) columnsToAdd.splice(columnsToAdd.indexOf(index),1);
    });
  });
  
  rowsToAdd.sort(sortAsc);
  columnsToAdd.sort(sortAsc);

  
 
  return {grid,expansion: {x:columnsToAdd,y:rowsToAdd}};



};

type IUniverse = I2DPoint;


const sumPoints = (universes: Array<IUniverse>, expansion: IExpandedUniverse['expansion'], expansionQuantity: number): number => {
  const countEmptySpaceBetween = (
    a: IUniverse,
    b: IUniverse,
    emptyIndicesSet: Array<number>,
    dimension: 'x' | 'y'
  ):number => {
    let count = 0;
    const minIdx = Math.min(a[dimension], b[dimension]);
    const maxIdx = Math.max(a[dimension], b[dimension]);
  
    for (let idx = minIdx + 1; idx < maxIdx; idx++) {
      if (emptyIndicesSet.includes(idx)) {
        count++;
      }
    }
  
    return count;
  };

  const distances:{[unid:string]:number} = {};

  for(let a = 0; a<universes.length; a++){
    for(let b = 0; b<universes.length; b++){
      const key = a < b ? `${a+1}|${b+1}` : `${b+1}|${a+1}`;
      if(!distances[key] && a!==b){
        const countSpace = countEmptySpaceBetween(universes[a], universes[b], expansion.x, 'x') + countEmptySpaceBetween(universes[a], universes[b], expansion.y, 'y');
        distances[key] = manhattanDistance(universes[a], universes[b]) + countSpace * (expansionQuantity);
        if(a==4 && b==8 && expansionQuantity == 100) {
          console.log('');
        }
      }
    }
  }
  
  return Object.values(distances).reduce((acc,val)=>val+acc,0);
};

const solve = (input: string, expansionQuantity: number): number => {
  const {grid, expansion} = expandUniverse(parseInput(input).toLinesAsStringArray(), expansionQuantity);

  const universes: Array<IUniverse> = [];


  grid.forEach((row, rowIndex)=>{
    row.forEach((cell, columnIndex)=>{
      if(cell==='#') universes.push({x:columnIndex, y:rowIndex});
    });
  });

  

  return sumPoints(universes, expansion, expansionQuantity);
  
};
const part1: IPart = (input) => {
  return solve(input, 1);
  
};

const part2: IPart = (input) => {
  return solve(input, 100);
};

export const Day: IDay = {
  part1,
  part2
};

