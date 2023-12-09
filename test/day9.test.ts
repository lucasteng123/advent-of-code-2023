import assert from 'assert';

import { Day } from '../src/days/day9';

const input = 
`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

describe('Day 9', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(input), 114);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(input), 2);
  });
});