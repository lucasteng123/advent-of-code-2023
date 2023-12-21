import aocLoader from 'aoc-loader';
import { Days } from './days/days';
import dotenv from 'dotenv';
import { IDay } from './internalTypes';
import { parseInput } from './utils/inputParsing';

dotenv.config();

const TEST_DAY = Number(process.argv[2]);

if(!TEST_DAY || Number.isNaN(TEST_DAY)){
  throw new Error('Supply a day');
  // Days.forEach((day,index)=>{
  //   aocLoader(Number(process.env.AOC_YEAR), index+1, process.env.AOC_SESSION)
  //     .then((data) => {

  //       console.log("Day "+index+1);
        

  //     })
  // })
}

if(TEST_DAY > Days.length){
  throw new Error('Day not set up yet.');
}

aocLoader(Number(process.env.AOC_YEAR), TEST_DAY, process.env.AOC_SESSION)
  .then((data) => {
    runDay(Days[TEST_DAY-1],data);
  });


const runDay = async (day:IDay, input:string) => {
  const aocInput = parseInput(input);

  console.log('Part 1');
  console.log(await day.part1(aocInput));

  console.log('Part 2');
  console.log(await day.part2(aocInput));
};