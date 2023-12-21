import assert from 'assert';

import { Day } from '../src/days/day13';
import { parseInput } from '../src/utils/inputParsing';

const input = 
`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

describe('Day 13', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(parseInput(input)),405);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(parseInput(input)),400);
  });
});