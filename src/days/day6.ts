import { IDay, IPart } from '../internalTypes';

const calculateWinningNumbers = (time:number, distance: number): number => {
  //this is just a quadratic.
  // a 1 b time c distance
  //ax^2 + bx + c

  const discr = time*time - 4 * distance;

  if(discr > 0){
    const root1 = ((-time + Math.sqrt(discr)) / 2);
    const root2 = ((-time - Math.sqrt(discr)) / 2);

    if(Number.isInteger(root1) && Number.isInteger(root2)){
      //this fixes the off by one error caused by the usual .floor() not happening to integer values
      return root1-root2-1;
    } else {
      //align to full milliseconds
      return Math.floor(root1)-Math.floor(root2);
    }

  } else {
    //we can expect 2, real options on each of these.
    console.log('incorrect input');
    return 0;
  }


};

const part1: IPart = (input) => {
  const [timeLine, distanceLine] = input.toLines('\n');

  const times = [...timeLine.matchAll(/\d+/g)];
  const distances = [...distanceLine.matchAll(/\d+/g)];

  const wins = times.map((v,i)=>calculateWinningNumbers(Number(v[0]),Number(distances[i][0])));

  return wins.reduce((a,v)=>a*v,1);
};

const part2: IPart = (input) => {
  const [timeLine, distanceLine] = input.toLines('\n');

  const time = Number([...timeLine.matchAll(/\d+/g)].map(match=>match[0]).join(''));
  const distance = Number([...distanceLine.matchAll(/\d+/g)].map(match=>match[0]).join(''));

  return calculateWinningNumbers(time,distance);
};

export const Day: IDay = {
  part1,
  part2
};

