import assert from 'assert';

import { Day } from '../src/days/day12';
import { parseInput } from '../src/utils/inputParsing';

const input = 
`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

describe('Day 12', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(parseInput(input)),21);
  });
  it('should run part 2', ()=>{
    
    assert.equal(Day.part2(parseInput(input)),525151);
  }).timeout(10000000000000000000000);
});