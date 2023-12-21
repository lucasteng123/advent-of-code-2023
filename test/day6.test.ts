import assert from 'assert';

import { Day } from '../src/days/day6';
import { parseInput } from '../src/utils/inputParsing';

const input = 
parseInput(`Time:      7  15   30
Distance:  9  40  200`);

describe('Day 6', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(input),288);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(input),71503);
  });
});