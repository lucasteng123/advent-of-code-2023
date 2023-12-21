import assert from 'assert';

import { Day } from '../src/days/day11';
import { parseInput } from '../src/utils/inputParsing';

const input = 
`...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

describe.skip('Day 11', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(parseInput(input)),374);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(parseInput(input)),8410);
  });
});