import assert from 'assert';

import { Day } from '../src/days/day2';
import { parseInput } from '../src/utils/inputParsing';

const testInput = 
parseInput(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`);

describe('Day 2', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(testInput),8);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(testInput),2286);
  });
});